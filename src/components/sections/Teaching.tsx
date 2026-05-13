import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';

type Item = { title: string; level: string; description: string };

export const Teaching = () => {
  const { t } = useTranslation();
  const items = t('teaching.items', { returnObjects: true }) as Item[];

  return (
    <section id="teaching" className="section relative bg-ink-900/40">
      <Container size="full">
        <SectionHeader
          index={t('teaching.section.index')}
          eyebrow={t('teaching.section.eyebrow')}
          title={
            <>
              {t('teaching.section.title_a')}
              <br className="hidden md:block" />
              <span className="italic font-light text-gradient">
                {' '}
                {t('teaching.section.title_b')}
              </span>
            </>
          }
          description={t('teaching.section.description')}
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="divide-y divide-chrome/5 border-y border-chrome/5"
        >
          {items.map((item, i) => (
            <motion.li key={item.title} variants={fadeUp} className="group/row py-8 md:py-10">
              <div className="grid items-start gap-6 md:grid-cols-12">
                <span className="md:col-span-1 font-mono text-xs uppercase tracking-[0.25em] text-bone-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="md:col-span-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">{item.level}</p>
                  <h3 className="mt-2 text-xl font-semibold text-bone-50 md:text-2xl">
                    {item.title}
                  </h3>
                </div>
                <p className="md:col-span-8 text-bone-300 text-pretty">{item.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
};
