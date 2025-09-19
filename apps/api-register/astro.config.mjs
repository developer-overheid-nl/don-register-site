// @ts-check
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";
// import { patchCssModules } from 'vite-css-modules';

// Settings for parse-link-header, see .env file
const { 
  PARSE_LINK_HEADER_MAXLEN, 
  PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED 
} = loadEnv(import.meta.env.MODE, process.cwd(), '');

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
    // Settings for parse-link-header, see .env file
    define: {
      'process.env.PARSE_LINK_HEADER_MAXLEN': JSON.stringify(PARSE_LINK_HEADER_MAXLEN),
      'process.env.PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED': JSON.stringify(PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED),
    },
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
  env: {
    schema: {
      API_URL: envField.string({ context: "server", access: "public" }),
      API_ENDPOINT: envField.string({ context: "server", access: "public" }),
      API_X_API_KEY: envField.string({ context: "server", access: "public", optional: true }),
      API_VERSION: envField.string({
        context: "server",
        access: "public",
        default: "v1",
      }),
    },
    // validateSecrets: false,
  },
});
