type i18nTranslations = Record<string, string | Record<string, string>>;

export default {
  title: "API-register",
  mainSite: {
    name: "developer.overheid.nl",
    url: "https://developer.overheid.nl",
  },
  items: {
    type: 'apis',
  },
  i18n: {
    nl: {
      components: {
        items_one: 'API',
        items_other: 'API’s'
      }
    },
  } as Record<string, i18nTranslations>,
  topNavigation: {
    items: [
      { id: 'home', label: "Overzicht", href: "/" },
      { id: 'about', label: "Over deze site", href: "/about" },
      { id: 'contact', label: "Contact", href: "/contact" },
    ],
    endItems: [
      { id: 'add', label: "API toevoegen", href: "/add", icon: "_add" },
      { id: 'oss', label: "Open Source", href: "https://oss.developer.overheid.nl", icon: "_external", target: "_blank" },
    ],
  },
};
