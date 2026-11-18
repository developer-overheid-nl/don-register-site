---
"@developer-overheid-nl/don-register-components": patch
"@developer-overheid-nl/don-register-layouts": patch
---

Fix TypeScript errors: CSS-module class helpers in AlignBox, Grid and DataSummary accept `string | undefined`, `ReadOnlyTextInputProps` is exported, and the layouts package declares `astro/client` and `*.astro` types so plain `tsc` can check it.
