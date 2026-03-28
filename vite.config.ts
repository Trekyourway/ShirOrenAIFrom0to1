import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        app1: resolve(__dirname, 'app-link1/index.html'),
        guide: resolve(__dirname, 'guides/ai-agentic.html')
      }
    }
  }
})