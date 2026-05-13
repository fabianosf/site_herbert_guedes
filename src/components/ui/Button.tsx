import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { buttonClasses, type Size, type Variant } from './buttonStyles';
import { cn } from '../../lib/cn';

export const ButtonIcon = () => (
  <ArrowUpRight
    aria-hidden="true"
    className="h-4 w-4 transition-transform duration-500 ease-smooth group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
  />
);

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withIcon?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonElProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type AnchorElProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

export type ButtonProps = ButtonElProps | AnchorElProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const { variant = 'primary', size = 'md', withIcon = true, className, children, ...rest } =
      props;
    const classes = cn(buttonClasses(variant, size), className);

    const content = (
      <>
        <span>{children}</span>
        {withIcon && <ButtonIcon />}
      </>
    );

    if (props.as === 'a') {
      const { as: _as, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
        as?: 'a';
      };
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...anchorRest}>
          {content}
        </a>
      );
    }
    const { as: _as, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement> & {
      as?: 'button';
    };
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonRest.type ?? 'button'}
        className={classes}
        {...buttonRest}
      >
        {content}
      </button>
    );
  },
);
Button.displayName = 'Button';
