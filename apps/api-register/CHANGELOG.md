# @developer-overheid-nl/api-register

## 1.1.1

### Patch Changes

- 55e64bb: Bump the astro packages with 2 updates

## 1.1.0

### Minor Changes

- 804dc03: Piwik Pro added.
  - Piwik (statistiek.rijksoverheid.nl) analytics tracking on the register sites.
  - Added configuration and components necessary for analytics.
  - Updated `ApiKeyForm` component to report submissions to analytics.
  - Bumped three packages by a minor version to accommodate the new feature.
  - Removed unused Matomo code from the layouts package.

### Patch Changes

- 4447980: Updated dependencies

  Removed standalone postcss.config.cjs files from apps (integrated into astro.config.mjs)

- 216e52a: 196 publiccodeyml pill badges toevoegen

  Small fixes: removed some old keys used in earlier responses

- f7034b9: Updated dependencies:
  - @rijkshuisstijl-community/components-css
  - @rijkshuisstijl-community/components-react
- Updated dependencies [4447980]
- Updated dependencies [804dc03]
- Updated dependencies [804dc03]
- Updated dependencies [f7034b9]
- Updated dependencies [ded15aa]
  - @developer-overheid-nl/don-register-components@1.1.0
  - @developer-overheid-nl/don-register-layouts@1.0.2

## 1.0.0

### Major Changes

- 41ab3e5: Formulier om API-key aan te vragen toegevoegd
  - In app `api-register` is een formulier toegevoegd waarmee gebruikers een API-sleutel kunnen aanvragen.
  - In app `oss-register` links toegevoegd naar de API-key aanvraag

### Patch Changes

- Updated dependencies [d8d2e78]
- Updated dependencies [3b4f506]
- Updated dependencies [8dde9ed]
- Updated dependencies [8dde9ed]
  - @developer-overheid-nl/don-register-components@1.0.0
  - @developer-overheid-nl/don-register-layouts@1.0.0
