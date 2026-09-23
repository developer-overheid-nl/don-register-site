import resources from "@developer-overheid-nl/don-register-locales/nl" with {
  type: "json",
};
import { createInstance, type i18n } from "i18next";

const i18nInstance: i18n = createInstance({
  lng: "nl",
  fallbackLng: "nl",
  // debug: true,

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },

  resources: {
    nl: {
      translation: resources,
    },
  },
});

i18nInstance.init();

export default i18nInstance;
