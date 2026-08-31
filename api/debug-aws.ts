import type { VercelRequest, VercelResponse } from '@vercel/node'
import { AwsClient } from 'aws4fetch'

/** Temporary probe: verifies aws4fetch loads in the function runtime. */
export default function handler(_req: VercelRequest, res: VercelResponse): void {
  res.status(200).json({ ok: true, awsClient: typeof AwsClient })
}
