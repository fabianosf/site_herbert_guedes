import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import pt from './locales/pt.json';

export const SUPPORTED_LANGUAGES = ['pt', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  pt: 'PT',
  en: 'EN',
};

export const LANGUAGE_HTML_TAG: Record<SupportedLanguage, string> = {
  pt: 'pt-BR',
  en: 'en',
};

const resources = {
  en: { translation: en },
  pt: { translation: pt },
};

/** Read language from the current URL (PT default, /en prefix = EN). */
const langFromPath = (): SupportedLanguage | undefined => {
  if (typeof window === 'undefined') return undefined;
  const p = window.location.pathname.replace(/\/+$/, '') || '/';
  if (p === '/en' || p.startsWith('/en/')) return 'en';
  if (p === '/') return 'pt';
  // Any other PT slug at root counts as PT too.
  return 'pt';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: langFromPath(),
    fallbackLng: 'pt',
    supportedLngs: [...SUPPORTED_LANGUAGES],
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    returnNull: false,
    detection: {
      order: ['path', 'localStorage', 'htmlTag', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'guedeslab.lang',
    },
  });

if (typeof document !== 'undefined') {
  const sync = (lng: string) => {
    const code = (lng.split('-')[0] as SupportedLanguage) ?? 'en';
    document.documentElement.lang = LANGUAGE_HTML_TAG[code] ?? lng;
  };
  sync(i18n.language || 'en');
  i18n.on('languageChanged', sync);
}

export default i18n;
