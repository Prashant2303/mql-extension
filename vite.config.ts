import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteStaticCopy({
    targets: [
      {
        src: "public/manifest.json",
        dest: "."
      }
    ]
  })],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src")
    }
  }
})

// resolve: {
//   alias: {
//     "@": path.resolve(__dirname, "../"),
//     "@server": path.resolve(__dirname, "../server/src"),
//   },
// },