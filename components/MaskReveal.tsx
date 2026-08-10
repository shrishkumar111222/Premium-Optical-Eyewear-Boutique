'use client';

import { motion } from 'framer-motion';
import { maskReveal, viewportOnce } from '@/lib/motion';

/**
 * Editorial curtain reveal.
 *
 * The clip-path lives on an inner element on purpose. Chrome shrinks an
 * element's IntersectionObserver rect by its own clip-path, so observing a
 * fully-clipped node deadlocks: it can never intersect, so it never animates,
 * so it stays invisible. The observed wrapper here is always unclipped.
 */
export default function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delayChildren: delay }}
      className={className}
    >
      <motion.div variants={maskReveal} className="h-full w-full">
        {children}
      </motion.div>
    </motion.div>
  );
}
