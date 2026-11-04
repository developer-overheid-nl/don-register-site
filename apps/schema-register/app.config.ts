type i18nTranslations = Record<string, string | Record<string, string>>;

const mainSiteUrl = "https://developer.overheid.nl";

export default {
  title: "Schema-register",
  meta: {
    description:
      "Welkom bij het Schema-register. Hier vind je JSON Schemas die beschikbaar zijn voor (her)gebruik binnen de overheid.",
    ogImages: {
      "/": {
        url: "/don-schema-register-social-card.png",
        alt: "Schema-register: Hier vind je JSON Schemas die beschikbaar zijn voor (her)gebruik binnen de overheid.",
      },
      "/schemas/[id]": {
        url: "/don-schema-register-detail-social-card.png",
        alt: "Details van dit Schema: JSON Schema",
      },
    },
  },
  /**
   * Site-wide notice, rendered by the Base layout under the main navigation.
   * Only this register has one: it is still being shaped while the Schema
   * Design Rules do not exist yet.
   */
  notice: {
    type: "warning",
    // Bold lead on its own line; everything below it is one paragraph, so the
    // explanation runs straight into the two calls to action.
    body: [
      "**Het Schema-register is in beta: kopieer een schema voordat je het in",
      "productie gebruikt.**",
      "",
      "URL's, bestandsnamen en versionering worden onderdeel van de Schema Design",
      "Rules, welke nog niet zijn vastgesteld door de gelijknamige werkgroep van het",
      "Kennisplatform API's. Een `$ref` naar dit register is daarom nog niet stabiel.",
      "Verwijzen tijdens de ontwerpfase kan prima, maar haal het schema eerst binnen",
      "voordat je het in productie gaat gebruiken.",
      "Meedenken over de Schema Design Rules?",
      "[Bekijk de open issues](https://github.com/Geonovum/KP-APIs/issues?q=is%3Aissue+state%3Aopen+label%3A%22WG%3A+Schema+design+rules%22).",
      "Schema toevoegen?",
      "[Open hier een PR](https://github.com/developer-overheid-nl/don-static/tree/main/assets/schemas).",
    ].join("\n"),
  },
  mainSite: {
    name: "developer.overheid.nl",
    url: mainSiteUrl,
  },
  urlHomepage: [
    "/",
    "/schemas/pagina/[...page]",
  ],
  items: {
    type: "schemas",
  },
  i18n: {
    nl: {
      components: {
        items_one: "JSON Schema",
        items_other: "JSON Schema's",
        "back-to-homepage": "Terug naar het Schema-registeroverzicht",
      },
    },
  } as Record<string, i18nTranslations>,
  topNavigation: {
    items: [
      {
        id: "home",
        label: "Home",
        href: mainSiteUrl,
      },
      {
        id: "kennisbank",
        label: "Kennisbank",
        href: `${mainSiteUrl}/kennisbank`,
      },
      {
        id: "apis",
        label: "API's",
        href: "https://apis.developer.overheid.nl",
      },
      {
        id: "oss",
        label: "Repositories",
        href: "https://oss.developer.overheid.nl",
      },
      {
        id: "schemas",
        label: "Schema's",
        href: "/schemas",
        current: true,
      },
      {
        id: "blog",
        label: "Blog",
        href: `${mainSiteUrl}/blog`,
      },
    ],
    endItems: [
      {
        id: "opendata",
        label: "Open Data",
        href: "https://data.overheid.nl",
        icon: "_external",
        target: "_blank",
      },
      {
        id: "geodata",
        label: "Geodata",
        href: "https://www.pdok.nl",
        icon: "_external",
        target: "_blank",
      },
      {
        id: "github",
        label: "GitHub",
        href: "https://github.com/developer-overheid-nl",
        icon: "_external",
        target: "_blank",
      },
    ],
  },
  footer: {
    columns: [
      {
        title: "Mede mogelijk gemaakt door",
        text: `
![BZK](/sponsors/bzk.svg)  
![VNG](/sponsors/vng.svg)  
![FS](/sponsors/forumstandaardisatie.svg)  
`,
      },
      {
        title: "Registers",
        items: [
          {
            id: "add-apis",
            label: "API's toevoegen",
            href: "https://apis.developer.overheid.nl/apis/toevoegen",
          },
          {
            id: "add-repositories",
            label: "Repositories toevoegen",
            href: "https://oss.developer.overheid.nl/repositories/toevoegen",
          },
          {
            id: "statistics",
            label: "API-statistieken",
            href: "https://apis.developer.overheid.nl/api-statistieken",
          },
          {
            id: "api-archive",
            label: "Sitearchief API-register",
            href: "https://minbzk.sitearchief.nl/?subsite=devoverheidapis",
            icon: "_external",
            target: "_blank",
          },
          {
            id: "oss-archive",
            label: "Sitearchief OSS-register",
            href: "https://minbzk.sitearchief.nl/?subsite=ossdevoverheid",
            icon: "_external",
            target: "_blank",
          },
        ],
      },
      {
        title: "Community",
        items: [
          {
            id: "slack",
            label: "Slack",
            href: "https://codefornl.slack.com/archives/CFV4B3XE2",
            icon: "_external",
            target: "_blank",
          },
          {
            id: "github",
            label: "Github",
            href: "https://github.com/developer-overheid-nl",
            icon: "_external",
            target: "_blank",
          },
          {
            id: "mastodon",
            label: "Mastodon",
            href: "https://social.overheid.nl/@developer",
            icon: "_external",
            target: "_blank",
          },
          {
            id: "linkedin",
            label: "LinkedIn",
            href: "https://nl.linkedin.com/company/developer-overheid-nl",
            icon: "_external",
            target: "_blank",
          },
        ],
      },
      {
        title: "Overig",
        items: [
          {
            id: "bijdragen",
            label: "Bijdragen",
            href: "https://developer.overheid.nl/contributing",
          },
          {
            id: "implos",
            label: "Implementatie ondersteuning",
            href: "https://developer.overheid.nl/implementatie-ondersteuning",
          },
          {
            id: "evenementen",
            label: "Evenementen",
            href: "https://developer.overheid.nl/evenementen",
          },
          {
            id: "contact",
            label: "Contact",
            href: "https://developer.overheid.nl/contact",
          },
          {
            id: "team",
            label: "Het team",
            href: "https://developer.overheid.nl/team",
          },
          {
            id: "privacy",
            label: "Privacyverklaring",
            href: "https://developer.overheid.nl/privacy",
          },
          {
            id: "toegankelijkheid",
            label: "Toegankelijkheid",
            href: "https://developer.overheid.nl/toegankelijkheid",
          },
          {
            id: "archive",
            label: "Sitearchief",
            href: "https://minbzk.sitearchief.nl/?subsite=developeroverheid",
            icon: "_external",
            target: "_blank",
          },
        ],
      },
    ],
  },
};
