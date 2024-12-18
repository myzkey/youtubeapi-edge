/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      exclude: [
        'examples/**',
        'src/**/types/**',
        'dist/**',
        'eslint.config.mjs',
        'vite.config.ts',
      ],
    },
  },
})
