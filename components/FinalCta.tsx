import Image from 'next/image';
import { Calendar, Glasses, MapPin, MessageCircle } from 'lucide-react';
import { images } from '@/config/images';
import { business, whatsappLink, whatsappMessages } from '@/config/business';
import Reveal from './Reveal';

/** Dramatic closing statement over a full-width image. */
export default function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 sm:py-32 lg:py-40">
      <Image
        src={images.finalCta}
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        sizes="100vw"
        className="-z-10 object-cover opacity-45"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />

      <div className="container-luxe text-center">
        <Reveal>
          <span className="eyebrow eyebrow-light justify-center">{business.name}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="heading-xl mx-auto mt-7 max-w-4xl text-paper">
            Find the Frame That
            <span className="block italic text-gold-light">Defines You.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-paper/65 sm:text-lg">
            Explore premium eyewear, discover your perfect style, and experience personalized
            optical guidance.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-11 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
            <a href="#collection" className="btn-gold">
              <Glasses className="h-4 w-4" strokeWidth={1.6} />
              Explore Collection
            </a>
            <a href="#consultation" className="btn-outline-light">
              <Calendar className="h-4 w-4" strokeWidth={1.6} />
              Book Eye Consultation
            </a>
            <a
              href={whatsappLink(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
              WhatsApp Inquiry
            </a>
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.6} />
              Visit Store
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
