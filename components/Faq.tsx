'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '@/config/faq';
import { cn } from '@/lib/utils';
import SectionHeading from './SectionHeading';

/** Accordion FAQ. The same questions are emitted as FAQPage structured data. */
export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="container-luxe grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          eyebrow="Questions"
          title="Everything people ask before they visit"
          subtitle="Anything we have not covered — send a message and we will answer it properly."
        />

        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <li key={item.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-gold"
                  >
                    <span className="font-display text-lg font-normal leading-snug sm:text-xl">
                      {item.question}
                    </span>
                    <Plus
                      className={cn(
                        'mt-1 h-4 w-4 shrink-0 text-gold transition-transform duration-500 ease-luxe',
                        open && 'rotate-45'
                      )}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-ink/65">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
