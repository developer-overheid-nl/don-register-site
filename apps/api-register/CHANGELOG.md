# @developer-overheid-nl/api-register

## 1.4.1

### Patch Changes

- 0c1e1a4: Use the API summary field for overview cards and handle null summaries defensively.

## 1.4.0

### Minor Changes

- 2541ddc: Added a new RSS feed section on the api detail page

### Patch Changes

- de238a8: Show a warning banner on API detail pages when an API has the `retired` lifecycle status.
- 0f983ad: Upgraded Astro to 6.4.2
- 2d5c790: Altcha widget geüpgraded naar de laatste versie en het gebruikt nu de nieuwe v2 proof-of-work methode.
  Meerdere dependencies geüpgraded naar de laatste versies.
- Updated dependencies [d8a39db]
- Updated dependencies [e5f0a52]
- Updated dependencies [0f983ad]
  - @developer-overheid-nl/don-register-components@1.3.1
  - @developer-overheid-nl/don-register-layouts@1.2.1

## 1.3.0

### Minor Changes

- 4d320fc: Eerste- en laatste pagina-knoppen en twee paginaknoppen voor en na huidige toegevoegd bij paginering.
- 817ee0f: Nieuwe filter mogelijkheden:
  - Link om alle filters te verwijderen
  - Link om zoekterm te verwijderen
  - Labels van de categorieen toegevoegd

### Patch Changes

- a3c5408: Zoeken maakt nu gebruik van de list/filter-endpoints zodat filter- en zoektermen gecombineerd gebruikt kunnen worden.
- Updated dependencies [4d320fc]
- Updated dependencies [4521021]
- Updated dependencies [817ee0f]
  - @developer-overheid-nl/don-register-components@1.3.0
  - @developer-overheid-nl/don-register-layouts@1.2.0

## 1.2.1

### Patch Changes

- 373f1f5: Changed the oas checker url

## 1.2.0

### Minor Changes

- 0d9f083: Add filters to the API register overview, including live filter updates.
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
