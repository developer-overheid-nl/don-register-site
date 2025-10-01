---
layout: "../../layouts/Markdown.astro"
---

# API’s toevoegen aan het API-register

Het API-register maakt API’s van overheidsorganisaties vindbaar, bruikbaar en duurzaam toegankelijk. Het toevoegen van API’s verloopt uitsluitend via de **API van het register**. Hiervoor zijn schrijfrechten nodig.

## Credentials aanvragen

Stuur een mail naar [developer.overheid@geonovum.nl](mailto:developer.overheid@geonovum.nl) om schrijfrechten te krijgen. Na goedkeuring ontvang je de benodigde credentials.

## Aansluitvoorwaarden

- Je organisatie moet in het **register van overheidsorganisaties** staan.  
- Ben je een (semi-)overheidsorganisatie en sta je er niet in? Neem contact op voor een uitzondering.

## Wat je moet aanleveren

### OpenAPI-specificatie

- Het register werkt volledig *OpenAPI-first*.  
- Alleen API’s met een **OpenAPI-specificatie** in JSON of YAML kunnen worden opgenomen.
- Als de specificatie niet publiek toegankelijk is, kan de body meegestuurd worden in het `POST`-request voor het aanmaken van de API.

### Contactinformatie

- Volgens de [API Design Rules (ADR)](https://developer.overheid.nl/kennisbank/apis/api-design-rules/) moet contactinformatie in de spec aanwezig zijn.  
- Ontbreekt dit? Voeg dan **naam, e-mailadres en website** toe in het `POST`-request.  
- Zorg dat dit nuttige contactinformatie is voor gebruikers van de API.  
  - **Niet geschikt:** algemene helpdesk of algemene overheidswebsite.  
  - **Wel geschikt:** publiek issue-tracking systeem (bijv. GitHub issues) of het beheerteam van de API.

### Versionering & lifecycle

- `x-deprecated`: markeer een API als verouderd.  
- `x-sunset`: geef aan vanaf welke datum de API uitgefaseerd wordt (`YYYY-mm-dd`).

> **Tip:** Het correct gebruik van deze extensies helpt gebruikers om verouderde API’s tijdig te migreren.

## Wijzigingen

Indien de OpenAPI-specificatie publiek beschikbaar is, zullen wij dagelijks checken of er een wijziging in de API is doorgevoerd. Indien de OpenAPI-specificatie niet publiek beschikbaar is, dienen wijzigingen met een `PUT`-call doorgegeven te worden.

## Aan de slag

1. Vraag schrijfrechten aan via [developer.overheid@geonovum.nl](mailto:developer.overheid@geonovum.nl).  
2. Ontvang je credentials.  
3. Raadpleeg de [API-specificatie](#) voor alle velden en endpoints.  
4. Doe een `POST` naar de API van het register om jouw API toe te voegen.

> **Tip:** Controleer altijd of je OpenAPI-spec up-to-date is en alle verplichte contactinformatie bevat voordat je een API aanmaakt of wijzigt.
