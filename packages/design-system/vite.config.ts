import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer() as PluginOption],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@layouts', replacement: path.resolve(__dirname, 'src/layouts') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') },
    ],
  },
  server: {
    port: 5555,
    open: true,
  },
});
