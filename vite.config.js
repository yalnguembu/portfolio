import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    minify: "terser",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        projects: resolve(__dirname, "src/projects.html"),
        projectDetail: resolve(__dirname, "src/project-detail.html"),
        notFound: resolve(__dirname, "src/404.html"),
        serverError: resolve(__dirname, "src/500.html"),
        serviceUnavailable: resolve(__dirname, "src/503.html"),
        offline: resolve(__dirname, "src/offline.html"),
      },
      output: {
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "css/[name][extname]";
          }
          if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(assetInfo.name)) {
            return "images/[name][extname]";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
