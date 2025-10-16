type i18nTranslations = Record<string, string | Record<string, string>>;

const mainSiteUrl = "https://developer.overheid.nl";

export default {
  title: "API-register",
  mainSite: {
    name: "developer.overheid.nl",
    url: mainSiteUrl,
  },
  urlHomepage: ['/', '/apis/pagina/[...page]'],
  items: {
    type: 'apis',
  },
  i18n: {
    nl: {
      components: {
        items_one: 'API',
        items_other: 'API’s',
        'back-to-homepage': 'Terug naar het API-registeroverzicht',
      },
    },
  } as Record<string, i18nTranslations>,
  topNavigation: {
    items: [
      { id: 'home', label: "Home", href: mainSiteUrl },
      { id: 'kennisbank', label: "Kennisbank", href: `${mainSiteUrl}/kennisbank` },
      { id: 'apis', label: "API's", href: "/apis", current: true },
      { id: 'communities', label: "Communities", href: `${mainSiteUrl}/communities` },
      { id: 'blog', label: "Blog", href: `${mainSiteUrl}/blog` },
    ],
    endItems: [
      { id: 'oss', label: "Open Source", href: "https://oss.developer.overheid.nl", icon: "_external", target: "_blank" },
      { id: 'opendata', label: "Open Data", href: "https://data.overheid.nl", icon: "_external", target: "_blank" },
      { id: 'geodata', label: "Geodata", href: "https://www.pdok.nl", icon: "_external", target: "_blank" },
      { id: 'github', label: "GitHub", href: "https://github.com/developer-overheid-nl/don-register-site", icon: "_external", target: "_blank" },
    ],
  },
  footer: {
    columns: [
      {
        title: "Mede mogelijk gemaakt door",
        text: 
`
![BZK](/sponsors/bzk.svg)  
![VNG](/sponsors/vng.svg)  
![FS](/sponsors/forumstandaardisatie.svg)  
`,
      },
      {
        title: "API-register",
        items: [
          { id: 'add', label: "API toevoegen", href: "/apis/toevoegen" },
          { id: 'statistics', label: "Statistieken", href: "/statistieken" },
          { id: 'api-archive', label: "Sitearchief", href: "https://minbzk.sitearchief.nl/?subsite=devoverheidapis", icon: "_external", target: "_blank" },
        ],
      },
      {
        title: "Community",
        items: [
          { id: 'slack', label: "Slack", href: "https://codefornl.slack.com/archives/CFV4B3XE2", icon: "_external", target: "_blank" },
          { id: 'github', label: "Github", href: "https://github.com/developer-overheid-nl", icon: "_external", target: "_blank" },
          { id: 'mastodon', label: "Mastodon", href: "https://social.overheid.nl/@developer", icon: "_external", target: "_blank" },
          { id: 'linkedin', label: "LinkedIn", href: "https://nl.linkedin.com/company/developer-overheid-nl", icon: "_external", target: "_blank" },
        ]
      },
      {
        title: "Overig",
        items: [
          { id: 'bijdragen', label: "Bijdragen", href: "https://developer.overheid.nl/contributing" },
          { id: 'implos', label: "Implementatie ondersteuning", href: "https://developer.overheid.nl/implementatie-ondersteuning" },
          { id: 'contact', label: "Contact", href: "https://developer.overheid.nl/contact" },
          { id: 'team', label: "Het team", href: "https://developer.overheid.nl/team" },
          { id: 'privacy', label: "Privacyverklaring", href: "https://developer.overheid.nl/privacy" },
          { id: 'toegankelijkheid', label: "Toegankelijkheid", href: "https://developer.overheid.nl/toegankelijkheid" },
          { id: 'archive', label: "Sitearchief", href: "https://minbzk.sitearchief.nl/?subsite=developeroverheid", icon: "_external", target: "_blank" },
        ]
      }
    ]
  },
};
