'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Info, Minus } from 'lucide-react';
import { faceShapes, faceShapeDisclaimer } from '@/config/content';
import { cn } from '@/lib/utils';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/**
 * Interactive face shape selector. The outline for each shape is drawn inline
 * so the selection state reads instantly, even before any text changes.
 */
export default function FaceShapeGuide() {
  const [activeId, setActiveId] = useState(faceShapes[0].id);
  const active = faceShapes.find((shape) => shape.id === activeId) ?? faceShapes[0];

  return (
    <section id="face-shapes" className="bg-ink py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Face Shape Guide"
          tone="light"
          align="center"
          title="Find the Frame That Fits You"
          subtitle="A starting point, not a rulebook. Pick the outline closest to yours and see which silhouettes tend to balance it."
        />

        {/* Shape selector */}
        <div
          role="tablist"
          aria-label="Choose a face shape"
          className="mt-14 grid grid-cols-3 gap-px bg-paper/10 sm:grid-cols-6"
        >
          {faceShapes.map((shape) => {
            const selected = shape.id === activeId;
            return (
              <button
                key={shape.id}
                type="button"
                role="tab"
                id={`face-tab-${shape.id}`}
                aria-selected={selected}
                aria-controls="face-panel"
                onClick={() => setActiveId(shape.id)}
                className={cn(
                  'group flex flex-col items-center gap-3 px-3 py-6 transition-colors duration-500 ease-luxe',
                  selected ? 'bg-paper text-ink' : 'bg-ink text-paper/70 hover:bg-ink-soft hover:text-paper'
                )}
              >
                <FaceOutline
                  shape={shape.id}
                  className={cn(
                    'h-12 w-10 transition-colors duration-500',
                    selected ? 'text-gold' : 'text-current opacity-60 group-hover:opacity-100'
                  )}
                />
                <span className="text-[10px] uppercase tracking-wide2">{shape.name}</span>
                {/* Selection is signalled by more than colour alone. */}
                <span
                  aria-hidden="true"
                  className={cn('h-px w-6 transition-all duration-500', selected ? 'bg-gold' : 'bg-transparent')}
                />
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div
          id="face-panel"
          role="tabpanel"
          aria-labelledby={`face-tab-${active.id}`}
          className="border border-paper/10 border-t-0 bg-ink-soft"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
            >
              <div>
                <span className="eyebrow eyebrow-light">{active.name} Face</span>
                <h3 className="heading-md mt-4 text-paper">{active.principle}</h3>
                <p className="mt-4 text-sm leading-relaxed text-paper/60">{active.summary}</p>
                <p className="mt-6 border-l border-gold/50 pl-5 text-sm italic leading-relaxed text-paper/70">
                  {active.styleNote}
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-wide2 text-gold">
                    <Check className="h-3.5 w-3.5" strokeWidth={2} />
                    Recommended shapes
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {active.recommended.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 border-b border-paper/10 pb-2.5 text-sm text-paper/80"
                      >
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-wide2 text-paper/60">
                    <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                    Frames to consider carefully
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {active.consider.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 border-b border-paper/10 pb-2.5 text-sm text-paper/55"
                      >
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-paper/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="flex max-w-xl items-start gap-2.5 text-xs leading-relaxed text-paper/60">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
              {faceShapeDisclaimer}
            </p>
            <a href="#frame-finder" className="btn-gold shrink-0">
              Find My Frame
              <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Simple line portrait of each face shape. */
function FaceOutline({ shape, className }: { shape: string; className?: string }) {
  const paths: Record<string, string> = {
    oval: 'M32 6c12 0 19 11 19 25s-8 27-19 27-19-13-19-27S20 6 32 6Z',
    round: 'M32 7c14 0 22 10 22 24S46 58 32 58 10 45 10 31 18 7 32 7Z',
    square: 'M14 10h36v28c0 12-8 20-18 20s-18-8-18-20V10Z',
    heart: 'M12 12h40l-4 22c-2 14-9 24-16 24s-14-10-16-24L12 12Z',
    diamond: 'M32 4l20 26-20 28L12 30 32 4Z',
    oblong: 'M17 6h30v34c0 12-6 20-15 20s-15-8-15-20V6Z',
  };

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d={paths[shape] ?? paths.oval} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M22 28h8M34 28h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}
