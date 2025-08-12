// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://apis.developer.overheid.nl",
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ["@astrojs/react"],
      // external: ['@developer-overheid-nl/don-register-components/fetch'],
    },
    optimizeDeps: {
      include: ["@developer-overheid-nl/don-register-components/fetch"],
    },
  },
  env: {
    schema: {
      API_URL: envField.string({ context: "client", access: "public" }),
      API_ENDPOINT: envField.string({ context: "client", access: "public" }),
      API_X_API_KEY: envField.string({ context: "server", access: "public", optional: true }),
      API_VERSION: envField.string({
        context: "client",
        access: "public",
        default: "v1",
      }),
    },
    validateSecrets: false,
  },
});
