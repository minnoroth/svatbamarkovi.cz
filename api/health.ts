import type { VercelRequest, VercelResponse } from '@vercel/node'

/** Diagnostic endpoint: verifies the serverless runtime and env presence (no values). */
export default function handler(req: VercelRequest, res: VercelResponse): void {
  res.status(200).json({
    ok: true,
    method: req.method,
    node: process.version,
    env: {
      // Non-secret echoes to catch typos: bucket name and the account id are
      // public knowledge (both appear in every presigned URL), key id prefix
      // only identifies which token is configured.
      R2_ACCOUNT_ID: (process.env.R2_ACCOUNT_ID ?? '').slice(0, 6) + '…',
      R2_ACCESS_KEY_ID: (process.env.R2_ACCESS_KEY_ID ?? '').slice(0, 4) + '…',
      R2_SECRET_ACCESS_KEY: Boolean(process.env.R2_SECRET_ACCESS_KEY),
      R2_BUCKET: process.env.R2_BUCKET ?? null,
      UPLOADS_ENABLED: process.env.UPLOADS_ENABLED ?? null,
    },
  })
}
