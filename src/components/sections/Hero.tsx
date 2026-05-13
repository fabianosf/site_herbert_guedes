import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '../../config/theme';
import { Container } from '../ui/Container';
import { LinkButton } from '../ui/LinkButton';
import { fadeUp, stagger } from '../../lib/motion';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-nebula" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,92,255,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-nebula-violet/15 blur-[140px] animate-pulse-soft"
      />
      <div aria-hidden="true" className="absolute inset-0 grain" />

      <Container size="full" className="relative pt-32 pb-24 md:pt-40">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 -m-6 rounded-full bg-nebula-violet/20 blur-2xl"
              />
              <div className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-nebula-violet via-nebula-indigo to-ink-900 ring-1 ring-white/10 md:h-28 md:w-28">
                <svg viewBox="0 0 64 64" className="h-12 w-12 text-white/90" aria-hidden="true">
                  <circle cx="32" cy="32" r="14" fill="currentColor" opacity="0.95" />
                  <circle cx="46" cy="20" r="1.4" fill="currentColor" opacity="0.9" />
                  <circle cx="18" cy="22" r="1" fill="currentColor" opacity="0.75" />
                  <circle cx="48" cy="44" r="0.9" fill="currentColor" opacity="0.7" />
                </svg>
              </div>
            </div>
            <h1 className="mt-8 text-display-lg font-semibold tracking-tightest text-bone-50">
              <span className="font-light">{t('site.brand.prefix')}</span>
              <span className="font-black text-gradient">{t('site.brand.suffix')}</span>
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.35em] text-bone-300">
              {t('site.location')}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-bone-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-nebula-cyan animate-pulse" aria-hidden="true" />
            {t('hero.eyebrow')}
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-8 font-display text-display-md font-light italic text-bone-50"
          >
            {t('hero.title')}
          </motion.h2>

          <motion.div variants={fadeUp} className="mx-auto mt-8 max-w-2xl space-y-5 text-bone-300">
            <p className="text-pretty text-base md:text-lg leading-relaxed">{t('hero.body_1')}</p>
            <p className="text-pretty text-base md:text-lg leading-relaxed">{t('hero.body_2')}</p>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap justify-center gap-2"
            aria-label={t('hero.affiliations_label') ?? ''}
          >
            {siteConfig.affiliations.map((a) => (
              <li key={a.label}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-bone-200 transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {a.label}
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap justify-center gap-4">
            <LinkButton section="members" size="lg">
              {t('hero.cta_primary')}
            </LinkButton>
            <LinkButton section="research" variant="secondary" size="lg">
              {t('hero.cta_secondary')}
            </LinkButton>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
