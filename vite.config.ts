import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
  },
  publicDir: 'public',
});
