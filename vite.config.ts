import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "web-csv-viewer",
  server: {
    open: true
  },
  build: {
    outDir: "docs"
  },
  plugins: [vue()],
})
