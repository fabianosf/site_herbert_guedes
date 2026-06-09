import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { publications } from '../../config/theme';

const PAGE_SIZE = 6;

type PubItem = { title: string; authors: string };

export const Publications = () => {
  const { t } = useTranslation();
  const items = t('publications.items', { returnObjects: true }) as Record<string, PubItem>;
  const [page, setPage] = useState(0);

  const sorted = [...publications].sort((a, b) => b.year - a.year);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const link = (pub: (typeof publications)[0]) => pub.wos ?? pub.doi ?? null;

  return (
    <section id="publications" className="section relative bg-ink-900/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nebula-violet/40 to-transparent"
      />
      <Container size="full">
        <SectionHeader
          index={t('publications.section.index')}
          eyebrow={t('publications.section.eyebrow')}
          title={
            <>
              {t('publications.section.title_a')}
              <br className="hidden md:block" />
              <span className="italic font-light text-gradient">
                {' '}
                {t('publications.section.title_b')}
              </span>
            </>
          }
          description={t('publications.section.description')}
        />

        <AnimatePresence mode="wait">
          <motion.ol
            key={page}
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="space-y-4"
          >
            {paginated.map((pub) => {
              const content = items[pub.id];
              if (!content) return null;
              const href = link(pub);
              return (
                <motion.li
                  key={pub.id}
                  variants={fadeUp}
                  className="group/pub relative overflow-hidden rounded-2xl border border-chrome/5 glass-card p-6 md:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-nebula-indigo/10 blur-3xl opacity-50 transition-opacity duration-700 group-hover/pub:opacity-100"
                  />
                  <div className="relative flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 font-mono text-xs text-accent">
                          {pub.year}
                        </span>
                        <span className="text-xs italic text-bone-400">{pub.journal}</span>
                      </div>
                      <p className="text-base font-semibold text-bone-50 leading-snug">
                        {content.title}
                      </p>
                      <p className="mt-2 text-sm text-bone-400 leading-relaxed">
                        {content.authors}
                      </p>
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t('publications.cta_doi')} — ${content.title}`}
                        className="flex shrink-0 items-center gap-1.5 rounded-full border border-chrome/10 bg-chrome/[0.04] px-3 py-1.5 text-xs text-bone-300 transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        {pub.wos ? 'WoS' : t('publications.cta_doi')}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <span
                        title={t('publications.link_soon') ?? 'Link em breve'}
                        className="flex shrink-0 cursor-default items-center gap-1.5 rounded-full border border-chrome/5 bg-chrome/[0.02] px-3 py-1.5 text-xs text-bone-400/50 select-none"
                      >
                        {t('publications.cta_doi')}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </AnimatePresence>

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Button
              variant="ghost"
              size="sm"
              withIcon={false}
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              aria-label={t('publications.page_prev') ?? 'Página anterior'}
            >
              ← {t('publications.page_prev') ?? 'Anterior'}
            </Button>
            <span className="font-mono text-xs text-bone-400">
              {page + 1} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              withIcon={false}
              disabled={page === totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              aria-label={t('publications.page_next') ?? 'Próxima página'}
            >
              {t('publications.page_next') ?? 'Próxima'} →
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  );
};
