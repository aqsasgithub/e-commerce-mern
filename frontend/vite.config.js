import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'tailwindcss',
      config() {
        return tailwindcss();
      },
    },
  ],
  server: {
    proxy: {
      '/api/': 'https://e-commerce-mern-b4ef.onrender.com',
      '/uploads/': 'https://e-commerce-mern-b4ef.onrender.com',
    },
  },
});
