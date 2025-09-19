// @ts-check
import { defineConfig } from "astro/config";
// import { patchCssModules } from 'vite-css-modules';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    // plugins: [
    //   // @ts-ignore
    //   patchCssModules({
    //     generateSourceTypes: true
    //   })
    // ],
    ssr: {
      noExternal: ["@astrojs/react"],
    },
  },
});
