type i18nTranslations = Record<string, string | Record<string, string>>;

const mainSiteUrl = "https://developer.overheid.nl";

export default {
  title: "AI-skills-register",
  meta: {
    description:
      "Welkom bij het AI-skills-register. Hier vind je AI-skills die beschikbaar zijn voor (her)gebruik binnen de overheid.",
    ogImages: {
      // TODO: replace with a social card for the AI-skills-register
      "/": {
        url: "/favicon.svg",
        alt: "AI-skills-register: Hier vind je AI-skills die beschikbaar zijn voor (her)gebruik binnen de overheid.",
      },
    },
  },
  mainSite: {
    name: "developer.overheid.nl",
    url: mainSiteUrl,
  },
  urlHomepage: [
    "/",
    "/skills/pagina/[...page]",
  ],
  items: {
    type: "skills",
  },
  i18n: {
    nl: {
      components: {
        items_one: "AI-skill",
        items_other: "AI-skills",
        "back-to-homepage": "Terug naar het AI-skills-registeroverzicht",
        plugin: "Plugin",
        marketplace: "Marketplace",
        "source-type_marketplace": "marketplace",
        "source-type_plugin": "plugin",
        "source-type_skill": "skill",
      },
      pages: {
        "skill-not-found": "AI-skill niet gevonden",
        organisation: "Organisatie",
        "skill-content": "Inhoud van SKILL.md",
        "skill-file": "SKILL.md",
        source: "Bron",
        commit: "Commit",
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
        href: "https://schemas.developer.overheid.nl",
      },
      {
        id: "skills",
        label: "Skills",
        href: "/skills",
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
