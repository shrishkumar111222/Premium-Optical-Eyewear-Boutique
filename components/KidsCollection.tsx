import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { kidsCollection, kidsTrust } from '@/config/collections';
import { images } from '@/config/images';
import { whatsappLink, whatsappMessages } from '@/config/business';
import SectionHeading from './SectionHeading';
import MaskReveal from './MaskReveal';
import EyewearGrid from './EyewearGrid';
import Reveal from './Reveal';

/** Kids eyewear — premium and parent-facing, deliberately not childish. */
export default function KidsCollection() {
  return (
    <section id="kids" className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionHeading
            eyebrow="Kids Eyewear"
            title="Designed for Growing Eyes"
            subtitle="Frames proportioned for smaller faces, in flexible materials that survive a school bag — fitted with the same care as everything else on the wall."
          />
          <Reveal delay={0.12}>
            <a
              href={whatsappLink(whatsappMessages.kids)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline lg:justify-self-end"
            >
              Explore Kids Eyewear
              <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <MaskReveal className="relative aspect-[7/5] overflow-hidden bg-paper-soft">
            <Image
              src={images.category.kids}
              alt="Lightweight flexible round frames from the kids collection"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1600ms] ease-luxe hover:scale-105"
            />
          </MaskReveal>

          <div>
            <h3 className="heading-md">What parents ask us about</h3>
            <ul className="mt-7 grid gap-px bg-ink/10 sm:grid-cols-2">
              {kidsTrust.map((item, index) => (
                <Reveal as="li" key={item.title} delay={index * 0.06} className="bg-paper p-5">
                  <h4 className="text-[11px] uppercase tracking-wide2 text-gold-ink">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.description}</p>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-ink/60">
              We fit and adjust frames on the child in person. For anything concerning your
              child&apos;s vision, please consult a qualified eye care professional.
            </p>
          </div>
        </div>

        <EyewearGrid items={kidsCollection} className="mt-14" columns={3} />
      </div>
    </section>
  );
}
