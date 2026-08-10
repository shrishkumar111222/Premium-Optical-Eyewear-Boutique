'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { gallery } from '@/config/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/** Masonry gallery with a full-screen lightbox (arrow keys and Esc supported). */
export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (direction: 1 | -1) =>
      setIndex((current) =>
        current === null ? current : (current + direction + gallery.length) % gallery.length
      ),
    []
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  const active = index === null ? null : gallery[index];

  return (
    <section id="gallery" className="bg-paper-warm py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Gallery"
          align="center"
          title="Inside the boutique"
          subtitle="The display walls, the lens counter and the corner where most decisions actually get made."
        />

        {/* CSS columns give a true masonry flow without a layout library. */}
        <div className="mt-14 columns-2 gap-4 sm:gap-5 lg:columns-3">
          {gallery.map((item, itemIndex) => (
            <Reveal key={item.src} delay={(itemIndex % 3) * 0.06} className="mb-4 sm:mb-5">
              <button
                type="button"
                onClick={() => setIndex(itemIndex)}
                className="group relative block w-full overflow-hidden bg-paper"
                aria-label={`Open image: ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1200}
                  height={1200}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/75 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  <span className="text-[10px] uppercase tracking-wide2 text-paper">
                    {item.caption}
                  </span>
                  <Expand className="h-4 w-4 text-gold" strokeWidth={1.5} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery image: ${active.caption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[88] flex flex-col bg-ink/96 backdrop-blur-sm"
            onClick={close}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <span className="text-[10px] uppercase tracking-wide2 text-paper/60">
                {String((index ?? 0) + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                <span className="ml-4 text-gold">{active.caption}</span>
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close gallery"
                autoFocus
                className="inline-flex h-11 w-11 items-center justify-center text-paper/70 transition-colors hover:text-gold"
              >
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>

            <div
              className="relative flex flex-1 items-center justify-center px-4 pb-16 sm:px-16"
              onClick={(event) => event.stopPropagation()}
            >
              <motion.div
                key={active.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-1 inline-flex h-12 w-12 items-center justify-center border border-paper/20 text-paper transition-colors hover:border-gold hover:text-gold sm:left-2"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.4} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-1 inline-flex h-12 w-12 items-center justify-center border border-paper/20 text-paper transition-colors hover:border-gold hover:text-gold sm:right-2"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
