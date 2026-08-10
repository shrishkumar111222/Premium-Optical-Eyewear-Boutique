import type { Variants } from 'framer-motion';

/**
 * Shared motion vocabulary. Everything is a fade with a short translation —
 * restraint is the point. Framer Motion already honours `prefers-reduced-motion`
 * through <MotionConfig reducedMotion="user"> in the root layout.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Wrap a group of `fadeUp` children to reveal them one after another. */
export const stagger = (delayChildren = 0, staggerChildren = 0.09): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

/** Mask reveal for editorial imagery. */
export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 1.1, ease: EASE },
  },
};

/** Standard scroll-trigger settings — reveal once, slightly before full view. */
export const viewportOnce = { once: true, amount: 0.18, margin: '0px 0px -80px 0px' } as const;
