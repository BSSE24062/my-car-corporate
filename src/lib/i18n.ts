import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en/translation.json';

const resources = {
  en: { translation: enTranslation },
  // Placeholders for other languages. In a real app, load these asynchronously or import them.
  ar: { translation: { ...enTranslation, hero: { title: "سيارات شركتي", subtitle: "خدمة سائق متميزة في سيدني" } } },
  zh: { translation: { ...enTranslation, hero: { title: "我的公司汽车", subtitle: "悉尼的优质司机服务" } } },
  ja: { translation: { ...enTranslation, hero: { title: "マイコーポレートカーズ", subtitle: "シドニーのプレミアム運転手サービス" } } },
  fr: { translation: { ...enTranslation, hero: { title: "Mes Voitures d'Entreprise", subtitle: "Service de Chauffeur Premium à Sydney" } } },
  es: { translation: { ...enTranslation, hero: { title: "Mis Coches Corporativos", subtitle: "Servicio de Chofer Premium en Sídney" } } },
  de: { translation: { ...enTranslation, hero: { title: "Meine Firmenwagen", subtitle: "Premium-Chauffeurservice in Sydney" } } },
  th: { translation: { ...enTranslation, hero: { title: "รถยนต์สำหรับองค์กรของฉัน", subtitle: "บริการพนักงานขับรถระดับพรีเมียมในซิดนีย์" } } },
  nl: { translation: { ...enTranslation, hero: { title: "Mijn Bedrijfsauto's", subtitle: "Premium Chauffeursdienst in Sydney" } } }
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
