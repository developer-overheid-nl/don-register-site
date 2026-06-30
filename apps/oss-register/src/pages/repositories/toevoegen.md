---
layout: "../../layouts/Markdown.astro"
title: Repositories toevoegen
---

## Repositories toevoegen aan het Open Source Register

Het Open Source Register maakt open source repositories van overheidsorganisaties vindbaar. Repositories toevoegen kan op twee manieren: via de **API van het register** of door ons een **mail** te sturen, dan voegen wij ze voor je toe.

In beide gevallen geldt: het moet gaan om een overheidsorganisatie die te vinden is in [organisaties.overheid.nl](https://organisaties.overheid.nl). Is de repository in opdracht van een overheidsorganisatie gemaakt? Dan mag je ook de URL van de opdrachtgever gebruiken.

### Het belang van publiccode.yml

We halen zoveel mogelijk informatie uit het `publiccode.yml`-bestand in de root van een repository. Hoe vollediger dit bestand is ingevuld, hoe meer waardevolle informatie we in het register kunnen tonen — denk aan beschrijving, contactpersoon, licentie, gebruikte standaarden en afhankelijkheden.

Heb je nog geen `publiccode.yml`? Op [developer.overheid.nl/kennisbank/open-source/standaarden/publiccode-yml](https://developer.overheid.nl/kennisbank/open-source/standaarden/publiccode-yml) leggen we uit hoe je er een maakt en wat je erin kwijt kunt.

### Optie 1: Stuur ons een mail

De makkelijkste manier: mail naar [developer.overheid@geonovum.nl](mailto:developer.overheid@geonovum.nl) met:

- De URL van de organisatie op [organisaties.overheid.nl](https://organisaties.overheid.nl) (van jezelf of van de opdrachtgever)
- Een link naar de git-organisatie of -group waaronder de repositories vallen (bijvoorbeeld `https://github.com/developer-overheid-nl`)

Wij voegen de repositories dan voor je toe aan het register.

### Optie 2: Voeg ze zelf toe via de API

Wil je het zelf via de API doen? Dan heb je schrijfrechten nodig. Die verstrekken we alleen aan zogenaamde _trusted clients_: bekende (semi-)overheidsorganisaties. Met deze credentials heb je ook toegang tot de API van het [API-register](https://apis.developer.overheid.nl/apis/toevoegen).

#### Schrijfrechten aanvragen

Stuur een mail naar [developer.overheid@geonovum.nl](mailto:developer.overheid@geonovum.nl) om schrijfrechten te krijgen. Vermeld hierbij je contactgegevens en bij welke (semi-)overheidsorganisatie je hoort. Na goedkeuring ontvang je de benodigde credentials.

Wil je alleen leesrechten op het Open Source Register? Kijk dan op de pagina [API-sleutel aanvragen](https://apis.developer.overheid.nl/apis/key-aanvragen) van het API-register.

#### Repositories toevoegen

Stuur onderstaande informatie middels een `POST`-request naar onze API:

- `organisationUri`: De identifier van de organisatie waaronder de repositories vallen
- `url`: Een link naar de git-organisatie/group waaronder de repositories vallen (bijvoorbeeld `https://github.com/developer-overheid-nl`)

Bekijk voor de technische werking van de API onze API-documentatie: <https://apis.developer.overheid.nl/apis/kIDmDnHvg>
