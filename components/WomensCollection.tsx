import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { womensCollection } from '@/config/collections';
import { images } from '@/config/images';
import { whatsappLink, whatsappMessages } from '@/config/business';
import SectionHeading from './SectionHeading';
import MaskReveal from './MaskReveal';
import Reveal from './Reveal';

/** Women's eyewear — warm editorial spread. */
export default function WomensCollection() {
  return (
    <section id="women" className="bg-paper-soft py-20 sm:py-28 lg:py-32">
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <SectionHeading
            eyebrow="Women's Collection"
            title="Designed to Be Noticed"
            subtitle="Upswept brows, gradient lenses and sculptural acetate — shapes with enough presence to become the thing people remember."
          />

          <div className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-2">
            {womensCollection.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="group h-full bg-paper-warm p-6 transition-colors duration-500 hover:bg-paper">
                  <h3 className="font-display text-lg font-normal transition-colors duration-500 group-hover:text-gold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <a
              href={whatsappLink(whatsappMessages.women)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-9"
            >
              Explore Women&apos;s Eyewear
              <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </a>
          </Reveal>
        </div>

        <MaskReveal className="relative order-1 aspect-[4/5] overflow-hidden lg:order-2">
          <Image
            src={images.category.women}
            alt="Honey amber cat-eye frames from the women's collection"
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-[1600ms] ease-luxe hover:scale-105"
          />
          <span className="absolute bottom-5 left-5 bg-paper/80 px-4 py-2 text-[10px] uppercase tracking-wide2 text-ink/70 backdrop-blur-sm">
            Women&apos;s Eyewear
          </span>
        </MaskReveal>
      </div>
    </section>
  );
}
