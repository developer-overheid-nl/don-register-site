type i18nTranslations = {
  [key: string]: string | i18nTranslations;
};

const mainSiteUrl = "https://developer.overheid.nl";

export default {
  title: "Open Source Register",
  meta: {
    description:
      "Welkom bij het Open Source Register. Hier vind je informatie over de open source repositories die beschikbaar zijn voor gebruik binnen de overheid.",
    ogImages: {
      "/": {
        url: "/don-oss-register-social-card.png",
        alt: "Open Source Register: Hier vind je informatie over de open source repositories die beschikbaar zijn voor gebruik binnen de overheid.",
      },
      "/repositories/[id]": {
        url: "/don-oss-register-detail-social-card.png",
        alt: "Details van deze Open Source Repository: Beschrijving van de repository. Publiccode.yml.",
      },
    },
  },
  mainSite: {
    name: "developer.overheid.nl",
    url: mainSiteUrl,
  },
  urlHomepage: [
    "/",
    "/repositories/pagina/[...page]",
  ],
  items: {
    type: "repositories",
  },
  i18n: {
    nl: {
      components: {
        items_one: "repository",
        items_other: "repositories",
        "back-to-homepage": "Terug naar het OSS-registeroverzicht",
      },
      scans: {
        MISSING_README_FILE: "README-bestand is niet aanwezig",
        MISSING_README_FILE_passed: "README-bestand is aanwezig",
        MISSING_LICENSE_FILE: "LICENSE-bestand is niet aanwezig",
        MISSING_LICENSE_FILE_passed: "LICENSE-bestand is aanwezig",
        MISSING_PUBLICCODE_FILE: "Publiccode.yml-bestand is niet aanwezig",
        MISSING_PUBLICCODE_FILE_passed: "Publiccode.yml-bestand is aanwezig",
        MISSING_CONTRIBUTING_FILE: "CONTRIBUTING-bestand is niet aanwezig",
        MISSING_CONTRIBUTING_FILE_passed: "CONTRIBUTING-bestand is aanwezig",
        MISSING_SECURITY_FILE: "SECURITY.md-bestand is niet aanwezig",
        MISSING_SECURITY_FILE_passed: "SECURITY.md-bestand is aanwezig",
        MISSING_CODE_OF_CONDUCT_FILE:
          "CODE_OF_CONDUCT.md-bestand is niet aanwezig",
        MISSING_CODE_OF_CONDUCT_FILE_passed:
          "CODE_OF_CONDUCT.md-bestand is aanwezig",
        MISSING_CHANGELOG_FILE: "CHANGELOG-bestand is niet aanwezig",
        MISSING_CHANGELOG_FILE_passed: "CHANGELOG-bestand is aanwezig",
        severity: {
          ERROR: "Fout",
          WARNING: "Waarschuwing",
          HINT: "Hint",
        },
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
        href: "/repositories",
        current: true,
      },
      {
        id: "schemas",
        label: "Schema's",
        href: "https://schemas.developer.overheid.nl",
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
