---
"@developer-overheid-nl/don-register-components": patch
"@developer-overheid-nl/don-register-locales": patch
---

`FacetFilters` opgesplitst in een component per filtertype (toggle, multi-select, single-select, search-select). Het gedrag en de exports blijven gelijk.

- Het id van de hulptekst bij het zoekveld is nu uniek per filter (`<key>-search-help`).
- "Toon meer" / "Toon minder" komen nu uit de vertalingen (`components.show-more`, `components.show-less`).
