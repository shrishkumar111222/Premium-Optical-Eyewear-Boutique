import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { eyeglassCategories, eyeglassSpecs } from '@/config/collections';
import { images } from '@/config/images';
import { whatsappLink, whatsappMessages } from '@/config/business';
import SectionHeading from './SectionHeading';
import MaskReveal from './MaskReveal';
import EyewearGrid from './EyewearGrid';
import Reveal from './Reveal';

/** Premium prescription eyewear — editorial image beside a spec table. */
export default function EyeglassesSection() {
  return (
    <section id="eyeglasses" className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Premium Eyeglasses"
          title="Prescription eyewear, considered down to the millimetre"
          subtitle="Frames chosen for how they sit, how they feel and how they age — then fitted properly before you leave."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <MaskReveal className="relative aspect-[7/5] overflow-hidden bg-paper-soft">
            <Image
              src={images.category.eyeglasses}
              alt="Crystal acetate panto eyeglasses on a warm studio backdrop"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1600ms] ease-luxe hover:scale-105"
            />
          </MaskReveal>

          <div>
            <Reveal>
              <h3 className="heading-md">Every detail on the record</h3>
            </Reveal>
            <dl className="mt-7 divide-y divide-ink/10 border-y border-ink/10">
              {eyeglassSpecs.map((spec, index) => (
                <Reveal key={spec.label} delay={index * 0.05}>
                  <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                    <dt className="w-40 shrink-0 text-[10px] uppercase tracking-wide2 text-ink/55">
                      {spec.label}
                    </dt>
                    <dd className="text-sm text-ink/75">{spec.value}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={0.2}>
              <a
                href={whatsappLink(whatsappMessages.eyeglasses)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8"
              >
                Explore Eyeglasses
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
              </a>
            </Reveal>
          </div>
        </div>

        <EyewearGrid items={eyeglassCategories} className="mt-14" columns={4} />
      </div>
    </section>
  );
}
