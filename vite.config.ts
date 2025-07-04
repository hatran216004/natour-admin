import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-easy-crop']
  }
});

// optimizeDeps.include bảo Vite: “Hãy xử lý sẵn thư viện này để chắc chắn nó hoạt động tốt.”
