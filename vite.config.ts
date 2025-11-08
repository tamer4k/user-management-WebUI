import { defineConfig } from 'vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [viteCommonjs()],
  resolve: {
    mainFields: ['module', 'main'],
  },
  optimizeDeps: {
    include: [
      '@angular/core',
      '@angular/common',
      '@angular/router',
      'zone.js'
    ]
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});