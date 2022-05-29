import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base : '/vue3-bs5-autocomplete/',
  build: {
    outDir: 'docs'
  }
})
