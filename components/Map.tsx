import { MapPin, Navigation } from 'lucide-react';
import { addressLine, business, whatsappLink, whatsappMessages } from '@/config/business';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/**
 * Map section. Both the embed URL and the address come from config/business.ts —
 * replace them with the store's real Google Maps links before publishing.
 */
export default function Map() {
  return (
    <section id="map" className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Find Us"
          title="Visit Our Boutique"
          subtitle="Street parking on Boulevard Lane, and a short walk from the metro exit."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal className="relative aspect-[16/11] overflow-hidden border border-ink/10 bg-paper-soft lg:aspect-auto lg:min-h-[440px]">
            <iframe
              src={business.googleMapsEmbedUrl}
              title={`Map showing the location of ${business.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full grayscale transition-all duration-700 hover:grayscale-0"
            />
          </Reveal>

          <div>
            <Reveal>
              <div className="border border-ink/10 p-7">
                <span className="flex items-center gap-3 text-gold-ink">
                  <MapPin className="h-5 w-5" strokeWidth={1.2} aria-hidden="true" />
                  <span className="text-[10px] uppercase tracking-wide2">Store Address</span>
                </span>
                <address className="mt-5 not-italic text-base leading-relaxed text-ink/80">
                  {addressLine}
                  <br />
                  {business.address.state}, {business.address.country}
                </address>

                <h3 className="mt-8 text-[10px] uppercase tracking-wide2 text-ink/55">
                  Nearby Landmarks
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {business.nearbyLandmarks.map((landmark) => (
                    <li key={landmark} className="flex items-start gap-3 text-sm text-ink/65">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {landmark}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={business.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    <Navigation className="h-4 w-4" strokeWidth={1.6} />
                    Visit Our Store
                  </a>
                  <a
                    href={whatsappLink(whatsappMessages.visit)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full"
                  >
                    Ask for Directions
                  </a>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-ink/55">
                  Demo location. Replace the address and Google Maps links in
                  <code className="mx-1 bg-paper-soft px-1.5 py-0.5 text-[11px]">config/business.ts</code>
                  with the store&apos;s real details.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
