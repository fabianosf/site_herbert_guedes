import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';

type Item = { index: string; title: string; description: string; tags: string[] };

export const Research = () => {
  const { t } = useTranslation();
  const items = t('research.items', { returnObjects: true }) as Item[];

  return (
    <section id="research" className="section relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nebula-violet/40 to-transparent"
      />
      <Container size="full">
        <SectionHeader
          index={t('research.section.index')}
          eyebrow={t('research.section.eyebrow')}
          title={
            <>
              {t('research.section.title_a')}
              <br className="hidden md:block" />
              <span className="italic font-light text-gradient">
                {' '}
                {t('research.section.title_b')}
              </span>
            </>
          }
          description={t('research.section.description')}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 md:grid-cols-2"
        >
          {items.map((line) => (
            <motion.article
              key={line.index}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="group/card relative overflow-hidden rounded-2xl border border-chrome/5 glass-card p-8 md:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-nebula-violet/15 blur-3xl opacity-60 transition-opacity duration-700 group-hover/card:opacity-100"
              />
              <header className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-bone-400">
                  {line.index}
                </span>
                <span className="h-px w-12 bg-chrome/10" aria-hidden="true" />
              </header>
              <h3 className="mt-6 text-2xl font-semibold text-bone-50 md:text-3xl">
                {line.title}
              </h3>
              <p className="mt-4 max-w-prose text-bone-300 text-pretty">{line.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {line.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-chrome/10 bg-chrome/[0.03] px-3 py-1 text-xs text-bone-200"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
