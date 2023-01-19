// eslint-disable-next-line import/no-named-as-default
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import i18nResources from "@/data/i18n.json";

// https://www.i18next.com/how-to/faq#how-should-the-language-codes-be-formatted
export const resources = {
  en: {
    translation: i18nResources["en-us"],
  },
  "zh-CN": {
    translation: i18nResources["zh-cn"],
  },
  "zh-TW": {
    translation: i18nResources["zh-tw"],
  },
  ja: {
    translation: i18nResources["ja-jp"],
  },
  ko: {
    translation: i18nResources["ko-kr"],
  },
  id: {
    translation: i18nResources["id-id"],
  },
  th: {
    translation: i18nResources["th-th"],
  },
  vi: {
    translation: i18nResources["vi-vn"],
  },
  de: {
    translation: i18nResources["de-de"],
  },
  fr: {
    translation: i18nResources["fr-fr"],
  },
  pt: {
    translation: i18nResources["pt-pt"],
  },
  es: {
    translation: i18nResources["es-es"],
  },
  ru: {
    translation: i18nResources["ru-ru"],
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: navigator.language,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
