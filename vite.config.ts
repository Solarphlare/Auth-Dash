import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: react(),
  server: {
    host: "loopback.solarphlare.com",
    port: 443,
    strictPort: true,
    https: {
      cert: fs.readFileSync("/Users/willi/Downloads/cert/server.crt"),
      key: fs.readFileSync("/Users/willi/Downloads/cert/server.key"),
    }
  }
})
