# @developer-overheid-nl/schema-register

## 3.2.1

### Patch Changes

- 252b932: Rijkshuisstijl Community (RHC) bijgewerkt: design-tokens 11 → 18, components-css 12 → 18, components-react 11 → 17.
  
  - Componenten komen nu uit de losse RHC-packages
    (bijv. `@rijkshuisstijl-community/button-react/no-side-effects`).
    `components-react` blijft alleen nodig voor `FormField*` en `Table*`.
  - Het thema heet nu `groen`: `design-tokens/dist/groen/root.css` in plaats van `dist/uitvoerend-groen/root.css`.
  - De footer houdt het oude ontwerp: `footer-react` en `footer-css` staan vast op 1.x.
  - `--rhc-space-200` is hernoemd naar `--rhc-space-xl`.
  - `Paragraph` met `purpose="short"` geeft de prop niet meer door aan RHC.
  - Het uiterlijk blijft gelijk aan RHC 11: `override.css` zet de gewijzigde tokens terug
    (blauwe koppen, groene kaarten/badges, 24px iconen, footer-tokens, max-breedte 1280px).
    Alert, Header, Footer en FormFieldCheckboxOption krijgen kleine CSS-correcties.
- Updated dependencies [252b932]
  - @developer-overheid-nl/don-register-components@1.8.0
  - @developer-overheid-nl/don-register-layouts@2.3.0

## 3.2.0

### Minor Changes

- afbcd81: Een site-brede melding onder het hoofdmenu, en het Schema-register gebruikt hem voor zijn beta-status.
  
  De `Base`-layout rendert `appConfig.notice` als die er is: een `Alert` met markdown-inhoud, in een eigen rij tussen de navigatie en de pagina-inhoud. Registers zonder `notice` veranderen niet.
  
  Het Schema-register meldt daarmee op elke pagina dat verwijzen met `$ref` kan tijdens het ontwerpen, maar dat een schema voor productiegebruik eerst gekopieerd moet worden, omdat er nog geen Schema Design Rules zijn en URL's, versionering en bestandsnamen dus nog kunnen wijzigen. De melding verwijst naar de werkgroep bij het Kennisplatform API's en naar don-static voor het toevoegen van een schema.
  
  De pagina "Schema's toevoegen" is vervallen, met de link ernaartoe in de footer. Die pagina beschreef toevoegen via de API of per mail, en dat kan voor dit register niet; toevoegen gaat met een pull request op don-static, en de melding bovenaan verwijst daarheen.
  
  De introtekst op het schemaoverzicht is vervallen, inclusief de knop "Toevoegen aan het Schema-register". De bètamelding stond daar dubbel met de nieuwe melding bovenaan.

### Patch Changes

- Updated dependencies [afbcd81]
  - @developer-overheid-nl/don-register-layouts@2.2.0

## 3.1.0

### Minor Changes

- c6dcdfe: Add "Evenementen" link to the "Overig" footer section in api-, oss- and schema-register.

### Patch Changes

- Updated dependencies [fbc3ac4]
- Updated dependencies [fbc3ac4]
- Updated dependencies [fbc3ac4]
- Updated dependencies [fbc3ac4]
- Updated dependencies [1605813]
  - @developer-overheid-nl/don-register-components@1.7.0
  - @developer-overheid-nl/don-register-layouts@2.1.1

## 3.0.0

### Major Changes

- 845eff1: Remove "Communities" section from app.config.ts in api-, oss- and schema-register.

### Patch Changes

- 476c880: Replace `parse-link-header` with a TypeScript port (`parseLinkHeader`) that does not need Node's `url.parse`, and remove the `PARSE_LINK_HEADER_*` env workaround from the apps. Query parameters that appear more than once in a link URL are returned as an array; `parseHeaders` uses the first value when `page` or `perPage` is repeated.
- Updated dependencies [476c880]
  - @developer-overheid-nl/don-register-layouts@2.1.0
  - @developer-overheid-nl/don-register-components@1.6.2

## 2.1.1

### Patch Changes

- Updated dependencies [54d183b]
  - @developer-overheid-nl/don-register-components@1.6.1
  - @developer-overheid-nl/don-register-layouts@2.0.2

## 2.1.0

### Minor Changes

- fe3b5a0: Meta descriptions en social images toegevoegd. Detailpagina's laten nu de summary of short description zien.
- 02e66ef: Upgraded Astro to 7.3
  - Met deze upgrade draaien de websites op de laatste versie van Astro.
  Dit betekent dat we gebruik kunnen maken van nieuwe caching features en performance verbeteringen.
  - Title toegevoegd aan de `favicon.svg` (Biome linting rule).
- 812b070: Intro op de overzichtspagina omgezet naar MDX, met een `ButtonAction` als call to action voor het toevoegen van API's, repositories en schema's.

### Patch Changes

- 8c3196b: fix: update GitHub link in app configuration to point to the organization
- Updated dependencies [812b070]
  - @developer-overheid-nl/don-register-components@1.6.0
  - @developer-overheid-nl/don-register-layouts@2.0.1

## 2.0.2

### Patch Changes

- Updated dependencies [2eb8237]
  - @developer-overheid-nl/don-register-components@1.5.0
  - @developer-overheid-nl/don-register-layouts@1.2.4

## 2.0.1

### Patch Changes

- 8e4d14e: Add JSON syntax highlighting, copy-to-clipboard support, and an external JSON Schema Viewer link to schema detail pages.

## 2.0.0

### Major Changes

- 7f03c1c: Add a new register, schema register.

### Patch Changes

- Updated dependencies [ffd6c71]
  - @developer-overheid-nl/don-register-components@1.4.0
  - @developer-overheid-nl/don-register-layouts@1.2.3
