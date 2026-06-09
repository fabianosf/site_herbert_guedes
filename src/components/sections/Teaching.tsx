import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';

type Item = { title: string; level: string; description: string };
type DefendedItem = {
  author: string;
  title: string;
  level: string;
  area: string;
  year: number;
  funding: string;
};
type OngoingItem = {
  author: string;
  title: string;
  level: string;
  area: string;
  funding: string;
};
type DefendedMap = Record<string, DefendedItem>;
type OngoingMap = Record<string, OngoingItem>;
type LevelLabels = Record<string, string>;

const LEVEL_ORDER = ['phd', 'masters', 'graduation'] as const;
const ONGOING_LEVEL_ORDER = ['postdoc', 'phd', 'masters', 'graduation'] as const;

const ONGOING_LEVEL_COLORS: Record<string, string> = {
  postdoc: 'border-nebula-violet/40 bg-nebula-violet/10 text-nebula-violet',
  phd: 'border-nebula-indigo/40 bg-nebula-indigo/10 text-nebula-indigo',
  masters: 'border-nebula-cyan/40 bg-nebula-cyan/10 text-nebula-cyan',
  graduation: 'border-chrome/20 bg-chrome/[0.04] text-bone-300',
};

export const Teaching = () => {
  const { t } = useTranslation();
  const items = t('teaching.items', { returnObjects: true }) as Item[];
  const defendedMap = t('teaching.defended.items', { returnObjects: true }) as DefendedMap;
  const ongoingMap = t('teaching.ongoing.items', { returnObjects: true }) as OngoingMap;
  const levelLabels = t('teaching.defended.level_labels', { returnObjects: true }) as LevelLabels;

  const defendedByLevel = LEVEL_ORDER.map((lvl) => ({
    level: lvl,
    label: levelLabels[lvl] ?? lvl,
    entries: Object.values(defendedMap)
      .filter((d) => d.level === lvl)
      .sort((a, b) => b.year - a.year),
  })).filter((g) => g.entries.length > 0);

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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20"
        >
          <h2 className="text-lg font-semibold text-bone-50 mb-8 flex items-center gap-3">
            <span className="h-px flex-1 bg-chrome/10" aria-hidden="true" />
            <span>{t('teaching.defended.title')}</span>
            <span className="h-px flex-1 bg-chrome/10" aria-hidden="true" />
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-10"
          >
            {defendedByLevel.map(({ level, label, entries }) => (
              <div key={level}>
                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">{label}</p>
                <ul className="rounded-2xl border border-chrome/5 glass-card divide-y divide-chrome/5 px-6 md:px-8">
                  {entries.map((d) => (
                    <motion.li
                      key={`${d.author}-${d.year}`}
                      variants={fadeUp}
                      className="py-5 flex flex-wrap items-baseline justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-bone-50">{d.author}</p>
                        <p className="mt-1 text-sm text-bone-300 text-pretty">{d.title}</p>
                        <p className="mt-1 text-xs text-bone-400">{d.funding}</p>
                      </div>
                      <span className="font-mono text-xs text-bone-400 shrink-0">{d.year}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20"
        >
          <h2 className="text-lg font-semibold text-bone-50 mb-2 flex items-center gap-3">
            <span className="h-px flex-1 bg-chrome/10" aria-hidden="true" />
            <span>{t('teaching.ongoing.title')}</span>
            <span className="h-px flex-1 bg-chrome/10" aria-hidden="true" />
          </h2>
          <p className="text-center text-xs text-bone-400 mb-10">
            {t('teaching.ongoing.subtitle')}
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-10"
          >
            {ONGOING_LEVEL_ORDER.map((lvl) => {
              const entries = Object.values(ongoingMap).filter((o) => o.level === lvl);
              if (entries.length === 0) return null;
              const badgeClass = ONGOING_LEVEL_COLORS[lvl] ?? ONGOING_LEVEL_COLORS['graduation'];
              return (
                <div key={lvl}>
                  <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">
                    {levelLabels[lvl] ?? lvl}
                  </p>
                  <motion.ul
                    variants={stagger}
                    className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {entries.map((o) => (
                      <motion.li
                        key={o.author}
                        variants={fadeUp}
                        className="relative overflow-hidden rounded-xl border border-chrome/5 glass-card p-5"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="text-sm font-medium text-bone-50 leading-snug">{o.author}</p>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide ${badgeClass}`}
                          >
                            {levelLabels[o.level] ?? o.level}
                          </span>
                        </div>
                        <p className="text-xs text-bone-300 text-pretty line-clamp-3">{o.title}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-bone-400">
                          <span>{o.area}</span>
                          <span aria-hidden="true">·</span>
                          <span>{o.funding}</span>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
