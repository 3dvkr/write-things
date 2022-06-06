import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000/",
        changeOrigin: true,
        secure: false,      
        ws: true,
      }
    }
  },
  plugins: [react()]
})