import { addons } from "storybook/manager-api";
import {
  defaultConfig,
  type TagBadgeParameters,
} from "storybook-addon-tag-badges/manager-helpers";

addons.setConfig({
  tagBadges: [
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
    // Place the default config after your custom matchers.
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});
