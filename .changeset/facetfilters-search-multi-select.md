---
"@developer-overheid-nl/don-register-components": minor
---

`FacetFilters` heeft een nieuw filtertype `search-multi-select`: een lange lijst met zoekveld en "Toon meer", waarin meerdere opties gekozen kunnen worden (checkboxes).

- `search-select` is hernoemd naar `search-single-select`. Het oude type is verouderd, maar blijft werken.
- `getSelectedFilters` en `getSelectedFiltersMap` geven nu ook de gekozen opties van de zoek-filters terug.
