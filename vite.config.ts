import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/llm-token-visualizer/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
