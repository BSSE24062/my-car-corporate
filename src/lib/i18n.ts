import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en/translation.json';
import arTranslation from '../locales/ar/translation.json';
import zhTranslation from '../locales/zh/translation.json';
import jaTranslation from '../locales/ja/translation.json';
import frTranslation from '../locales/fr/translation.json';
import esTranslation from '../locales/es/translation.json';
import deTranslation from '../locales/de/translation.json';
import thTranslation from '../locales/th/translation.json';
import nlTranslation from '../locales/nl/translation.json';

const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
  zh: { translation: zhTranslation },
  ja: { translation: jaTranslation },
  fr: { translation: frTranslation },
  es: { translation: esTranslation },
  de: { translation: deTranslation },
  th: { translation: thTranslation },
  nl: { translation: nlTranslation }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
