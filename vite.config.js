import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    minify: "terser",
    rollupOptions: {
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
