import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 👇 defineConfig de Vite, con compatibilidad de Vitest
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});