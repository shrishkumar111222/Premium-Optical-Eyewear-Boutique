import { brands, brandDisclaimer } from '@/config/brands';
import { whatsappLink, whatsappMessages } from '@/config/business';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/**
 * Monochrome wordmark wall. Wordmarks are set in type rather than shipped as
 * logo files, so nothing here reproduces a protected brand asset.
 */
export default function BrandWall() {
  return (
    <section id="brands" className="border-y border-ink/10 bg-paper-warm py-20 sm:py-24">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Premium Brands"
          align="center"
          title="Names you already know"
          subtitle="Our wall changes with each season. Message us and we will tell you exactly which collections are in store today."
        />

        <ul className="mt-14 grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand, index) => (
            <Reveal as="li" key={brand.name} delay={index * 0.04}>
              <div className="group flex h-28 flex-col items-center justify-center gap-1.5 bg-paper-warm px-4 text-center transition-colors duration-500 hover:bg-ink sm:h-32">
                <span className="font-display text-lg font-normal tracking-wide2 text-ink/60 transition-colors duration-500 group-hover:text-gold sm:text-xl">
                  {brand.name}
                </span>
                <span className="text-[9px] uppercase tracking-wide2 text-transparent transition-colors duration-500 group-hover:text-paper/50">
                  {brand.note}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-ink/60">
            {brandDisclaimer}
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href={whatsappLink(whatsappMessages.brands)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Ask What&apos;s In Stock
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
