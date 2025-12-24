import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pagesへデプロイする際のベースパス
  // 公開URL: https://<owner>.github.io/tech-role-site/
  base: '/tech-role-site/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    cors: true,
    middlewareMode: false,
    watch: {
      usePolling: true,
    },
  },
})
