/// <reference types="astro/client" />

// Plain `tsc` can't read .astro files (editors use the Astro TS plugin for that).
// This declaration lets `tsc --noEmit` resolve the layout re-exports in index.ts.
declare module "*.astro" {
  const Component: (props: Record<string, unknown>) => unknown;
  export default Component;
}
