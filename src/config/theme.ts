/**
 * Structural / non-translatable site configuration.
 * All textual copy lives in /src/i18n/locales/*.json.
 *
 * Edit Tailwind tokens in /tailwind.config.ts.
 */

export type NavKey =
  | 'home'
  | 'members'
  | 'research'
  | 'teaching'
  | 'media'
  | 'awards';

export type SiteConfig = {
  members: Array<{ initials: string; color: string }>;
  socials: Array<{ label: string; href: string }>;
  nav: Array<{ key: NavKey }>;
  affiliations: Array<{ label: string; href: string }>;
  email: string;
  contactEndpoint?: string;
};

export const siteConfig: SiteConfig = {
  members: [
    { initials: 'HG', color: 'from-nebula-violet/30 to-nebula-indigo/30' },
    { initials: 'PS', color: 'from-nebula-cyan/25 to-nebula-violet/25' },
    { initials: 'PD', color: 'from-nebula-pink/25 to-nebula-violet/25' },
    { initials: 'DO', color: 'from-nebula-violet/25 to-nebula-cyan/25' },
    { initials: 'ME', color: 'from-nebula-indigo/25 to-nebula-pink/25' },
    { initials: 'IC', color: 'from-nebula-cyan/25 to-nebula-pink/25' },
  ],
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'ORCID', href: 'https://orcid.org/' },
    { label: 'Lattes', href: 'http://lattes.cnpq.br/' },
    { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/' },
  ],
  nav: [
    { key: 'home' },
    { key: 'members' },
    { key: 'research' },
    { key: 'teaching' },
    { key: 'media' },
    { key: 'awards' },
  ],
  affiliations: [
    { label: 'INCA', href: 'https://www.gov.br/inca/' },
    { label: 'FIOCRUZ', href: 'https://portal.fiocruz.br/' },
    { label: 'FioCâncer', href: 'https://portal.fiocruz.br/' },
  ],
  email: import.meta.env.VITE_CONTACT_EMAIL ?? 'contato@guedeslab.net',
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT,
};

export const motionDefaults = {
  durationFast: 0.4,
  durationBase: 0.7,
  durationSlow: 1.2,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  staggerChildren: 0.08,
};
