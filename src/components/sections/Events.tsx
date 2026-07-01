import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { cn } from '../../lib/cn';

const snct2025 = Object.values(
  import.meta.glob('../../assets/eventos/snct-2025/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
  }),
) as string[];

const susInova2026 = Object.values(
  import.meta.glob('../../assets/eventos/sus-inova-2026/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
  }),
) as string[];

const simposioIoc2026 = Object.values(
  import.meta.glob('../../assets/eventos/simposio-ioc-2026/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
  }),
) as string[];

const fimDeAno2025 = Object.values(
  import.meta.glob('../../assets/eventos/fim-de-ano-2025/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
  }),
) as string[];

const EVENT_IDS = ['snct-2025', 'sus-inova-2026', 'simposio-ioc-2026', 'fim-de-ano-2025'] as const;
type EventId = (typeof EVENT_IDS)[number];

const EVENT_PHOTOS: Record<EventId, string[]> = {
  'snct-2025': snct2025,
  'sus-inova-2026': susInova2026,
  'simposio-ioc-2026': simposioIoc2026,
  'fim-de-ano-2025': fimDeAno2025,
};

type Lightbox = { eventId: EventId; index: number } | null;

export const Events = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<EventId>('snct-2025');
  const [lightbox, setLightbox] = useState<Lightbox>(null);

  const photos = EVENT_PHOTOS[activeTab];

  const closeLightbox = () => setLightbox(null);

  const moveLightbox = (dir: 1 | -1) => {
    if (!lightbox) return;
    const list = EVENT_PHOTOS[lightbox.eventId];
    setLightbox({ ...lightbox, index: (lightbox.index + dir + list.length) % list.length });
  };

  return (
    <section id="events" className="section relative">
      <Container size="full">
        <SectionHeader
          index={t('events.section.index')}
          eyebrow={t('events.section.eyebrow')}
          title={
            <>
              {t('events.section.title_a')}
              <br className="hidden md:block" />
              <span className="italic font-light text-gradient">
                {' '}
                {t('events.section.title_b')}
              </span>
            </>
          }
          description={t('events.section.description')}
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {EVENT_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={cn(
                'px-5 py-2 text-sm font-medium rounded-full border transition-colors',
                activeTab === id
                  ? 'border-nebula-violet/50 bg-nebula-violet/10 text-bone-50'
                  : 'border-chrome/10 text-bone-400 hover:text-bone-200 hover:border-chrome/20',
              )}
            >
              {t(`events.items.${id}.name`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {photos.length === 0 ? (
          <p className="text-bone-400 text-sm">{t('events.empty')}</p>
        ) : (
          <motion.div
            key={activeTab}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {photos.map((src, i) => (
              <motion.button
                key={src}
                variants={fadeUp}
                type="button"
                onClick={() => setLightbox({ eventId: activeTab, index: i })}
                className="relative aspect-square overflow-hidden rounded-xl group"
                aria-label={`Foto ${i + 1}`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.button>
            ))}
          </motion.div>
        )}
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-bone-300 hover:text-bone-50"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); moveLightbox(-1); }}
              className="absolute left-4 text-bone-300 hover:text-bone-50"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <img
              src={EVENT_PHOTOS[lightbox.eventId][lightbox.index]}
              alt=""
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); moveLightbox(1); }}
              className="absolute right-4 text-bone-300 hover:text-bone-50"
              aria-label="Próxima"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
