// @ts-nocheck

import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import postcssGlobalData from "@csstools/postcss-global-data";
import { defineConfig, envField, memoryCache } from "astro/config";
import postcssCustomMedia from "postcss-custom-media";

// https://astro.build/config
export default defineConfig({
  site: "https://oss.developer.overheid.nl",
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  server: {
    host: "0.0.0.0",
    port: 4321,
    allowedHosts: [
      "oss.developer.overheid.nl",
      "**.don.projects.digilab.network",
    ],
  },
  cache: {
    provider: memoryCache(),
  },
  routeRules: {
    "/repositories/[id]": {
      maxAge: 3600,
      swr: 7200,
    },
    "/repositories/pagina/[...page]": {
      maxAge: 1800,
      swr: 3600,
    },
    "/repositories/toevoegen": {
      maxAge: 86400,
      tag: "content",
    },
    "api/[...any]": {
      maxAge: 0,
    },
    "[...rest]": {
      maxAge: 86400,
      tag: "other",
    },
  },
  security: {
    allowedDomains: [
      {
        hostname: "oss.developer.overheid.nl",
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
    mdx(),
  ],
  build: {
    inlineStylesheets: "never",
  },
  vite: {
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
          rolldownOptions: {
            output: {
              codeSplitting: {
                groups: [
                  {
                    test: /node_modules\/(astro|@astro)/,
                    name: "astro",
                  },
                  {
                    test: /node_modules\/(react|react-dom)/,
                    name: "react",
                  },
                  {
                    test: /node_modules\/@piwikpro\//,
                    name: "piwikpro",
                  },
                  {
                    test: /node_modules\/@developer-overheid-nl\/don-register-components/,
                    name: "components",
                  },
                  {
                    test: /node_modules\/@developer-overheid-nl\/don-register-layouts/,
                    name: "layouts",
                  },
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
    },
  },
  redirects: {
    "contact": "https://developer.overheid.nl/contact/",
    "privacy": "https://developer.overheid.nl/privacy/",
  },
});
