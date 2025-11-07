const postcssGlobalData = require("@csstools/postcss-global-data");

module.exports = {
  plugins: [
    postcssGlobalData({
      files: [
        "../../packages/layouts/src/styles/breakpoints.css",
      ],
    }),
    require("postcss-custom-media"),
  ],
};
