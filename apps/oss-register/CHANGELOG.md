# @developer-overheid-nl/oss-register

## 2.0.0

### Major Changes

- b404400: Nieuwe Filters:

  - Nieuwe facet filter toegevoegd
    - vanuit nieuw `filters`-endpoint
    - gebruik van nieuwe componenten
    - client-side updates van filters bij selectie (onChange)
  - Nieuwe informatie op de detailpagina

    - uit de publiccode.yml van repositories
    - info over fork, type of dat url in publiccode mogelijk niet klopt

  - Nieuw PillBadges in overview- en detailpagina
  - Oude organisatie-filters verwijderd

  - Nieuwe translation keys toegevoegd

### Minor Changes

- 4bc38b3: Removed deprecated pageTitle from PiwikPro component, added customEvent for (filtered) Overview pages

### Patch Changes

- b404400: Updated Typescript schema's
- 3aca994: Upgraded Astro to version 6
- a7a1405: Small bugfixes, server error details in action, future test file setup
- 55e64bb: Bump the astro packages with 2 updates
- Updated dependencies [b404400]
- Updated dependencies [b404400]
- Updated dependencies [4bc38b3]
- Updated dependencies [a7a1405]
  - @developer-overheid-nl/don-register-layouts@1.1.0
  - @developer-overheid-nl/don-register-components@1.2.0

## 1.1.0

### Minor Changes

- 216e52a: 196 publiccodeyml pill badges toevoegen

  Small fixes: removed some old keys used in earlier responses

- 804dc03: Piwik Pro added.
  - Piwik (statistiek.rijksoverheid.nl) analytics tracking on the register sites.
  - Added configuration and components necessary for analytics.
  - Updated `ApiKeyForm` component to report submissions to analytics.
  - Bumped three packages by a minor version to accommodate the new feature.
  - Removed unused Matomo code from the layouts package.

### Patch Changes

- 4447980: Updated dependencies

  Removed standalone postcss.config.cjs files from apps (integrated into astro.config.mjs)

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
