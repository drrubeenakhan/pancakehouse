import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    root: './client',
    plugins: [react()],
    server: {
      port: 5000,
      host: '0.0.0.0',
      allowedHosts: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './client/src'),
        '@shared': path.resolve(__dirname, './shared'),
        '@assets': path.resolve(__dirname, './attached_assets')
      }
    },
    define: {
      'import.meta.env.VITE_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_API_KEY)
    },
    build: {
      outDir: '../dist/public',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom']
          }
        }
      },
      cssCodeSplit: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      target: 'es2020',
      sourcemap: false,
      modulePreload: {
        polyfill: false
      }
    }
  };
});
