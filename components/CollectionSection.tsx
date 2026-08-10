'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { frameCategories, products, type FrameCategory, type Product } from '@/config/products';
import { stagger, fadeUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';
import SectionHeading from './SectionHeading';
import ProductCard from './ProductCard';
import ProductDialog from './ProductDialog';

type Filter = 'All' | FrameCategory;

/** The main product grid, filterable by collection. */
export default function CollectionSection() {
  const [filter, setFilter] = useState<Filter>('All');
  const [active, setActive] = useState<Product | null>(null);

  const filtered = useMemo(
    () => (filter === 'All' ? products : products.filter((p) => p.category === filter)),
    [filter]
  );

  const filters: Filter[] = ['All', ...frameCategories];

  return (
    <section id="collection" className="bg-paper-warm py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="The Collection"
            title="New Collection"
            subtitle="Frames designed for modern faces and distinctive personalities."
          />
          <p className="text-[11px] uppercase tracking-wide2 text-ink/55 lg:pb-2">
            {filtered.length} {filtered.length === 1 ? 'frame' : 'frames'} shown
          </p>
        </div>

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filter frames by collection"
          className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1"
        >
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
              className={cn(
                'whitespace-nowrap border px-5 py-2.5 text-[10px] uppercase tracking-wide2 transition-all duration-400 ease-luxe',
                filter === item
                  ? 'border-ink bg-ink text-paper'
                  : 'border-ink/15 text-ink/60 hover:border-gold hover:text-ink'
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <motion.div
          key={filter}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.05, 0.07)}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((product, index) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} onViewDetails={setActive} priority={index < 3} />
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-10 text-xs text-ink/60">
          Demo catalogue with indicative pricing. Availability and final pricing are confirmed in
          store.
        </p>
      </div>

      <ProductDialog product={active} onClose={() => setActive(null)} />
    </section>
  );
}
