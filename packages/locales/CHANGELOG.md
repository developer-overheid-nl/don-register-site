# @developer-overheid-nl/don-register-locales

## 1.1.0

### Minor Changes

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

### Patch Changes

- a7a1405: Small bugfixes, server error details in action, future test file setup

## 1.0.0

### Major Changes

- d8d2e78: Version 1.0!

### Minor Changes

- 8dde9ed: nieuwe vertalingen toegevoegd voor foutmeldingen bij het aanvragen van een API-sleutel.
