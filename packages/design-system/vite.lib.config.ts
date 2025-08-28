import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ tsconfigPath: './tsconfig.lib.json' })],
  publicDir: false,
  build: {
    outDir: 'dist/lib',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'BuzzleDesignSystem',
      fileName: 'buzzle-design-system',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
