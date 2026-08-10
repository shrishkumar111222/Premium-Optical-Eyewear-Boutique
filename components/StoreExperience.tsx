'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { storeExperience } from '@/config/content';
import SectionHeading from './SectionHeading';

/**
 * Horizontally scrolling showroom gallery. Native scroll-snap does the work, so
 * it stays smooth on touch, keyboard and trackpad alike.
 */
export default function StoreExperience() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const amount = card ? card.clientWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  return (
    <section id="store" className="overflow-hidden bg-ink py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Store Experience"
            tone="light"
            title="Experience Eyewear Differently"
            subtitle="Proper lighting, honest mirrors and enough space to take your time. The showroom is built around trying things on."
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll gallery left"
              className="inline-flex h-12 w-12 items-center justify-center border border-paper/20 text-paper transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll gallery right"
              className="inline-flex h-12 w-12 items-center justify-center border border-paper/20 text-paper transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Showroom gallery — scroll horizontally"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12"
      >
        {storeExperience.map((item, index) => (
          <li
            key={item.title}
            className="group w-[85vw] shrink-0 snap-start sm:w-[58vw] lg:w-[38vw] xl:w-[30vw]"
          >
            <div className="relative aspect-[8/5] overflow-hidden bg-ink-soft">
              <Image
                src={item.image}
                alt={item.title}
                fill
                loading={index < 2 ? 'eager' : 'lazy'}
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 58vw, 32vw"
                className="object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-40"
              />
              <span className="absolute left-5 top-5 text-[10px] tracking-luxe text-gold">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl font-normal text-paper">{item.title}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/55">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
