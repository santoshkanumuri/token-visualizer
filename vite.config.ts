import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/token-visualizer/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
