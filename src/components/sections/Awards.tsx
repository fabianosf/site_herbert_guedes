import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';

type Item = { year: string; title: string; org: string };

export const Awards = () => {
  const { t } = useTranslation();
  const items = t('awards.items', { returnObjects: true }) as Item[];

  return (
    <section id="awards" className="section relative bg-ink-900/40">
      <Container size="full">
        <SectionHeader
          index={t('awards.section.index')}
          eyebrow={t('awards.section.eyebrow')}
          title={
            <>
              {t('awards.section.title_a')}
              <br className="hidden md:block" />
              <span className="italic font-light text-gradient">
                {' '}
                {t('awards.section.title_b')}
              </span>
            </>
          }
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="rounded-2xl border border-chrome/5 glass-card divide-y divide-chrome/5 p-6 md:p-8"
        >
          {items.map((p) => (
            <motion.li
              key={`${p.year}-${p.title}`}
              variants={fadeUp}
              className="flex flex-wrap items-baseline justify-between gap-4 py-5"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-accent">{p.year}</p>
                <p className="mt-1 text-bone-100">{p.title}</p>
              </div>
              <span className="text-xs text-bone-400">{p.org}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
};
