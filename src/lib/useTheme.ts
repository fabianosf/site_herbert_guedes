import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'guedeslab.theme';

const readStored = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
};

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/** Reads the current theme directly from the <html> class (set by pre-React script). */
const readCurrent = (): Theme => {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

/**
 * Reactive theme hook.
 * - On mount, reads the theme that the pre-React script already applied (so the
 *   first paint and the React state agree).
 * - Persists user choice to localStorage.
 * - Falls back to the OS preference when no choice has been made.
 */
export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => readStored() ?? readCurrent() ?? getSystemTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Follow OS changes only while the user has not explicitly chosen.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (readStored() != null) return;
      setThemeState(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore quota / blocked storage */
    }
    setThemeState(t);
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return { theme, setTheme, toggle };
};
