import Image from 'next/image';
import { ArrowRight, Sun } from 'lucide-react';
import { sunglassCategories } from '@/config/collections';
import { images } from '@/config/images';
import { whatsappLink, whatsappMessages } from '@/config/business';
import SectionHeading from './SectionHeading';
import MaskReveal from './MaskReveal';
import EyewearGrid from './EyewearGrid';
import Reveal from './Reveal';

/** High-fashion sunglasses section on full black. */
export default function SunglassesSection() {
  return (
    <section id="sunglasses" className="relative overflow-hidden bg-ink py-20 sm:py-28 lg:py-32">
      {/* Single restrained gold wash. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[140px]"
      />

      <div className="container-luxe relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Designer Sunglasses"
              tone="light"
              title={
                <>
                  Light, shaped
                  <span className="block italic text-gold-light">to your advantage</span>
                </>
              }
              subtitle="Polarized drivers, gradient classics and oversized statements — selected for the way they sit against real faces, not mannequins."
            />
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink(whatsappMessages.sunglasses)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Explore Sunglasses
                  <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                </a>
                <a href="#frame-finder" className="btn-outline-light">
                  <Sun className="h-4 w-4" strokeWidth={1.6} />
                  Find My Shape
                </a>
              </div>
            </Reveal>
          </div>

          <MaskReveal className="relative aspect-[7/5] overflow-hidden">
            <Image
              src={images.category.sunglasses}
              alt="Gold-rimmed aviator sunglasses lit against a black studio backdrop"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1600ms] ease-luxe hover:scale-105"
            />
          </MaskReveal>
        </div>

        <EyewearGrid items={sunglassCategories} tone="light" className="mt-14" columns={4} />
      </div>
    </section>
  );
}
