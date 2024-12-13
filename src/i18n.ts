import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const detectedLanguage = localStorage.getItem('i18nextLng') || navigator.language || 'en';

const normalizedLanguage = detectedLanguage.includes('-')
  ? detectedLanguage.split('-')[0]
  : detectedLanguage;

if (!localStorage.getItem('i18nextLng')) {
  localStorage.setItem('i18nextLng', normalizedLanguage);
}

export const LANGUAGES = {
  EN: 'en',
  AR: 'ar',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

const loadPath = () => '/locales/{{lng}}/{{ns}}.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: ['en'],
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    ns: ['translation'],
    defaultNS: 'translation',
    supportedLngs: Object.values(LANGUAGES),
  });

export default i18n;
