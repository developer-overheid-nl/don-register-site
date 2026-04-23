// @ts-nocheck

import node from "@astrojs/node";
import react from "@astrojs/react";
import postcssGlobalData from "@csstools/postcss-global-data";
import { defineConfig, envField } from "astro/config";
import postcssCustomMedia from "postcss-custom-media";
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
    allowedHosts: [
      "apis.developer.overheid.nl",
      "**.don.projects.digilab.network",
    ],
  },
  security: {
    allowedDomains: [
      {
        hostname: "apis.developer.overheid.nl",
        protocol: "https",
      },
      {
        hostname: "**.don.projects.digilab.network",
        protocol: "https",
      },
    ],
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
    css: {
      postcss: {
        plugins: [
          postcssGlobalData({
            files: [
              "../../packages/layouts/src/styles/breakpoints.css",
            ],
          }),
          postcssCustomMedia(),
        ],
      },
    },
    environments: {
      client: {
        build: {
          rollupOptions: {
            output: {
              manualChunks: {
                react: [
                  "react",
                  "react-dom",
                ],
                piwikpro: [
                  "@piwikpro/react-piwik-pro",
                ],
                libs: [
                  "i18next",
                  "altcha",
                  "altcha-lib",
                  "openapi-fetch",
                ],
              },
            },
          },
        },
      },
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
      PIWIK_PRO_SITE_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      PIWIK_PRO_ACCOUNT_ADDRESS: envField.string({
        context: "server",
        access: "public",
      }),
      ALTCHA_HMAC_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  redirects: {
    "contact": "https://developer.overheid.nl/contact/",
    "privacy": "https://developer.overheid.nl/privacy/",
  },
});
