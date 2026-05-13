import { cn } from '../../lib/cn';

export type Variant = 'primary' | 'secondary' | 'ghost';
export type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-500 ease-smooth disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-ink-950 hover:bg-accent-glow hover:shadow-[0_0_40px_-8px_theme(colors.accent.DEFAULT)]',
  secondary:
    'bg-ink-800 text-bone-100 ring-1 ring-inset ring-ink-600 hover:bg-ink-700 hover:ring-bone-300/40',
  ghost: 'text-bone-100 hover:text-accent',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const buttonClasses = (variant: Variant = 'primary', size: Size = 'md') =>
  cn(base, variants[variant], sizes[size]);
