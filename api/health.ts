import type { VercelRequest, VercelResponse } from '@vercel/node'

/** Diagnostic endpoint: verifies the serverless runtime and env presence (no values). */
export default function handler(req: VercelRequest, res: VercelResponse): void {
  res.status(200).json({
    ok: true,
    method: req.method,
    node: process.version,
    env: {
      R2_ACCOUNT_ID: Boolean(process.env.R2_ACCOUNT_ID),
      R2_ACCESS_KEY_ID: Boolean(process.env.R2_ACCESS_KEY_ID),
      R2_SECRET_ACCESS_KEY: Boolean(process.env.R2_SECRET_ACCESS_KEY),
      R2_BUCKET: Boolean(process.env.R2_BUCKET),
      UPLOADS_ENABLED: process.env.UPLOADS_ENABLED ?? null,
    },
  })
}
