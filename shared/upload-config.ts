/**
 * Shared upload rules — imported by both the React app (src/) and the
 * Vercel serverless function (api/). Keep this file dependency-free.
 */

export const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'heic', 'heif', 'webp', 'avif', 'gif'] as const
export const VIDEO_EXTENSIONS = ['mp4', 'mov', 'm4v', 'webm', '3gp', 'mkv'] as const

export const MAX_IMAGE_BYTES = 50 * 1024 * 1024 // 50 MB
export const MAX_VIDEO_BYTES = 500 * 1024 * 1024 // 500 MB

export type UploadKind = 'image' | 'video'

/** Content types signed into the presigned URL; the client must send them verbatim. */
export const CONTENT_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  heic: 'image/heic',
  heif: 'image/heif',
  webp: 'image/webp',
  avif: 'image/avif',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  m4v: 'video/x-m4v',
  webm: 'video/webm',
  '3gp': 'video/3gpp',
  mkv: 'video/x-matroska',
}

/** Lower-cased extension without the dot, or empty string. */
export function extensionOf(fileName: string): string {
  const dot = fileName.lastIndexOf('.')
  return dot === -1 ? '' : fileName.slice(dot + 1).toLowerCase()
}

/**
 * Classifies a file by its extension. MIME types are deliberately ignored:
 * HEIC files often report an empty `file.type` on mobile browsers.
 */
export function kindOfExtension(ext: string): UploadKind | null {
  if ((IMAGE_EXTENSIONS as readonly string[]).includes(ext)) return 'image'
  if ((VIDEO_EXTENSIONS as readonly string[]).includes(ext)) return 'video'
  return null
}

export function maxBytesFor(kind: UploadKind): number {
  return kind === 'image' ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES
}

/** ASCII-safe path segment: strips diacritics, keeps [a-z0-9._-], caps length. */
export function sanitizeSegment(value: string, maxLength = 60): string {
  const ascii = value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')
    .toLowerCase()
  return ascii.slice(0, maxLength) || 'soubor'
}
