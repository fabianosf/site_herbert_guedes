import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../../config/theme';
import { Container } from '../ui/Container';
import { LinkButton } from '../ui/LinkButton';
import { LocalizedLink } from '../../router/LocalizedLink';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { cn } from '../../lib/cn';

export const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24));

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-smooth',
        scrolled
          ? 'glass border-b border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container size="full">
        <nav
          aria-label={t('common.primary') ?? 'Primary'}
          className="flex h-16 items-center justify-between md:h-20"
        >
          <LocalizedLink
            section="home"
            aria-label={t('common.home_aria') ?? 'Home'}
            className="group flex items-center gap-3 text-bone-50"
          >
            <span
              aria-hidden="true"
              className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-nebula-violet via-nebula-indigo to-ink-900 ring-1 ring-white/10"
            >
              <span className="h-3.5 w-3.5 rounded-full bg-white/85" />
            </span>
            <span className="text-base font-semibold tracking-tight">
              <span className="font-light">{t('site.brand.prefix')}</span>
              <span className="font-black">{t('site.brand.suffix')}</span>
            </span>
          </LocalizedLink>

          <ul className="hidden items-center gap-6 lg:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.key}>
                <LocalizedLink
                  section={item.key}
                  className="link-underline text-sm text-bone-300 transition-colors hover:text-bone-50"
                >
                  {t(`nav.${item.key}`)}
                </LocalizedLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <LinkButton section="contact" size="sm">
              {t('nav.contact_cta')}
            </LinkButton>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md text-bone-100 md:hidden"
            aria-label={
              open ? (t('common.menu_close') ?? 'Close') : (t('common.menu_open') ?? 'Open')
            }
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden glass border-t border-white/10"
          >
            <Container size="full">
              <ul className="flex flex-col gap-1 py-6">
                {siteConfig.nav.map((item) => (
                  <li key={item.key}>
                    <LocalizedLink
                      section={item.key}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-lg text-bone-100 hover:bg-white/[0.04]"
                    >
                      {t(`nav.${item.key}`)}
                    </LocalizedLink>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-3 pt-4">
                  <LanguageSwitcher />
                  <LinkButton section="contact" onClick={() => setOpen(false)}>
                    {t('nav.contact_cta')}
                  </LinkButton>
                </li>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
