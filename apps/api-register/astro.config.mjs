// @ts-check

import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";

// Settings for parse-link-header, see .env file
const { PARSE_LINK_HEADER_MAXLEN, PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED } =
  loadEnv(import.meta.env.MODE, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: "https://apis.developer.overheid.nl",
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  server: {
    host: "0.0.0.0",
    port: 4321,
  },
  integrations: [
    react(),
  ],
  build: {
    inlineStylesheets: "never",
  },
  vite: {
    // Settings for parse-link-header, see .env file
    define: {
      "process.env.PARSE_LINK_HEADER_MAXLEN": JSON.stringify(
        PARSE_LINK_HEADER_MAXLEN,
      ),
      "process.env.PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED": JSON.stringify(
        PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED,
      ),
    },
    ssr: {
      noExternal: [
        "@astrojs/react",
      ],
    },
  },
  env: {
    schema: {
      API_URL: envField.string({
        context: "server",
        access: "secret",
      }),
      API_ENDPOINT: envField.string({
        context: "server",
        access: "secret",
      }),
      TOOLS_ENDPOINT: envField.string({
        context: "server",
        access: "secret",
      }),
      API_X_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      API_VERSION: envField.enum({
        values: [
          "v1",
        ],
        context: "server",
        access: "public",
        default: "v1",
      }),
      PUBLIC_MATOMO_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_MATOMO_SCRIPT_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_MATOMO_SITE_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  redirects: {
    "contact": "https://developer.overheid.nl/contact/",
    "privacy": "https://developer.overheid.nl/privacy/",
  },
});
