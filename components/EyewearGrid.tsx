'use client';

import { motion } from 'framer-motion';
import type { CollectionItem } from '@/config/collections';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Reusable grid of collection cards. Used by the eyeglasses, sunglasses, men's,
 * women's and kids' sections so they stay visually consistent.
 */
export default function EyewearGrid({
  items,
  tone = 'dark',
  columns = 4,
  className,
}: {
  items: CollectionItem[];
  /** `dark` = dark text on light backgrounds, `light` = light text on dark. */
  tone?: 'dark' | 'light';
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const light = tone === 'light';

  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(0, 0.06)}
      className={cn(
        'grid gap-px',
        columns === 2 && 'sm:grid-cols-2',
        columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
        light ? 'bg-paper/15' : 'bg-ink/10',
        className
      )}
    >
      {items.map((item) => (
        <motion.li
          key={item.title}
          variants={fadeUp}
          className={cn(
            'group relative p-6 transition-colors duration-500 ease-luxe sm:p-7',
            light ? 'bg-ink hover:bg-ink-soft' : 'bg-paper hover:bg-paper-soft'
          )}
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-0 w-px bg-gold transition-all duration-700 ease-luxe group-hover:h-full"
          />
          <h3
            className={cn(
              'font-display text-lg font-normal transition-colors duration-500 group-hover:text-gold',
              light ? 'text-paper' : 'text-ink'
            )}
          >
            {item.title}
          </h3>
          <p className={cn('mt-2.5 text-sm leading-relaxed', light ? 'text-paper/55' : 'text-ink/60')}>
            {item.description}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
