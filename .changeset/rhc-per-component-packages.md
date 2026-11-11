---
"@developer-overheid-nl/don-register-components": minor
"@developer-overheid-nl/don-register-layouts": minor
"@developer-overheid-nl/schema-register": patch
---

Rijkshuisstijl Community (RHC) bijgewerkt: design-tokens 11 → 18, components-css 12 → 18, components-react 11 → 17.

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
