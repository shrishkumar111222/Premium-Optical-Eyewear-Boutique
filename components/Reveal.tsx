'use client';

import { motion, type Variants } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  variants?: Variants;
  as?: 'div' | 'li' | 'article' | 'section' | 'header' | 'figure';
}

/**
 * Scroll-triggered reveal. Reveals once, then leaves the element alone.
 * Motion is disabled automatically for visitors who prefer reduced motion.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = 'div',
}: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
