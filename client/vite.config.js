import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Ensure the server allows cross-origin requests from your backend
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Backend server URL
        changeOrigin: true, // Adjusts the origin of the request to the target URL
        secure: false, // Set to true if the backend uses HTTPS
        ws: true, // WebSocket support
      }
    },
    cors: {
      origin: 'http://localhost:5173', // Frontend URL to allow cross-origin requests
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true, // Allows sending cookies with cross-origin requests
    },
  },
})
