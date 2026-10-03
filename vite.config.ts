import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// base 必须指向 GitHub Pages 的项目子路径：/仓库名/
export default defineConfig({
  plugins: [vue()],
  base: '/hub-develop-web/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
