import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJson from './en.json';
import jaJson from './ja.json';

i18n.use(initReactI18next).init({
  debug: false,
  resources: {
    en: { translation: enJson },
    ja: { translation: jaJson },
  },
  fallbackLng: false,
  returnEmptyString: false,
  lng: window.navigator.language,
});

export default i18n;
