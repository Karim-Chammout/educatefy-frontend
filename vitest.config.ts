import path from 'path';
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

// Vitest config, runs the unit + integration tests.
// https://vitest.dev/config/
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: false,
      // Runs before EVERY test file.
      setupFiles: ['src/test/setup.ts'],
      css: false,
      include: ['src/**/*.test.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/generated/**', 'src/test/**', '**/*.test.{ts,tsx}', '**/*.d.ts'],
        thresholds: {
          lines: 20,
          branches: 14,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }),
);
