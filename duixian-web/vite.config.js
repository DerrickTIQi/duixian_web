import { fileURLToPath, URL } from 'node:url'
import { loadEnv } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    base: './',

    build: {
      outDir: './dist',
    },

    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dirs: ['./src/api', './src/stores', './src/hooks'], // 自动导入
        dts: './src/auto-imports.d.ts',

      }),
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // 代理请求
    server: {
      // host: 'oms-server.qubit-dance.com',
      proxy: {
        [env.VITE_APP_API]: {
          target: env.VITE_APP_SERVER,
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        },
      },
    },
  }
}