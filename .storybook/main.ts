import { readFileSync } from "node:fs";
import postcssGlobalData from "@csstools/postcss-global-data";
import type { StorybookConfig } from "@storybook/react-vite";
import postcssCustomMedia from "postcss-custom-media";
import remarkGfm from "remark-gfm";
import { mergeConfig } from "vite";
import { parse } from "yaml";

const readText = (path: string) =>
  readFileSync(new URL(path, import.meta.url), "utf-8");

const workspacePackages = ["components", "layouts", "locales"];

const catalogPackages = [
  "@rijkshuisstijl-community/components-react",
  "@rijkshuisstijl-community/components-css",
  "@rijkshuisstijl-community/design-tokens",
  "react",
  "astro",
];

/** Versions shown on the Introduction page, read at build time. */
const getPackageVersions = (): Record<string, string> => {
  const versions: Record<string, string> = {};

  for (const dir of workspacePackages) {
    const { name, version } = JSON.parse(
      readText(`../packages/${dir}/package.json`),
    );
    versions[name] = version;
  }

  const { catalog } = parse(readText("../pnpm-workspace.yaml"));
  for (const name of catalogPackages) {
    versions[name] = catalog[name];
  }

  return versions;
};

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
      define: {
        __PACKAGE_VERSIONS__: JSON.stringify(getPackageVersions()),
      },
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
