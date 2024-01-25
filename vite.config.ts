import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: react(),
  server: {
    host: "loopback.cominatyou.com",
    port: 443,
    https: {
      key: fs.readFileSync("C:\\Users\\willi\\Documents\\dev\\loopback-certs\\loopback-key.pem"),
      cert: fs.readFileSync("C:\\Users\\willi\\Documents\\dev\\loopback-certs\\fullchain.pem")
    }
  }
})
