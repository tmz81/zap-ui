import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      '/socket.io': {
        target: 'https://zap-api-61q3.onrender.com',
        ws: true
      },
      '/api': {
        target: 'https://zap-api-61q3.onrender.com',
        changeOrigin: true
      }
    }
  }
})
