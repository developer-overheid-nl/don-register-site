---
layout: "../../layouts/Markdown.astro"
title: Schema's toevoegen
---

## JSON Schema's toevoegen aan het Schema-register

Het Schema-register maakt JSON Schemas van overheidsorganisaties vindbaar en herbruikbaar. Schema's toevoegen kan op twee manieren: via de **API van het register** of door ons een **mail** te sturen, dan voegen wij ze voor je toe.

In beide gevallen geldt: het moet gaan om een overheidsorganisatie die te vinden is in [organisaties.overheid.nl](https://organisaties.overheid.nl). Is het schema in opdracht van een overheidsorganisatie gemaakt? Dan mag je ook de URL van de opdrachtgever gebruiken.

### Wat registreren we?

Bij het registreren haalt de API het JSON Schema op via de opgegeven `schemaUrl` (of leest het uit de meegestuurde `schemaBody`), valideert het en slaat het op samen met afgeleide metadata zoals de titel, omschrijving, het dialect (`$schema`) en het root type. Het register houdt het schema daarna actueel: dagelijks wordt gecontroleerd of de inhoud op de bron-URL gewijzigd is.

Zorg er dus voor dat je schema een duidelijke `title` en `description` bevat en een `$schema`-declaratie heeft (bijvoorbeeld `https://json-schema.org/draft/2020-12/schema`).

### Optie 1: Stuur ons een mail

De makkelijkste manier: mail naar [developer.overheid@geonovum.nl](mailto:developer.overheid@geonovum.nl) met:

- De URL van de organisatie op [organisaties.overheid.nl](https://organisaties.overheid.nl) (van jezelf of van de opdrachtgever)
- De URL('s) van de JSON Schema's die je wilt registreren
- Contactgegevens van de beheerder (naam, e-mailadres en URL)

Wij voegen de schema's dan voor je toe aan het register.

### Optie 2: Voeg ze zelf toe via de API

Wil je het zelf via de API doen? Dan heb je schrijfrechten nodig. Die verstrekken we alleen aan zogenaamde *trusted clients*: bekende (semi-)overheidsorganisaties. Met deze credentials heb je ook toegang tot de API van het [API-register](https://apis.developer.overheid.nl/apis/toevoegen).

#### Schrijfrechten aanvragen

Stuur een mail naar [developer.overheid@geonovum.nl](mailto:developer.overheid@geonovum.nl) om schrijfrechten te krijgen. Vermeld hierbij je contactgegevens en bij welke (semi-)overheidsorganisatie je hoort. Na goedkeuring ontvang je de benodigde credentials.

Wil je alleen leesrechten op het Schema-register? Kijk dan op de pagina [API-sleutel aanvragen](https://apis.developer.overheid.nl/apis/key-aanvragen) van het API-register.

#### Schema's toevoegen

Stuur onderstaande informatie middels een `POST`-request naar `/schemas`:

- `schemaUrl`: De URL waarop het JSON Schema te vinden is (of gebruik `schemaBody` om het schema direct mee te sturen)
- `organisationUri`: De identifier van de organisatie waaronder het schema valt
- `contact`: Contactgegevens van de beheerder (`name`, `email` en `url`)

Met een `PUT`-request naar `/schemas/{id}` werk je een bestaand schema bij; het register haalt het schema dan opnieuw op.

Bekijk voor de technische werking van de API onze API-documentatie.
