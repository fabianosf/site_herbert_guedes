import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { useLocaleSync } from './router/useLocaleSync';
import { ALL_PATHS } from './router/routes';

const Members = lazy(() =>
  import('./components/sections/Members').then((m) => ({ default: m.Members })),
);
const Research = lazy(() =>
  import('./components/sections/Research').then((m) => ({ default: m.Research })),
);
const Teaching = lazy(() =>
  import('./components/sections/Teaching').then((m) => ({ default: m.Teaching })),
);
const Media = lazy(() =>
  import('./components/sections/Media').then((m) => ({ default: m.Media })),
);
const Awards = lazy(() =>
  import('./components/sections/Awards').then((m) => ({ default: m.Awards })),
);
const Contact = lazy(() =>
  import('./components/sections/Contact').then((m) => ({ default: m.Contact })),
);

const SectionFallback = () => (
  <div className="section" aria-hidden="true">
    <div className="container">
      <div className="h-40 animate-pulse-soft rounded-2xl bg-ink-800/40" />
    </div>
  </div>
);

const SitePage = () => {
  useLocaleSync();
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="relative">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Members />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Research />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Teaching />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Media />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Awards />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = `${t('site.name')} — ${t('site.tagline')}`;
    const skip = document.querySelector<HTMLAnchorElement>('a[data-skip]');
    if (skip) skip.textContent = t('common.skip_to_content');
  }, [t, i18n.language]);

  return (
    <Routes>
      {ALL_PATHS.map((p) => (
        <Route key={p} path={p} element={<SitePage />} />
      ))}
      <Route path="*" element={<SitePage />} />
    </Routes>
  );
}
