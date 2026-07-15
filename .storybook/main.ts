import postcssGlobalData from "@csstools/postcss-global-data";
import type { StorybookConfig } from "@storybook/react-vite";
import postcssCustomMedia from "postcss-custom-media";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../packages/components/src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
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
