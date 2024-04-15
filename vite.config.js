import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

export default defineConfig(({ command, mode }) => {
  return {
    base: command == 'serve' ? '/' : '/m/book-keep/',
    resolve: {  
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