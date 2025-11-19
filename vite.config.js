import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      usePolling: true // Включите это, если используется среда, где изменение файлов не отслеживается
    }
  }
});
