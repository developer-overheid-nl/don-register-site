# @developer-overheid-nl/don-register-components

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
