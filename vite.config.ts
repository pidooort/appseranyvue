import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/news_post_api.php': {
        target: 'https://seranycare.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/news_post_api\.php/, ''),
      },
    },
  },
})
