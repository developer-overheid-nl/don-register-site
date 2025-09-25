type i18nTranslations = Record<string, string | Record<string, string>>;

const mainSiteUrl = "https://developer.overheid.nl";

export default {
  title: "API-register",
  mainSite: {
    name: "developer.overheid.nl",
    url: mainSiteUrl,
  },
  items: {
    type: 'apis',
  },
  i18n: {
    nl: {
      components: {
        items_one: 'API',
        items_other: 'API\'s'
      }
    },
  } as Record<string, i18nTranslations>,
  topNavigation: {
    items: [
      { id: 'home', label: "Home", href: mainSiteUrl },
      { id: 'kennisbank', label: "Kennisbank", href: `${mainSiteUrl}/kennisbank` },
      { id: 'apis', label: "API's", href: "/apis" },
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
};
