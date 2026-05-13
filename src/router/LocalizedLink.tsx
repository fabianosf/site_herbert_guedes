import { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pathFor, type SectionKey } from './routes';
import type { SupportedLanguage } from '../i18n';

type Props = Omit<LinkProps, 'to'> & {
  section: SectionKey;
};

/** Renders a react-router Link to the section in the active language. */
export const LocalizedLink = forwardRef<HTMLAnchorElement, Props>(
  ({ section, ...rest }, ref) => {
    const { i18n } = useTranslation();
    const lang = ((i18n.resolvedLanguage ?? i18n.language ?? 'pt').split('-')[0] ===
    'en'
      ? 'en'
      : 'pt') as SupportedLanguage;
    return <Link ref={ref} to={pathFor(section, lang)} {...rest} />;
  },
);
LocalizedLink.displayName = 'LocalizedLink';
