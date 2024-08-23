import { URL, fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
      ],
    }),
  ],
  build: {
    copyPublicDir: false,
    sourcemap: false,
    lib: {
      fileName: 'main',
      name: '@sovgut/allocate',
      entry: resolve('src', 'main.ts'),
      formats: ['es'],
    },
    minify: 'esbuild',
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
