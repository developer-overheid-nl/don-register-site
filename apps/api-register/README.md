# developer.overheid.nl API-register website

## Mappenstructuur

```text
/apps/api-register/
      ├── public/
      ├── src/
      │   └── layouts/
      │       └── Markdown.astro
      │   └── pages/
      │       └── ... {Alle pagina's van de site}
      │   └── partials/
      │       └── ... {Bijv intro.md voor de introtekst}
      │   └── types/
      │       ├── unknown-schema.ts
      │       └── api-schema.ts {Generated type declarations}
      ├── .env* 
      ├── app.config.ts
      ├── astro.config.mjs
      ├── package.json
      └── tsconfig.json
```

Astro kijkt in de map `src/pages` voor `.astro` of `.md` bestanden. Hiermee bouwt het de site op. Lees meer over [Astro Pages](https://docs.astro.build/en/basics/astro-pages/).

De map `src/layouts` bevat (o.a) een layout voor Markdown-bestanden. Deze komt niet uit de generieke packages omdat frontmatter niet om kan gaan met niet-relatieve urls.

**Note:** elk `.md`-bestand moet het volgende in de front-matter hebben staan:

```text
---
layout: "../layouts/Markdown.astro"
---
```

Zie ook [Markdown/MDX Pages](https://docs.astro.build/en/basics/astro-pages/#markdownmdx-pages)

De map `src/partials` is bedoelt om makkelijk stukken tekst in Markdown te kunnen schrijven die in een pagina ingevoegd worden, zoals bijvoorbeeld een introtekst.

In de map `src/types` worden de api-schema's weggeschreven, zie [redocly.yaml](../../README.md#redoclyyaml).

De configuratiebestanden `astro.config.mjs` en `app.config.ts` bevatten de configuraties. Zie [Configuration overview](https://docs.astro.build/en/guides/configuring-astro/) voor de eerste. De laatste is een specifieke voor deze site. Hierin staat onder andere de topnavigatie en footer-menu gedefinieerd. Ook kunnen localisations worden aangepast, bijv in deze site zijn de `items` "API's".

In het bestand `.env` staan de omgevings variabelen voor de API-connectie. Ook staat hier een fix voor de package `parse-link-header` als deze client-side gebruikt wordt.
Het bestand `.env.mode.example` kan gekopieerd worden naar bijv. `env.developement.local` waarna de juiste keys ingevuld kunnen worden. Deze worden niet meegecommit in git.

## Dependencies

- `astro` en `@astrojs/react`: [Astro](https://astro.build)
- `openapi-fetch` en `i18next`: typed api fetch en localisation
- `vite` voor de build
- `developer-overheid-nl/don-register-components` en `developer-overheid-nl/don-register-layouts` de generieke componenten en layouts

TODO: remove other packages
