import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Dev-only mock of the production upload endpoints so the upload UI can be
 * exercised without R2 credentials (`npm run dev`). Mirrors api/presign.ts
 * validation loosely; production builds are unaffected (apply: 'serve').
 */
function devUploadMock(): Plugin {
  const images = ['jpg', 'jpeg', 'png', 'heic', 'heif', 'webp', 'avif', 'gif']
  const videos = ['mp4', 'mov', 'm4v', 'webm', '3gp', 'mkv']
  return {
    name: 'dev-upload-mock',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/presign', (req, res) => {
        let raw = ''
        req.on('data', (chunk) => (raw += chunk))
        req.on('end', () => {
          res.setHeader('Content-Type', 'application/json')
          try {
            const { fileName, fileSize } = JSON.parse(raw) as { fileName: string; fileSize: number }
            const ext = fileName.split('.').pop()?.toLowerCase() ?? ''
            const kind = images.includes(ext) ? 'image' : videos.includes(ext) ? 'video' : null
            if (!kind) {
              res.statusCode = 415
              res.end(JSON.stringify({ error: 'unsupported_type' }))
              return
            }
            if (fileSize > (kind === 'image' ? 50 : 500) * 1024 * 1024) {
              res.statusCode = 413
              res.end(JSON.stringify({ error: 'file_too_large' }))
              return
            }
            res.end(
              JSON.stringify({
                url: '/dev-upload-sink',
                key: `dev/${fileName}`,
                contentType: 'application/octet-stream',
              }),
            )
          } catch {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'invalid_json' }))
          }
        })
      })
      server.middlewares.use('/dev-upload-sink', (req, res) => {
        req.on('data', () => undefined)
        req.on('end', () => {
          setTimeout(() => {
            res.statusCode = 200
            res.end()
          }, 800)
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devUploadMock()],
  server: { port: 3000 },
})
