export default {
  title: "API-register",
  mainSite: {
    name: "developer.overheid.nl",
    url: "https://developer.overheid.nl",
  },
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
