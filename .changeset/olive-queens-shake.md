---
"@developer-overheid-nl/don-register-layouts": minor
"@developer-overheid-nl/schema-register": minor
---

Een site-brede melding onder het hoofdmenu, en het Schema-register gebruikt hem voor zijn beta-status.

De `Base`-layout rendert `appConfig.notice` als die er is: een `Alert` met markdown-inhoud, in een eigen rij tussen de navigatie en de pagina-inhoud. Registers zonder `notice` veranderen niet.

Het Schema-register meldt daarmee op elke pagina dat verwijzen met `$ref` kan tijdens het ontwerpen, maar dat een schema voor productiegebruik eerst gekopieerd moet worden, omdat er nog geen Schema Design Rules zijn en URL's, versionering en bestandsnamen dus nog kunnen wijzigen. De melding verwijst naar de werkgroep bij het Kennisplatform API's en naar don-static voor het toevoegen van een schema.

De pagina "Schema's toevoegen" is vervallen, met de link ernaartoe in de footer. Die pagina beschreef toevoegen via de API of per mail, en dat kan voor dit register niet; toevoegen gaat met een pull request op don-static, en de melding bovenaan verwijst daarheen.

De introtekst op het schemaoverzicht is vervallen, inclusief de knop "Toevoegen aan het Schema-register". De bètamelding stond daar dubbel met de nieuwe melding bovenaan.
