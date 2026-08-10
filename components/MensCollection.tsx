import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { mensCollection } from '@/config/collections';
import { images } from '@/config/images';
import { whatsappLink, whatsappMessages } from '@/config/business';
import SectionHeading from './SectionHeading';
import MaskReveal from './MaskReveal';
import Reveal from './Reveal';

/** Men's eyewear — sober, structured, charcoal. */
export default function MensCollection() {
  return (
    <section id="men" className="bg-ink-charcoal py-20 sm:py-28 lg:py-32">
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <MaskReveal className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={images.category.men}
            alt="Matte charcoal square frames from the men's collection"
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-[1600ms] ease-luxe hover:scale-105"
          />
          <span className="absolute bottom-5 left-5 bg-ink/70 px-4 py-2 text-[10px] uppercase tracking-wide2 text-paper/80 backdrop-blur-sm">
            Men&apos;s Eyewear
          </span>
        </MaskReveal>

        <div>
          <SectionHeading
            eyebrow="Men's Collection"
            tone="light"
            title="Defined by Detail"
            subtitle="Weighted acetate, brushed titanium and clean geometry — frames that hold their line from the first meeting to the last."
          />

          <ul className="mt-10 divide-y divide-paper/10 border-y border-paper/10">
            {mensCollection.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.06}>
                <div className="group flex items-baseline gap-5 py-5">
                  <span className="text-[10px] tracking-luxe text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-normal text-paper transition-colors duration-500 group-hover:text-gold">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-paper/55">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <a
              href={whatsappLink(whatsappMessages.men)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light mt-9"
            >
              Explore Men&apos;s Eyewear
              <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
