import type { Variants } from 'framer-motion';
import { motionDefaults } from '../config/theme';

const { durationBase, ease, staggerChildren } = motionDefaults;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durationBase, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durationBase, ease } },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren: 0.1 },
  },
};

export const charReveal: Variants = {
  hidden: { y: '100%' },
  visible: (i: number = 0) => ({
    y: 0,
    transition: { duration: 0.9, ease, delay: i * 0.04 },
  }),
};

export const viewportOnce = { once: true, amount: 0.2 } as const;
