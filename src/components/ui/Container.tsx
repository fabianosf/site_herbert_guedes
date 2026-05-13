import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
};

const sizes: Record<NonNullable<ContainerProps['size']>, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-[1440px]',
};

export const Container = ({ children, className, size = 'lg', ...rest }: ContainerProps) => (
  <div
    className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', sizes[size], className)}
    {...rest}
  >
    {children}
  </div>
);
