import { addons } from "storybook/manager-api";
import {
  defaultConfig,
  type TagBadgeParameters,
} from "storybook-addon-tag-badges/manager-helpers";

addons.setConfig({
  tagBadges: [
    // The first tag in this list will be shown in the sidebar, deprecations before any other tags.
    ...defaultConfig.filter(({ tags }) => tags.valueOf() === "deprecated"),
    {
      tags: "re-export",
      badge: ({ context }) => {
        return {
          text: context === "sidebar" ? "🚛" : "Re-export",
          style: { borderColor: "transparent" },
          tooltip: "Re-exported from RHC",
        };
      },
    },
    {
      tags: ["remixed", "mixed"],
      badge: ({ context }) => {
        return {
          text: context === "sidebar" ? "♻️" : "Remixed",
          style: { borderColor: "transparent" },
          tooltip: "Re-exported from RHC and re-mixed",
        };
      },
    },
    {
      tags: "custom",
      badge: ({ context }) => {
        return {
          text: context === "sidebar" ? "✨" : "Custom",
          style: { borderColor: "transparent" },
          tooltip: "Custom component from DON",
        };
      },
    },
    // Place the default config after your custom matchers, these will be shown in the sidebar first.
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});
