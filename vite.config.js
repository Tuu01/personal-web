import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  build: {
    // three.js lives in the lazily loaded room chunk (~270 kB gzipped); it never
    // blocks first paint, so the default 500 kB warning is noise here.
    chunkSizeWarningLimit: 1100,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/__tests__/setup.js",
  },
});
