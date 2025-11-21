import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
// Importa el plugin
import webfontDownload from "vite-plugin-webfont-dl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    // Agrega esto al final de plugins:
    webfontDownload([
      // Aquí le decimos qué fuentes queremos (la URL exacta de Google Fonts)
      "https://fonts.googleapis.com/icon?family=Material+Icons&display=swap",
    ]),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
