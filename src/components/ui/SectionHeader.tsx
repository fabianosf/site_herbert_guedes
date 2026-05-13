import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { cn } from '../../lib/cn';

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export const SectionHeader = ({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) => (
  <motion.header
    variants={stagger}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
    className={cn(
      'mb-16 md:mb-24',
      align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl',
      className,
    )}
  >
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-bone-300"
    >
      <span className="font-mono text-accent">{index}</span>
      <span className="h-px w-8 bg-bone-300/40" aria-hidden="true" />
      <span>{eyebrow}</span>
    </motion.div>
    <motion.h2
      variants={fadeUp}
      className="mt-6 text-display-md font-semibold text-balance text-bone-50"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        variants={fadeUp}
        className="mt-6 text-lg text-bone-300 text-pretty md:text-xl"
      >
        {description}
      </motion.p>
    )}
  </motion.header>
);
