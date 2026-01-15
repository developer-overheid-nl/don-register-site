import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        client: resolve(__dirname, "src/client.ts"),
        i18n: resolve(__dirname, "src/i18n.ts"),
      },
      name: "DON Components",
      // fileName: "components",
      cssFileName: "styles",
    },
    ssr: 'src/index.ts',
    ssrEmitAssets: true,
    rollupOptions: {
      // input: {
      //   index: resolve(__dirname, "src/index.ts"),
      //   client: resolve(__dirname, "src/client.ts"),
      //   i18n: resolve(__dirname, "src/i18n.ts"),
      // },
      external: [
        "react",
      ],
      output: {
        globals: {
          react: "React",
        },
        chunkFileNames: "chunk-[hash].js",
        manualChunks: undefined,
      },
    },
    minify: false,
    license: {
      fileName: "bundled-licenses.json",
    },
  },
  plugins: [
    react(),
    dts(),
  ],
});
