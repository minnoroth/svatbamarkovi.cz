import { AwsClient } from 'aws4fetch'
import {
  CONTENT_TYPES,
  extensionOf,
  kindOfExtension,
  maxBytesFor,
  sanitizeSegment,
} from '../shared/upload-config'

interface PresignRequestBody {
  fileName?: unknown
  fileSize?: unknown
  guestName?: unknown
}

const URL_EXPIRY_SECONDS = 3600

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

/**
 * Issues a presigned R2 PUT URL for one guest photo/video.
 *
 * Abuse controls: extension whitelist, per-kind size cap (client-declared —
 * R2 presigned PUT cannot enforce Content-Length), Content-Type is part of
 * the signature, short expiry, and the UPLOADS_ENABLED kill switch.
 */
export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json(405, { error: 'method_not_allowed' })
  }
  if (process.env.UPLOADS_ENABLED !== 'true') {
    return json(503, { error: 'uploads_disabled' })
  }

  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucket = process.env.R2_BUCKET
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    return json(500, { error: 'server_not_configured' })
  }

  let body: PresignRequestBody
  try {
    body = (await request.json()) as PresignRequestBody
  } catch {
    return json(400, { error: 'invalid_json' })
  }

  const { fileName, fileSize, guestName } = body
  if (typeof fileName !== 'string' || typeof fileSize !== 'number') {
    return json(400, { error: 'invalid_request' })
  }

  const ext = extensionOf(fileName)
  const kind = kindOfExtension(ext)
  if (!kind) {
    return json(415, { error: 'unsupported_type' })
  }

  const maxBytes = maxBytesFor(kind)
  if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > maxBytes) {
    return json(413, { error: 'file_too_large', maxBytes })
  }

  const contentType = CONTENT_TYPES[ext]
  const day = new Date().toISOString().slice(0, 10)
  const guestSegment =
    typeof guestName === 'string' && guestName.trim() !== ''
      ? sanitizeSegment(guestName, 40)
      : 'anonym'
  const baseName = sanitizeSegment(fileName.replace(/\.[^.]*$/, ''))
  const random = crypto.randomUUID().slice(0, 8)
  const key = `uploads/${day}/${guestSegment}/${random}-${baseName}.${ext}`

  const r2 = new AwsClient({ accessKeyId, secretAccessKey, service: 's3', region: 'auto' })
  const objectUrl = new URL(
    `https://${accountId}.r2.cloudflarestorage.com/${bucket}/${key}`,
  )
  objectUrl.searchParams.set('X-Amz-Expires', String(URL_EXPIRY_SECONDS))

  const signed = await r2.sign(
    new Request(objectUrl, { method: 'PUT', headers: { 'Content-Type': contentType } }),
    { aws: { signQuery: true } },
  )

  return json(200, { url: signed.url, key, contentType })
}
