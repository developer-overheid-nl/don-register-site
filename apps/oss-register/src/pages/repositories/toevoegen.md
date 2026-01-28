---
layout: "../../layouts/Markdown.astro"
title: Repositories toevoegen
---

## Repositories toevoegen aan het OSS-register

Het OSS-register maakt open source repositories van overheidsorganisaties vindbaar. Het toevoegen van repositories verloopt uitsluitend via de **API van het register**.
Hiervoor zijn schrijfrechten nodig, die alleen verstrekt worden aan zogenaamde *trusted clients*. Dit zijn clients die bekend zijn bij ons en alleen (semi-)overheidsorganisaties komen hiervoor in aanmerking.
Met deze credentials heb je ook toegang tot de API van het [API-register](https://apis.developer.overheid.nl/apis/toevoegen).

### Schrijfrechten aanvragen

Stuur een mail naar [developer.overheid@geonovum.nl](mailto:developer.overheid@geonovum.nl) om schrijfrechten te krijgen. Vermeld hierbij je contactgegevens en bij welke (semi-)overheidsorganisatie je hoort. Na goedkeuring ontvang je de benodigde credentials.

### Repositories toevoegen

Om repositories toe te voegen stuur je onderstaande informatie middels een `POST`-request naar onze API:

- `organisationUri`: De identifier van de organisatie waaronder de repositories vallen
- `url`: Een link naar de git organisatie/group waaronder de repositories vallen (bijvoorbeeld `https://github.com/developer-overheid-nl`)

Bekijk voor de technische werking van de API onze API-documentatie: <https://apis.developer.overheid.nl/apis/kIDmDnHvg>
