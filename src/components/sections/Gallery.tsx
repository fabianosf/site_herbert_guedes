import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { fadeUp, stagger } from '../../lib/motion';
import { galleryPhotos } from '../../config/galleryPhotos';
import { cn } from '../../lib/cn';

const PAGE_SIZE = 24;

const thumbFor = (src: string) => {
  const i = src.lastIndexOf('/');
  if (i < 0) return src;
  return `${src.slice(0, i)}/thumbs${src.slice(i)}`;
};

/** Compact page list: 1 … 4 5 6 … 31 */
const buildPageItems = (current: number, total: number): Array<number | 'ellipsis'> => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((p) => pages.add(p));
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const items: Array<number | 'ellipsis'> = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) items.push('ellipsis');
    items.push(sorted[i]);
  }
  return items;
};

export const Gallery = () => {
  const { t } = useTranslation();
  const totalPages = Math.max(1, Math.ceil(galleryPhotos.length / PAGE_SIZE));
  const [page, setPage] = useState(1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pagePhotos = useMemo(
    () => galleryPhotos.slice(start, start + PAGE_SIZE),
    [start],
  );
  const pageItems = useMemo(() => buildPageItems(safePage, totalPages), [safePage, totalPages]);

  const goToPage = (p: number) => {
    const next = Math.min(Math.max(p, 1), totalPages);
    setPage(next);
    setLightbox(null);
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const closeLightbox = () => setLightbox(null);

  const moveLightbox = (dir: 1 | -1) => {
    if (lightbox == null || pagePhotos.length === 0) return;
    setLightbox((lightbox + dir + pagePhotos.length) % pagePhotos.length);
  };

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
  }, [page, safePage]);

  useEffect(() => {
    if (lightbox == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') {
        setLightbox((i) => {
          if (i == null || pagePhotos.length === 0) return i;
          return (i - 1 + pagePhotos.length) % pagePhotos.length;
        });
      }
      if (e.key === 'ArrowRight') {
        setLightbox((i) => {
          if (i == null || pagePhotos.length === 0) return i;
          return (i + 1) % pagePhotos.length;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [lightbox, pagePhotos.length]);

  const rangeFrom = galleryPhotos.length === 0 ? 0 : start + 1;
  const rangeTo = Math.min(start + PAGE_SIZE, galleryPhotos.length);

  return (
    <section id="gallery" className="section relative">
      <Container size="full">
        <SectionHeader
          index={t('gallery.section.index')}
          eyebrow={t('gallery.section.eyebrow')}
          title={
            <>
              {t('gallery.section.title_a')}
              <br className="hidden md:block" />
              <span className="italic font-light text-gradient">
                {' '}
                {t('gallery.section.title_b')}
              </span>
            </>
          }
          description={t('gallery.section.description')}
        />

        {galleryPhotos.length === 0 ? (
          <p className="text-sm text-bone-400">{t('gallery.empty')}</p>
        ) : (
          <>
            <motion.div
              key={safePage}
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            >
              {pagePhotos.map((src, i) => (
                <motion.button
                  key={src}
                  variants={fadeUp}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-ink-800/40"
                  aria-label={t('gallery.photo_aria', { n: start + i + 1 })}
                >
                  <img
                    src={thumbFor(src)}
                    alt=""
                    width={320}
                    height={320}
                    loading={i < 8 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.button>
              ))}
            </motion.div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="text-sm text-bone-400">
                {t('gallery.page_range', {
                  from: rangeFrom,
                  to: rangeTo,
                  total: galleryPhotos.length,
                  page: safePage,
                  pages: totalPages,
                })}
              </p>

              <nav
                className="flex flex-wrap items-center justify-center gap-1.5"
                aria-label={t('gallery.pagination_aria')}
              >
                <button
                  type="button"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage <= 1}
                  className="grid h-10 w-10 place-items-center rounded-full border border-chrome/15 text-bone-200 transition-colors hover:border-nebula-violet/40 hover:bg-nebula-violet/10 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={t('gallery.prev_page')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {pageItems.map((item, idx) =>
                  item === 'ellipsis' ? (
                    <span
                      key={`e-${idx}`}
                      className="px-1 text-sm text-bone-500"
                      aria-hidden="true"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      onClick={() => goToPage(item)}
                      aria-current={item === safePage ? 'page' : undefined}
                      aria-label={t('gallery.page_aria', { page: item })}
                      className={cn(
                        'grid h-10 min-w-10 place-items-center rounded-full border px-2.5 text-sm font-medium transition-colors',
                        item === safePage
                          ? 'border-nebula-violet/50 bg-nebula-violet/15 text-bone-50'
                          : 'border-chrome/15 text-bone-300 hover:border-nebula-violet/40 hover:bg-nebula-violet/10 hover:text-bone-50',
                      )}
                    >
                      {item}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage >= totalPages}
                  className="grid h-10 w-10 place-items-center rounded-full border border-chrome/15 text-bone-200 transition-colors hover:border-nebula-violet/40 hover:bg-nebula-violet/10 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={t('gallery.next_page')}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </>
        )}
      </Container>

      <AnimatePresence>
        {lightbox != null && pagePhotos[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/95 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
            role="dialog"
            aria-modal="true"
            aria-label={t('gallery.lightbox_aria')}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 text-bone-300 hover:text-bone-50"
              aria-label={t('gallery.close')}
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                moveLightbox(-1);
              }}
              className="absolute left-4 text-bone-300 hover:text-bone-50"
              aria-label={t('gallery.prev')}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <img
              src={pagePhotos[lightbox]}
              alt=""
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                moveLightbox(1);
              }}
              className="absolute right-4 text-bone-300 hover:text-bone-50"
              aria-label={t('gallery.next')}
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
