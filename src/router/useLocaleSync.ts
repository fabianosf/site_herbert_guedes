import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { parsePath, SECTION_TO_ID } from './routes';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const waitForElement = (id: string, timeout = 4000): Promise<HTMLElement | null> =>
  new Promise((resolve) => {
    const existing = document.getElementById(id);
    if (existing) return resolve(existing);
    const observer = new MutationObserver(() => {
      const found = document.getElementById(id);
      if (found) {
        observer.disconnect();
        resolve(found);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
      resolve(document.getElementById(id));
    }, timeout);
  });

/**
 * Syncs the URL <-> i18n language and scrolls to the section corresponding
 * to the active path. Mounted once at the App root.
 */
export const useLocaleSync = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const firstRun = useRef(true);

  useEffect(() => {
    let cancelled = false;
    const { lang, section } = parsePath(location.pathname);

    const current = (i18n.resolvedLanguage ?? i18n.language ?? '').split('-')[0];
    if (current !== lang) {
      void i18n.changeLanguage(lang);
    }

    const id = SECTION_TO_ID[section];
    const behavior: ScrollBehavior =
      firstRun.current || prefersReducedMotion() ? 'auto' : 'smooth';

    void waitForElement(id).then((el) => {
      if (cancelled || !el) return;
      el.scrollIntoView({ behavior, block: 'start' });
      firstRun.current = false;
    });

    return () => {
      cancelled = true;
    };
  }, [location.pathname, i18n]);
};
