import { useTranslation } from 'react-i18next';
import { siteConfig } from '../../config/theme';
import { Container } from '../ui/Container';
import { LocalizedLink } from '../../router/LocalizedLink';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const { email, socials, nav } = siteConfig;

  return (
    <footer className="relative overflow-hidden border-t border-chrome/5 bg-ink-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-16 mx-auto h-24 w-3/4 rounded-full bg-nebula-violet/15 blur-3xl"
      />
      <Container size="full" className="relative">
        <div className="py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-bone-300">
                {t('site.tagline')}
              </p>
              <p className="text-display-md font-semibold text-bone-50">
                <span className="font-light">{t('site.brand.prefix')}</span>
                <span className="font-black">{t('site.brand.suffix')}</span>
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-bone-400">
                {t('site.location')}
              </p>
              <p className="max-w-md text-bone-300">{t('site.description')}</p>
            </div>

            <FooterColumn title={t('footer.navigation')}>
              {nav
                .filter((n) => n.key !== 'home')
                .map((n) => (
                  <li key={n.key}>
                    <LocalizedLink
                      section={n.key}
                      className="link-underline text-bone-300 hover:text-bone-50"
                    >
                      {t(`nav.${n.key}`)}
                    </LocalizedLink>
                  </li>
                ))}
            </FooterColumn>

            <FooterColumn title={t('footer.academic')}>
              {socials.map((s) => (
                <FooterLink key={s.label} href={s.href} external>
                  {s.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title={t('footer.contact')}>
              <a href={`mailto:${email}`} className="link-underline break-all text-bone-100">
                {email}
              </a>
              <p className="pt-2 text-xs text-bone-400">INCA · FIOCRUZ · FioCâncer</p>
            </FooterColumn>
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-chrome/5 pt-8 text-xs text-bone-400 sm:flex-row sm:items-center">
            <p>{t('footer.rights', { year })}</p>
            <p className="font-mono uppercase tracking-[0.25em]">{t('site.location')}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

const FooterColumn = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <p className="text-xs uppercase tracking-[0.25em] text-bone-400">{title}</p>
    <ul className="space-y-2 text-bone-100">{children}</ul>
  </div>
);

const FooterLink = ({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) => (
  <li>
    <a
      href={href}
      className="link-underline text-bone-300 hover:text-bone-50"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  </li>
);
