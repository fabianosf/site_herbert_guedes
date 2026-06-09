import type { SupportedLanguage } from '../i18n';

export type SectionKey =
  | 'home'
  | 'members'
  | 'research'
  | 'teaching'
  | 'publications'
  | 'media'
  | 'awards'
  | 'contact';

export const SECTIONS: readonly SectionKey[] = [
  'home',
  'members',
  'research',
  'teaching',
  'publications',
  'media',
  'awards',
  'contact',
] as const;

/** Section key -> in-document element id. */
export const SECTION_TO_ID: Record<SectionKey, string> = {
  home: 'top',
  members: 'members',
  research: 'research',
  teaching: 'teaching',
  publications: 'publications',
  media: 'media',
  awards: 'awards',
  contact: 'contact',
};

/** Localized URL slugs per language. Empty slug = root for that language. */
export const LOCALE_SLUGS: Record<SupportedLanguage, Record<SectionKey, string>> = {
  pt: {
    home: '',
    members: 'membros',
    research: 'pesquisa',
    teaching: 'ensino',
    publications: 'publicacoes',
    media: 'midia',
    awards: 'premios',
    contact: 'contato',
  },
  en: {
    home: '',
    members: 'members',
    research: 'research',
    teaching: 'teaching',
    publications: 'publications',
    media: 'media',
    awards: 'awards',
    contact: 'contact',
  },
};

/** Build the URL path for a (section, language). PT = root; EN = /en prefix. */
export const pathFor = (section: SectionKey, lang: SupportedLanguage): string => {
  const slug = LOCALE_SLUGS[lang][section];
  if (lang === 'en') return slug ? `/en/${slug}` : '/en';
  return slug ? `/${slug}` : '/';
};

/** Parse a pathname back into (language, section). Falls back to PT / home. */
export const parsePath = (
  pathname: string,
): { lang: SupportedLanguage; section: SectionKey } => {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/en') return { lang: 'en', section: 'home' };
  if (clean.startsWith('/en/')) {
    const slug = clean.slice(4);
    const entry = (Object.entries(LOCALE_SLUGS.en) as [SectionKey, string][]).find(
      ([, v]) => v === slug,
    );
    return { lang: 'en', section: entry?.[0] ?? 'home' };
  }
  if (clean === '/') return { lang: 'pt', section: 'home' };
  const slug = clean.slice(1);
  const entry = (Object.entries(LOCALE_SLUGS.pt) as [SectionKey, string][]).find(
    ([, v]) => v === slug,
  );
  return { lang: 'pt', section: entry?.[0] ?? 'home' };
};

/** All known route paths (used for explicit Routes). */
export const ALL_PATHS: string[] = [
  ...SECTIONS.map((s) => pathFor(s, 'pt')),
  ...SECTIONS.map((s) => pathFor(s, 'en')),
];
