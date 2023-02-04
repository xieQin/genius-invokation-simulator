import { useTranslation } from "react-i18next";

import styles from "./index.module.css";

export const LangList = [
  {
    lng: "en",
    label: "English",
  },
  {
    lng: "zh-CN",
    label: "中文（简体）",
  },
  {
    lng: "zh-TW",
    label: "中文（繁體）",
  },
  {
    lng: "ja",
    label: "日本語",
  },
  {
    lng: "ko",
    label: "한국어",
  },
  {
    lng: "id",
    label: "Indonesia",
  },
  {
    lng: "th",
    label: "ภาษาไทย",
  },
  {
    lng: "vi",
    label: "Tiếng Việt",
  },
  {
    lng: "de",
    label: "Deutsch",
  },
  {
    lng: "fr",
    label: "Français",
  },
  {
    lng: "pt",
    label: "Português",
  },
  {
    lng: "es",
    label: "Español",
  },
  {
    lng: "ru",
    label: "Русский",
  },
];

export const LangToLabel = (lng: string) => {
  console.log(lng);
  const _l = LangList.filter(l => l.lng === lng);
  return _l.length > 0 ? _l[0].label : "English";
};

export default function Language() {
  const { i18n } = useTranslation();
  const changeLanguageHandler = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className={styles.Language}>
      <div className={styles.LanguageList}>
        {LangList.map(lng => (
          <div
            key={lng.lng}
            aria-hidden="true"
            className={styles.LanguageListItem}
            onClick={() => {
              changeLanguageHandler(lng.lng);
            }}
          >
            {lng.label}
          </div>
        ))}
      </div>
      <div className={styles.CurrentLanguage}>{LangToLabel(i18n.language)}</div>
    </div>
  );
}
