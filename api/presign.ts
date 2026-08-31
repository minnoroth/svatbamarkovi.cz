import type { VercelRequest, VercelResponse } from '@vercel/node'
import { AwsClient } from 'aws4fetch'
import {
  CONTENT_TYPES,
  extensionOf,
  kindOfExtension,
  maxBytesFor,
  sanitizeSegment,
} from './_lib/upload-config.js'

const URL_EXPIRY_SECONDS = 3600

/**
 * Issues a presigned R2 PUT URL for one guest photo/video.
 *
 * Abuse controls: extension whitelist, per-kind size cap (client-declared —
 * R2 presigned PUT cannot enforce Content-Length), Content-Type is part of
 * the signature, short expiry, and the UPLOADS_ENABLED kill switch.
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }
  if (process.env.UPLOADS_ENABLED !== 'true') {
    res.status(503).json({ error: 'uploads_disabled' })
    return
  }

  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucket = process.env.R2_BUCKET
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    res.status(500).json({ error: 'server_not_configured' })
    return
  }

  // Vercel parses JSON bodies into req.body for Content-Type: application/json.
  const body: unknown = req.body
  if (typeof body !== 'object' || body === null) {
    res.status(400).json({ error: 'invalid_json' })
    return
  }
  const { fileName, fileSize, guestName } = body as Record<string, unknown>
  if (typeof fileName !== 'string' || typeof fileSize !== 'number') {
    res.status(400).json({ error: 'invalid_request' })
    return
  }

  const ext = extensionOf(fileName)
  const kind = kindOfExtension(ext)
  if (!kind) {
    res.status(415).json({ error: 'unsupported_type' })
    return
  }

  const maxBytes = maxBytesFor(kind)
  if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > maxBytes) {
    res.status(413).json({ error: 'file_too_large', maxBytes })
    return
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
  // Buckets created under a jurisdiction (e.g. EU) live on a different host:
  // <account>.eu.r2.cloudflarestorage.com — set R2_JURISDICTION=eu for those.
  const jurisdiction = process.env.R2_JURISDICTION
  const host = jurisdiction
    ? `${accountId}.${jurisdiction}.r2.cloudflarestorage.com`
    : `${accountId}.r2.cloudflarestorage.com`
  const objectUrl = new URL(`https://${host}/${bucket}/${key}`)
  objectUrl.searchParams.set('X-Amz-Expires', String(URL_EXPIRY_SECONDS))

  const signed = await r2.sign(
    new Request(objectUrl, { method: 'PUT', headers: { 'Content-Type': contentType } }),
    { aws: { signQuery: true } },
  )

  res.status(200).json({ url: signed.url, key, contentType })
}
