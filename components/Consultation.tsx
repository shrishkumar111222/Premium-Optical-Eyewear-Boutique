import Image from 'next/image';
import { Calendar, Check } from 'lucide-react';
import { consultationFeatures } from '@/config/content';
import { images } from '@/config/images';
import { business } from '@/config/business';
import SectionHeading from './SectionHeading';
import MaskReveal from './MaskReveal';
import ConsultationForm from './ConsultationForm';
import Reveal from './Reveal';

/** Personalized consultation: the pitch, then the booking form. */
export default function Consultation() {
  return (
    <section id="consultation" className="relative isolate overflow-hidden bg-ink py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 -z-10 opacity-[0.14]">
        <Image
          src={images.consultation}
          alt=""
          aria-hidden="true"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/90 to-ink" />

      <div className="container-luxe">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Personalized Consultation"
              tone="light"
              title={
                <>
                  Your Face. Your Vision.
                  <span className="block italic text-gold-light">Your Frame.</span>
                </>
              }
              subtitle="Get personalized guidance to find eyewear that fits your style, comfort, and vision needs."
            />

            <ul className="mt-10 space-y-5">
              {consultationFeatures.map((feature, index) => (
                <Reveal as="li" key={feature.title} delay={index * 0.06}>
                  <div className="flex gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40">
                      <Check className="h-3 w-3 text-gold" strokeWidth={2.2} />
                    </span>
                    <div>
                      <h3 className="text-sm font-medium uppercase tracking-wide2 text-paper">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-paper/55">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-paper/10 pt-8">
                <Stat value={business.stats.yearsExperience} label="Years of fitting eyewear" />
                <Stat value={business.stats.framesInStore} label="Frames on the wall" />
                <Stat value={business.stats.customersServed} label="Customers served" />
              </div>
            </Reveal>
          </div>

          <MaskReveal>
            <div className="mb-6 flex items-center gap-3 text-paper">
              <Calendar className="h-5 w-5 text-gold" strokeWidth={1.4} />
              <h3 className="font-display text-2xl font-light">Book Eye Consultation</h3>
            </div>
            <ConsultationForm />
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-light text-gold-light">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wide2 text-paper/60">{label}</p>
    </div>
  );
}
