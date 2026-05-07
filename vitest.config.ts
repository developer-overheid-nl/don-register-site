/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig(
  {
    // @ts-expect-error: Vitest 'test' property not recognized in Astro's Vite config type
    test: {
      // Vitest configuration options
      projects: [
        "packages/*",
        "apps/*",
      ],
    },
  },
  {
    // Astro configuration options
  },
);
