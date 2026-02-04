---
layout: "../../layouts/Markdown.astro"
title: API's toevoegen
---

## API's toevoegen aan het API-register

Het API-register maakt API's van overheidsorganisaties vindbaar, bruikbaar en duurzaam toegankelijk. Het toevoegen en bijwerken van API's verloopt uitsluitend via de **API van het register**.
Hiervoor zijn schrijfrechten nodig, die alleen verstrekt worden aan zogenaamde *trusted clients*. Dit zijn clients die bekend zijn bij ons en alleen (semi-)overheidsorganisaties komen hiervoor in aanmerking.
Met deze credentials heb je ook toegang tot de API van het [OSS-register](https://oss.developer.overheid.nl/repositories/toevoegen).

### Schrijfrechten aanvragen

Stuur een mail naar [developer.overheid@geonovum.nl](mailto:developer.overheid@geonovum.nl) om schrijfrechten te krijgen. Vermeld hierbij je contactgegevens en bij welke (semi-)overheidsorganisatie je hoort. Na goedkeuring ontvang je de benodigde credentials.  
Wil je alleen leesrechten op het API-register? Kijk dan op de pagina [API-sleutel aanvragen](/apis/key-aanvragen).

### API toevoegen of wijzigen

Om een API toe te voegen stuur je onderstaande informatie middels een `POST`-request naar onze API. Voor het doorgeven van een wijziging gebruik je een `PUT`-request.

- De organisatie waaronder de API valt
- Een (link naar de) OpenAPI-specificatie (YAML of JSON) van de API

Bekijk voor de technische werking van de API onze API-documentatie: <https://apis.developer.overheid.nl/apis/90szfOzDg>

### API verwijderen

Een API kan niet zomaar uit het register verwijderd worden, omdat de reden voor verwijdering vaak een uitfasering betreft. Voor het API-register betekent dit echter dat de status van de API in *retired* (zie hieronder) is veranderd, wat aangegeven kan worden in de OpenAPI-specificatie.
Mocht een API onverhoopt tóch verwijderd moeten worden (bijvoorbeeld door een foutieve registratie), neem dan contact met ons op.

### Versionering & lifecycle

Het API-register ondersteunt twee extensies in het `info` object van de OpenAPI-specificatie, die gezamenlijk of los van elkaar te gebruiken zijn; `x-deprecated` en `x-sunset`.

#### x-deprecated

Geeft aan vanaf welke datum (`YYYY-mm-dd`) de API niet meer ondersteund wordt. Als deze datum in het verleden ligt dan zal de API met status `deprecated` in het API-register verschijnen. Ligt deze datum in de toekomst dan is de API nog wel actief, maar zal er een waarschuwing verschijnen dat ondersteuning op de aangegeven datum afloopt. De API kan daarna nog wel gebruikt worden maar wordt niet meer ondersteund of doorontwikkeld.

Voorbeeld:

```yaml
openapi: 3.0.0
info:
  version: 1.2.3
  x-deprecated: 2027-01-01 # deze versie wordt vanaf 1 januari 2027 niet meer ondersteund.
```

#### x-sunset

Geeft aan vanaf welke datum (`YYYY-mm-dd`) de API offline gehaald wordt. Als deze datum in het verleden ligt dan zal de API met status `retired` in het API-register verschijnen. Ligt deze datum in de toekomst, dan zal er een waarschuwing verschijnen dat de API momenteel uitgefaseerd wordt en na de `x-sunset`-datum niet meer gebruiken is.

Voorbeeld:

```yaml
openapi: 3.0.0
info:
  version: 1.2.3
  x-sunset: 2027-12-31 # deze versie is vanaf 31 december 2027 niet meer te gebruiken...
  x-deprecated: 2027-01-01 # ...en wordt vanaf 1 januari 2027 al niet meer ondersteund.
```

## Publieke endpoint API-register

Het API-register is publiek toegankelijk. Er is wel een API-key nodig om gebruik te maken van de API. Kijk op de pagina [API-sleutel aanvragen](/apis/key-aanvragen) voor meer informatie.  
Voor de technische werking van de API van het register, zie onze API-documentatie: <https://apis.developer.overheid.nl/apis/90szfOzDg>
