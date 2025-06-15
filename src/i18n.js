import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '@/locales/en/translation.json';
import trTranslation from '@/locales/tr/translation.json';
import esTranslation from '@/locales/es/translation.json';
import frTranslation from '@/locales/fr/translation.json';
import deTranslation from '@/locales/de/translation.json';
import enCommon from '@/locales/en/common.json';
import trCommon from '@/locales/tr/common.json';
import esCommon from '@/locales/es/common.json';
import frCommon from '@/locales/fr/common.json';
import deCommon from '@/locales/de/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: ['translation', 'common'],
    defaultNS: 'translation',
    resources: {
      en: {
        translation: enTranslation,
        common: enCommon,
      },
      tr: {
        translation: trTranslation,
        common: trCommon,
      },
      es: {
        translation: esTranslation,
        common: esCommon,
      },
      fr: {
        translation: frTranslation,
        common: frCommon,
      },
      de: {
        translation: deTranslation,
        common: deCommon,
      },
    }
  });

export default i18n;