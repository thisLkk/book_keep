import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import path from 'path'

export default defineConfig(({ command, mode }) => {
  return {
    base: command == 'serve' ? '/' : '/m/book-keep/',
    resolve: {
      alias: {  
        '@': path.resolve(__dirname, './src')  
      }
    }, 
    css: {
      preprocessorOptions: {
        less: {}
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver()],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
  }
});