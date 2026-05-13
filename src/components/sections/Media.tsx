import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';

type Item = { outlet: string; title: string; year: string };

export const Media = () => {
  const { t } = useTranslation();
  const items = t('media.items', { returnObjects: true }) as Item[];

  return (
    <section id="media" className="section relative">
      <Container size="full">
        <SectionHeader
          index={t('media.section.index')}
          eyebrow={t('media.section.eyebrow')}
          title={
            <>
              {t('media.section.title_a')}
              <br className="hidden md:block" />
              <span className="italic font-light text-gradient">
                {' '}
                {t('media.section.title_b')}
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
          {items.map((m) => (
            <motion.li
              key={`${m.outlet}-${m.title}`}
              variants={fadeUp}
              className="flex flex-wrap items-baseline justify-between gap-4 py-5"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-bone-400">{m.outlet}</p>
                <p className="mt-1 text-bone-100">{m.title}</p>
              </div>
              <span className="font-mono text-xs text-bone-400">{m.year}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
};
