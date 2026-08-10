import { Quote, Star } from 'lucide-react';
import { testimonials, testimonialsDisclaimer } from '@/config/testimonials';
import { business } from '@/config/business';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/** Sample testimonials — clearly labelled as demo content. */
export default function Testimonials() {
  return (
    <section id="reviews" className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Customer Reviews"
            title="What people say after they leave"
            subtitle="The frames get the compliments. The fitting is what brings people back."
          />
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 border border-ink/10 px-6 py-4">
              <span className="font-display text-4xl font-light text-ink">
                {business.stats.googleRating}
              </span>
              <div>
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-1.5 text-[10px] uppercase tracking-wide2 text-ink/60">
                  {business.stats.googleReviewCount} reviews · placeholder
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal as="li" key={testimonial.name} delay={index * 0.06}>
              <figure className="flex h-full flex-col border border-ink/10 bg-paper-warm p-7 transition-all duration-700 ease-luxe hover:-translate-y-1 hover:border-gold/40">
                <Quote className="h-6 w-6 text-gold/50" strokeWidth={1.1} aria-hidden="true" />

                <div className="mt-5 flex gap-0.5" aria-label={`Rated ${testimonial.rating} out of 5`}>
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-3.5 w-3.5 fill-gold text-gold"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-ink/70">
                  “{testimonial.quote}”
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-4 border-t border-ink/10 pt-5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] tracking-wide2 text-paper"
                  >
                    {testimonial.initials}
                  </span>
                  {/* No truncation here: `whitespace-nowrap` would set the card's
                      min-content width and push the mobile layout wider than the viewport. */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">{testimonial.name}</p>
                    <p className="text-[10px] uppercase leading-relaxed tracking-wide2 text-ink/60">
                      {testimonial.location} · {testimonial.purchased}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <p className="mt-9 text-xs leading-relaxed text-ink/60">{testimonialsDisclaimer}</p>
      </div>
    </section>
  );
}
