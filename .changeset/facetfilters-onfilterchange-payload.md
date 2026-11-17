---
"@developer-overheid-nl/don-register-components": patch
---

`FacetFilters`: `onFilterChange` geeft nu alle wijzigingen sinds de laatste filterdata door. Eerder werd elke wijziging berekend vanaf de `filters`-prop, waardoor bij twee snelle wijzigingen alleen de laatste in de payload stond.
