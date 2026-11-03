# @developer-overheid-nl/don-register-components

## 1.7.0

### Minor Changes

- fbc3ac4: Add `ButtonLink`: a re-export of the RHC `ButtonLink`, a link styled as a button for navigation that should stand
  out as an action.
- fbc3ac4: FacetFilters: add a `search-select` filter type for choosing one option from a long list. It shows the first
  `showTop` options with a "Toon meer"/"Toon minder" toggle, has a search field that filters the options client-side,
  keeps the chosen option visible while searching, and shows "Geen opties gevonden" when nothing matches. Alert spacing
  changed.
- fbc3ac4: Add `LinkButton`: the RHC `LinkButton` (a button styled as a link, for actions on the current page) with an extra
  `appearance="small"` variant that removes the block padding and uses a smaller font size.

### Patch Changes

- fbc3ac4: FacetFilters: `onFilterChange` now reports only the chosen option for `single-select` and `search-select` filters
  (and an empty list for "Alle"), instead of appending it to the previous selection.
- 1605813: Switch: fix screen reader names. In `explicit` mode the "on" radio is now named "Aan" and the "off" radio "Uit"
  (they were swapped). The default switch now has `role="switch"` and no longer puts a static "Aan"/"Uit" text in its
  name, which went stale after toggling. The `checked` prop is now passed to the default switch input. In `explicit`
  mode with neither option selected, the switch now shows an indeterminate state (thumb in the middle) and the first
  click selects "on"; before, it looked "off" and the first click selected "off", so nothing seemed to change.
  
  FormFieldSwitch: the switch (or, in `explicit` mode, the radio group) is now named by the description plus the amount,
  e.g. "… publiccode.yml bestand. (9)". Before, the group name ended with the first radio's name and the amount only
  belonged to the "on" radio. `AmountLabel` accepts an optional `id` for this.
- Updated dependencies [fbc3ac4]
  - @developer-overheid-nl/don-register-locales@1.3.0

## 1.6.2

### Patch Changes

- 476c880: Replace `parse-link-header` with a TypeScript port (`parseLinkHeader`) that does not need Node's `url.parse`, and remove the `PARSE_LINK_HEADER_*` env workaround from the apps. Query parameters that appear more than once in a link URL are returned as an array; `parseHeaders` uses the first value when `page` or `perPage` is repeated.

## 1.6.1

### Patch Changes

- 54d183b: Updated Readme files to point to the correct CHANGELOG links in the GitHub repository instead of local paths.
- Updated dependencies [54d183b]
  - @developer-overheid-nl/don-register-locales@1.2.3

## 1.6.0

### Minor Changes

- 812b070: `ButtonAction` toegevoegd: een link in de vorm van een knop, voor calls to action zoals "API toevoegen".

## 1.5.1

### Patch Changes

- Updated dependencies [fe3b5a0]
  - @developer-overheid-nl/don-register-locales@1.2.2

## 1.5.0

### Minor Changes

- 2eb8237: Add a generic sorting form and enable sorting by the supported fields in the API Register and Open Source Register.

## 1.4.0

### Minor Changes

- ffd6c71: Add Storybook stories and documentation for every component, add a new `Grid` layout component,
  and fix a `ScoreBadge` deprecation message.

## 1.3.2

### Patch Changes

- 9d30474: Voeg Storybook toe met basisstories voor gedeelde componenten en Chromatic-ondersteuning voor visuele review.

## 1.3.1

### Patch Changes

- d8a39db: Bugfixes pagination parsers en facetfilters, description toegevoegd aan single-select.
- e5f0a52: Keep the publiccode filter state explicit in the OSS register.
  Toggle filters now preserve both `true` and `false` values in the query string, and selected filter badges correctly toggle the publiccode filter instead of removing it.
- 0f983ad: Upgraded Astro to 6.4.2
- Updated dependencies [de238a8]
- Updated dependencies [0f983ad]
  - @developer-overheid-nl/don-register-locales@1.2.1

## 1.3.0

### Minor Changes

- 4d320fc: Pagination component update:
  - Eerste- en laatste-pagina knoppen toegevoegd.
  - Mogelijkheid toegevoegd voor paginaknoppen voor en na huidige pagina.
  - Ellips toegevoegd voor pagina's buiten bereik.
  - Verbeterde toegankelijkheid met ARIA-labels en title-tags.
  - Helper-functions uitgebreidt voor paginering logica.
  - translation.json bijgewerkt voor nieuwe paginering labels.
  - Tests toegevoegd.
- 4521021: Hidden fields toegevoegd om bijv search- en filters in url te behouden. In:
  - Search component
  - Facet Filters component
- 817ee0f: Nieuwe features voor BadgeList, DataBadgeLink en FacetFilters componenten
  - `table` layout style toegevoegd aan BadgeList, element met class `.label` krijgt table-caption styling.
  - `link` layout style toegevoegd aan DataBadgeLink toegevoegd.
  - getSelectedFiltersMap function toegevoegd, zodat labels van de categorieen ook getoond kunnen worden.
  - Deprecations:
    - getSelectedFilters function deprecated.
    - Filters component.
  - Fixes:
    - Tooltip triangle fix.
  - Localisation:
    - Filter-gerelateerde termen geupdated en toegevoegd.

### Patch Changes

- Updated dependencies [4d320fc]
- Updated dependencies [817ee0f]
  - @developer-overheid-nl/don-register-locales@1.2.0

## 1.2.0

### Minor Changes

- b404400: Nieuwe components:

  - FacetFilters, met de types:
    - toggle: boolean filter (switch)
    - multi-select: multiple options, multiple selectable (checkboxes)
    - single-select: multiple options, single selectable (radiobuttons)
  - AmountLabel: label with amount, used in FacetFilters
  - FormFieldCheckboxGroup
  - FormFieldCheckboxOption, with amount label
  - FormFieldRadioGroup
  - FormFieldRadioOption, with amount label
  - Switch: toggle (checkbox)
  - FormFieldSwitch, with amount label
  - InfoButton
  - Tooltip: html popover tooltip; default met InfoButton
  - Overlay: overlay component, blurs the background
  - BadgeList, list for Badge components

  - Changed components:

    - AlignBox: wrap toegevoegd
    - DataBadgeLink: tabIndex toegevoegd met default `undefined`, omdat RHC tabindex=0 op `span` had gezet, fixed Focus styling.
    - Heading: HeadingProps, clampHeadingLevel exported
    - Paragraph: `short` property en styling toegevoegd
    - PillBadge: focus and hover styling toegevoegd

  - Nieuwe translation keys toegevoegd

- 4bc38b3: Refactor PiwikPro component to deprecate pageTitle prop and introduce customEvent for event tracking

### Patch Changes

- a7a1405: Small bugfixes, server error details in action, future test file setup
- Updated dependencies [b404400]
- Updated dependencies [b404400]
- Updated dependencies [a7a1405]
  - @developer-overheid-nl/don-register-locales@1.1.0

## 1.1.0

### Minor Changes

- 804dc03: Added Analytics component.
  - Added `PiwikPro` component to encapsulate Piwik analytics tracking.
  - Added restProps to `AlignBox` component and `CopyButton` component.

### Patch Changes

- 4447980: Updated dependencies

  Removed standalone postcss.config.cjs files from apps (integrated into astro.config.mjs)

- f7034b9: Updated dependencies:
  - @rijkshuisstijl-community/components-css
  - @rijkshuisstijl-community/components-react
- ded15aa: fix: exclude 'current' property when mapping NavBar items

## 1.0.0

### Major Changes

- d8d2e78: Version 1.0!
- 8dde9ed: Nieuwe componenten

  - Button
  - Fieldset
  - FormFieldLabel
  - FormFieldTextInput

  Wijzigingen

  - ReadOnlyTextInput: fontVariant toegevoegd.

### Patch Changes

- 3b4f506: Change value to defaultValue in search form.
- Updated dependencies [8dde9ed]
- Updated dependencies [d8d2e78]
  - @developer-overheid-nl/don-register-locales@1.0.0
