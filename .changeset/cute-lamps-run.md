---
"@developer-overheid-nl/don-register-components": minor
"@developer-overheid-nl/don-register-locales": minor
---

Nieuwe components:

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
