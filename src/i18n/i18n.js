import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-http-backend';

import deJSON from './translations/de';
import enJSON from './translations/en';
import esJSON from './translations/es';
import frJSON from './translations/fr';
import aeJSON from './translations/ae';
import zhJSON from './translations/zh';
import ptJSON from './translations/pt';

const resources = {
  de: { translation: deJSON },
  en: { translation: enJSON },
  es: { translation: esJSON },
  fr: { translation: frJSON },
  ae: { translation: aeJSON },
  cn: { translation: zhJSON },
  pt: { translation: ptJSON },
};

i18n
  .use(XHR)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ['querystring', 'navigator'],
      lookupQuerystring: 'lng',
    },
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18n;
