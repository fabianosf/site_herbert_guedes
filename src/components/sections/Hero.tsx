import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { affiliationLogos } from '../../config/theme';
import { Container } from '../ui/Container';
import { LinkButton } from '../ui/LinkButton';
import { fadeUp, stagger } from '../../lib/motion';

const AFFILIATION_IDS = ['ufrj', 'fiocruz', 'ioc', 'microbiologia'];
const LAB_IDS = ['libtec', 'lic'];

export const Hero = () => {
  const { t } = useTranslation();

  const affiliations = affiliationLogos.filter((l) => AFFILIATION_IDS.includes(l.id));
  const labs = affiliationLogos.filter((l) => LAB_IDS.includes(l.id));

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
            <div className="flex items-center gap-4">
              {labs.map((lab) => (
                <div
                  key={lab.id}
                  className="relative grid h-20 w-20 place-items-center rounded-2xl bg-chrome/[0.05] ring-1 ring-chrome/10 md:h-24 md:w-24 overflow-hidden"
                >
                  <img
                    src={lab.src}
                    alt={lab.name}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              ))}
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
            className="mt-12 inline-flex items-center gap-3 rounded-full border border-chrome/10 bg-chrome/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-bone-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-nebula-cyan animate-pulse" aria-hidden="true" />
            {t('hero.eyebrow')}
          </motion.div>

          <motion.div variants={fadeUp} className="mx-auto mt-8 max-w-2xl space-y-5 text-bone-300">
            <p className="text-pretty text-base md:text-lg leading-relaxed">{t('hero.body_1')}</p>
            <p className="text-pretty text-base md:text-lg leading-relaxed">{t('hero.body_2')}</p>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap justify-center gap-3"
            aria-label={t('hero.affiliations_label') ?? ''}
          >
            {affiliations.map((a) => (
              <li key={a.id}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-chrome/10 bg-chrome/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-bone-200 transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <img
                    src={a.src}
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4 rounded-sm object-contain"
                  />
                  {a.name}
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
