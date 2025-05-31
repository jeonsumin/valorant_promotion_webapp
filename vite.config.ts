import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import vitePluginSvgr from 'vite-plugin-svgr';
import tsconfigpaths from 'vite-tsconfig-paths';
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSvgr(), tsconfigpaths()],
  base: '/',
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      views: path.resolve(__dirname, 'src/views'),
      hoc: path.resolve(__dirname, 'src/hoc'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    host:'0.0.0.0',
    port: 4000,
  },
  build: {
    minify: 'esbuild',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
