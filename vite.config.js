import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Это правило говорит Vite: все запросы, начинающиеся с /api/lastfm,
      // перенаправляй на целевой сервер Last.fm
      '/api/lastfm': {
        target: 'http://ws.audioscrobbler.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/lastfm/, '/2.0')
      }
    }
  }
})
