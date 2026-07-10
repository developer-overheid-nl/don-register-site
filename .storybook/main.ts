import postcssGlobalData from "@csstools/postcss-global-data";
import type { StorybookConfig } from "@storybook/react-vite";
import postcssCustomMedia from "postcss-custom-media";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../packages/components/src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [
            postcssGlobalData({
              files: [
                new URL(
                  "../packages/layouts/src/styles/breakpoints.css",
                  import.meta.url,
                ).pathname,
              ],
            }),
            postcssCustomMedia(),
          ],
        },
      },
    });
  },
};

export default config;
