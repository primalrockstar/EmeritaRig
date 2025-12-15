/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  base: '/',
  server: {
    host: 'localhost',
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:8001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    commonjsOptions: {
      include: /node_modules/,
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
