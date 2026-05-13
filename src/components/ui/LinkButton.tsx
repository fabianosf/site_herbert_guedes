import type { MouseEventHandler, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { buttonClasses, type Size, type Variant } from './buttonStyles';
import { ButtonIcon } from './Button';
import { pathFor, type SectionKey } from '../../router/routes';
import type { SupportedLanguage } from '../../i18n';
import { cn } from '../../lib/cn';

type Props = {
  section: SectionKey;
  variant?: Variant;
  size?: Size;
  withIcon?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  'aria-label'?: string;
};

export const LinkButton = ({
  section,
  variant,
  size,
  withIcon = true,
  className,
  children,
  onClick,
  ...rest
}: Props) => {
  const { i18n } = useTranslation();
  const lang = ((i18n.resolvedLanguage ?? i18n.language ?? 'pt').split('-')[0] === 'en'
    ? 'en'
    : 'pt') as SupportedLanguage;

  return (
    <Link
      to={pathFor(section, lang)}
      onClick={onClick}
      className={cn(buttonClasses(variant, size), className)}
      {...rest}
    >
      <span>{children}</span>
      {withIcon && <ButtonIcon />}
    </Link>
  );
};
