import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { galleryPhotos } from '../../config/galleryPhotos';

const PAGE_SIZE = 48;

export const Gallery = () => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = galleryPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < galleryPhotos.length;

  const closeLightbox = () => setLightbox(null);

  const moveLightbox = (dir: 1 | -1) => {
    if (lightbox == null) return;
    const next = (lightbox + dir + galleryPhotos.length) % galleryPhotos.length;
    setLightbox(next);
    if (next >= visibleCount) setVisibleCount(Math.min(galleryPhotos.length, next + 1));
  };

  useEffect(() => {
    if (lightbox == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') {
        setLightbox((i) => {
          if (i == null) return i;
          return (i - 1 + galleryPhotos.length) % galleryPhotos.length;
        });
      }
      if (e.key === 'ArrowRight') {
        setLightbox((i) => {
          if (i == null) return i;
          return (i + 1) % galleryPhotos.length;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [lightbox]);

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
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            >
              {visible.map((src, i) => (
                <motion.button
                  key={src}
                  variants={fadeUp}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative aspect-square overflow-hidden rounded-xl"
                  aria-label={t('gallery.photo_aria', { n: i + 1 })}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.button>
              ))}
            </motion.div>

            <p className="mt-6 text-sm text-bone-400">
              {t('gallery.showing', {
                shown: visible.length,
                total: galleryPhotos.length,
              })}
            </p>

            {hasMore && (
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((n) => Math.min(galleryPhotos.length, n + PAGE_SIZE))
                  }
                  className="rounded-full border border-chrome/15 px-6 py-2.5 text-sm font-medium text-bone-100 transition-colors hover:border-nebula-violet/40 hover:bg-nebula-violet/10"
                >
                  {t('gallery.load_more')}
                </button>
              </div>
            )}
          </>
        )}
      </Container>

      <AnimatePresence>
        {lightbox != null && (
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
              src={galleryPhotos[lightbox]}
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
