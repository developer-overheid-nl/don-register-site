import postcssGlobalData from "@csstools/postcss-global-data";
import type { StorybookConfig } from "@storybook/react-vite";
import postcssCustomMedia from "postcss-custom-media";
import remarkGfm from "remark-gfm";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "../packages/components/src/**/*.mdx",
    "../packages/components/src/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "storybook-addon-tag-badges",
    "@storybook/addon-vitest",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
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
