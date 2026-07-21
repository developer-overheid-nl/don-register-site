import postcssGlobalData from "@csstools/postcss-global-data";
import type { StorybookConfig } from "@storybook/react-vite";
import postcssCustomMedia from "postcss-custom-media";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../packages/components/src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "storybook-addon-tag-badges",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
  // docs: {
  //   autodocs: "tag",
  // },
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [
            postcssGlobalData({
              files: ["./packages/layouts/src/styles/breakpoints.css"],
            }),
            postcssCustomMedia(),
          ],
        },
      },
    });
  },
};

export default config;
