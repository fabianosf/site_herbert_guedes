import { useTranslation } from 'react-i18next';
import { motion, LayoutGroup } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_LABELS,
  type SupportedLanguage,
} from '../../i18n';
import { parsePath, pathFor } from '../../router/routes';
import { cn } from '../../lib/cn';

type Props = {
  className?: string;
  size?: 'sm' | 'md';
};

export const LanguageSwitcher = ({ className, size = 'sm' }: Props) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const fromI18n = ((i18n.resolvedLanguage ?? i18n.language ?? 'pt').split('-')[0] ===
  'en'
    ? 'en'
    : 'pt') as SupportedLanguage;
  const fromUrl = parsePath(location.pathname).lang;
  const current: SupportedLanguage = fromUrl ?? fromI18n;

  const change = (lng: SupportedLanguage) => {
    if (lng === current) return;
    const { section } = parsePath(location.pathname);
    navigate(pathFor(section, lng));
  };

  const px = size === 'sm' ? 'px-3 py-1' : 'px-4 py-1.5';

  return (
    <LayoutGroup id="lang-switcher">
      <div
        role="radiogroup"
        aria-label={t('common.lang_label') ?? 'Language'}
        className={cn(
          'relative inline-flex items-center gap-1 rounded-full border border-chrome/10 bg-chrome/[0.04] p-1 backdrop-blur-md',
          className,
        )}
      >
        {SUPPORTED_LANGUAGES.map((lng) => {
          const active = lng === current;
          return (
            <button
              key={lng}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={LANGUAGE_LABELS[lng]}
              onClick={() => change(lng)}
              className={cn(
                'relative z-10 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] transition-colors',
                px,
                active ? 'text-ink-950' : 'text-bone-300 hover:text-bone-50',
              )}
            >
              {active && (
                <motion.span
                  layoutId="lang-pill"
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-nebula-violet to-nebula-cyan shadow-[0_0_24px_-6px_rgba(124,92,255,0.7)]"
                  aria-hidden="true"
                />
              )}
              {LANGUAGE_LABELS[lng]}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
};
