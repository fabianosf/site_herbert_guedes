import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '../../config/theme';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { cn } from '../../lib/cn';

type MemberItem = { name: string; role: string; focus: string };

export const Members = () => {
  const { t } = useTranslation();
  const items = t('members.items', { returnObjects: true }) as MemberItem[];

  return (
    <section id="members" className="section relative bg-ink-900/40">
      <Container size="full">
        <SectionHeader
          index={t('members.section.index')}
          eyebrow={t('members.section.eyebrow')}
          title={
            <>
              {t('members.section.title_a')}
              <br className="hidden md:block" />
              <span className="italic font-light text-gradient">
                {' '}
                {t('members.section.title_b')}
              </span>
            </>
          }
          description={t('members.section.description')}
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((m, i) => {
            const slot = siteConfig.members[i] ?? {
              initials: '·',
              color: 'from-nebula-violet/25 to-nebula-indigo/25',
            };
            return (
              <motion.li
                key={`${m.name}-${i}`}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                className="group/m relative overflow-hidden rounded-2xl border border-chrome/5 glass-card p-6 md:p-8"
              >
                <div
                  className={cn(
                    'pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br blur-3xl opacity-60 transition-opacity duration-700 group-hover/m:opacity-100',
                    slot.color,
                  )}
                  aria-hidden="true"
                />

                <div className="relative flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-chrome/[0.05] ring-1 ring-chrome/10 font-mono text-base text-bone-50">
                    {slot.initials}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-bone-400">{m.role}</p>
                    <h3 className="mt-1 text-lg font-semibold text-bone-50">{m.name}</h3>
                  </div>
                </div>

                <p className="relative mt-6 text-sm text-bone-300">
                  <span className="text-bone-400">Focus · </span>
                  {m.focus}
                </p>

                <div className="relative mt-6 flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-gradient-to-r from-chrome/10 via-chrome/5 to-transparent"
                  />
                  <span className="ml-4 text-xs text-bone-400 transition-colors group-hover/m:text-accent">
                    {t('members.profile')} →
                  </span>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
};
