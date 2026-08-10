'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, MessageCircle, RotateCcw } from 'lucide-react';
import { business, whatsappLink, whatsappMessages } from '@/config/business';
import { formatPrice, products, type Product, type StylePreference } from '@/config/products';
import { faceShapes } from '@/config/content';
import { cn } from '@/lib/utils';
import SectionHeading from './SectionHeading';

type Preference = 'eyeglasses' | 'sunglasses' | 'both';

const styles: Array<{ id: StylePreference; label: string; note: string }> = [
  { id: 'classic', label: 'Classic', note: 'Shapes that never date' },
  { id: 'minimal', label: 'Minimal', note: 'Fine rims, quiet detail' },
  { id: 'bold', label: 'Bold', note: 'Presence and contrast' },
  { id: 'luxury', label: 'Luxury', note: 'Precious materials' },
];

const preferences: Array<{ id: Preference; label: string }> = [
  { id: 'eyeglasses', label: 'Eyeglasses' },
  { id: 'sunglasses', label: 'Sunglasses' },
  { id: 'both', label: 'Both' },
];

/**
 * Three-step frame recommendation. Runs entirely in the browser against the
 * demo catalogue — no backend, no data leaves the page.
 */
export default function FrameFinder() {
  const [step, setStep] = useState(0);
  const [face, setFace] = useState<string | null>(null);
  const [style, setStyle] = useState<StylePreference | null>(null);
  const [preference, setPreference] = useState<Preference | null>(null);

  const results = useMemo(() => {
    if (!face || !style || !preference) return [];

    // Score every frame, then take the strongest four. Scoring rather than
    // filtering means the finder always has something to show.
    const scored = products
      .filter((product) => preference === 'both' || product.kind === preference)
      .map((product) => {
        let score = 0;
        if (product.suitsFaceShapes.includes(face)) score += 3;
        if (product.style.includes(style)) score += 2;
        if (product.audience.includes('unisex')) score += 0.5;
        return { product, score };
      })
      .sort((a, b) => b.score - a.score || a.product.price - b.product.price);

    return scored.slice(0, 4).map((entry) => entry.product);
  }, [face, style, preference]);

  const faceName = faceShapes.find((shape) => shape.id === face)?.name ?? '';
  const summary = [faceName && `${faceName} face`, style, preference]
    .filter(Boolean)
    .join(', ');

  const reset = () => {
    setStep(0);
    setFace(null);
    setStyle(null);
    setPreference(null);
  };

  const steps = ['Face Shape', 'Style', 'Preference'];

  return (
    <section id="frame-finder" className="bg-paper-warm py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Frame Finder"
          align="center"
          title="Three questions. A shortlist to start from."
          subtitle="A quick demo of how we narrow things down in store — the real version happens with frames on your face."
        />

        <div className="mx-auto mt-14 max-w-4xl border border-ink/10 bg-paper">
          {/* Progress */}
          <ol className="grid grid-cols-3 border-b border-ink/10">
            {steps.map((label, index) => {
              const done = index < step || (index === 2 && preference !== null);
              const current = index === step;
              return (
                <li key={label} className="relative">
                  <button
                    type="button"
                    onClick={() => setStep(index)}
                    className={cn(
                      'flex w-full items-center justify-center gap-2.5 px-3 py-4 text-[10px] uppercase tracking-wide2 transition-colors duration-400',
                      current ? 'text-ink' : done ? 'text-ink/60' : 'text-ink/60'
                    )}
                    aria-current={current ? 'step' : undefined}
                  >
                    <span
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full border text-[10px]',
                        current
                          ? 'border-gold bg-gold text-ink'
                          : done
                            ? 'border-ink/40 text-ink/60'
                            : 'border-ink/20 text-ink/60'
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                  {current && (
                    <motion.span
                      layoutId="finder-underline"
                      className="absolute inset-x-0 bottom-0 h-px bg-gold"
                    />
                  )}
                </li>
              );
            })}
          </ol>

          <div className="p-6 sm:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 0 && (
                  <Options
                    legend="Which outline is closest to your face?"
                    options={faceShapes.map((shape) => ({
                      id: shape.id,
                      label: shape.name,
                      note: shape.summary,
                    }))}
                    selected={face}
                    onSelect={(id) => {
                      setFace(id);
                      setStep(1);
                    }}
                    columns={3}
                  />
                )}

                {step === 1 && (
                  <Options
                    legend="Which direction appeals to you?"
                    options={styles.map((item) => ({ id: item.id, label: item.label, note: item.note }))}
                    selected={style}
                    onSelect={(id) => {
                      setStyle(id as StylePreference);
                      setStep(2);
                    }}
                    columns={2}
                  />
                )}

                {step === 2 && (
                  <Options
                    legend="What are you looking for today?"
                    options={preferences.map((item) => ({ id: item.id, label: item.label }))}
                    selected={preference}
                    onSelect={(id) => setPreference(id as Preference)}
                    columns={3}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Results */}
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-ink/10 bg-paper-soft"
              >
                <div className="p-6 sm:p-9">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="heading-md">Recommended Styles</h3>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wide2 text-ink/60 transition-colors hover:text-gold"
                    >
                      <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.6} />
                      Start over
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-ink/55">Based on: {summary}</p>

                  <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {results.map((product, index) => (
                      <motion.li
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="group border border-ink/10 bg-paper"
                      >
                        <div className="relative aspect-square overflow-hidden bg-paper-soft">
                          <Image
                            src={product.image}
                            alt={`${product.name} — ${product.frameType}`}
                            fill
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, 25vw"
                            className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-display text-base text-ink">{product.name}</h4>
                          <p className="mt-1 text-[10px] uppercase tracking-wide2 text-ink/60">
                            {product.shape}
                          </p>
                          <p className="mt-3 text-sm text-ink/70">
                            {formatPrice(product.price, business.currency)}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={whatsappLink(whatsappMessages.frameFinder(summary))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
                      Send My Results
                    </a>
                    <a href="#consultation" className="btn-outline">
                      Book a Consultation
                      <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                    </a>
                  </div>

                  <p className="mt-6 text-xs text-ink/60">
                    Demo recommendations drawn from the sample catalogue. Nothing is submitted or
                    stored.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Options({
  legend,
  options,
  selected,
  onSelect,
  columns,
}: {
  legend: string;
  options: Array<{ id: string; label: string; note?: string }>;
  selected: string | null;
  onSelect: (id: string) => void;
  columns: 2 | 3;
}) {
  return (
    <fieldset>
      <legend className="font-display text-xl font-light text-ink sm:text-2xl">{legend}</legend>
      <div
        className={cn(
          'mt-6 grid gap-3',
          columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
        )}
      >
        {options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
              className={cn(
                'group min-h-[76px] border p-4 text-left transition-all duration-400 ease-luxe',
                isSelected
                  ? 'border-gold bg-ink text-paper'
                  : 'border-ink/15 bg-paper hover:border-ink/40 hover:bg-paper-soft'
              )}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium capitalize">{option.label}</span>
                {isSelected && <span className="text-[9px] uppercase tracking-wide2 text-gold-light">Selected</span>}
              </span>
              {option.note && (
                <span
                  className={cn(
                    'mt-1.5 block text-xs leading-relaxed',
                    isSelected ? 'text-paper/60' : 'text-ink/60'
                  )}
                >
                  {option.note}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
