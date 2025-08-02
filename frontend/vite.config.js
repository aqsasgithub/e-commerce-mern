import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': 'https://e-commerce-mern-b4ef.onrender.com',
      '/uploads/': 'https://e-commerce-mern-b4ef.onrender.com',
    },
  },
});
