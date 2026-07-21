/// <reference types="vitest/config" />

import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { getViteConfig } from "astro/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default getViteConfig(
  {
    // @ts-expect-error: Vitest 'test' property not recognized in Astro's Vite config type
    test: {
      // Vitest configuration options
      projects: [
        "packages/*",
        "apps/*",
        {
          extends: true,
          plugins: [
            storybookTest({
              // The location of your Storybook config, main.js|ts
              configDir: path.join(dirname, ".storybook"),
              // This should match your package.json script to run Storybook
              // The --no-open flag will skip the automatic opening of a browser
              storybookScript: "pnpm storybook --no-open",
            }),
          ],
          test: {
            name: "storybook",
            // Enable browser mode
            browser: {
              enabled: true,
              // Make sure to install Playwright
              provider: playwright({}),
              headless: true,
              instances: [
                {
                  browser: "chromium",
                },
              ],
            },
          },
        },
      ],
    },
  },
  {
    // Astro configuration options
  },
);
