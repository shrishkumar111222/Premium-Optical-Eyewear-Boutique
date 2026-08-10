import { Info, MessageCircle } from 'lucide-react';
import { lensOptions, lensDisclaimer } from '@/config/content';
import { whatsappLink, whatsappMessages } from '@/config/business';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/** Educational lens overview. Neutral descriptions only — no medical claims. */
export default function LensOptions() {
  return (
    <section id="lenses" className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Premium Lenses"
          title="The lens matters as much as the frame"
          subtitle="A plain-language guide to the options we stock, so the conversation at the counter starts somewhere useful."
        />

        <ul className="mt-14 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {lensOptions.map((lens, index) => (
            <Reveal as="li" key={lens.name} delay={index * 0.05}>
              <div className="group flex h-full flex-col bg-paper p-6 transition-colors duration-500 hover:bg-paper-warm sm:p-7">
                <span className="text-[10px] tracking-luxe text-gold-ink">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-xl font-normal text-ink">{lens.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{lens.description}</p>
                <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink/60">
                  <span className="text-[10px] uppercase tracking-wide2 text-ink/55">Best for </span>
                  {lens.bestFor}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center">
            <p className="flex max-w-2xl items-start gap-2.5 text-xs leading-relaxed text-ink/60">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              {lensDisclaimer}
            </p>
            <a
              href={whatsappLink(whatsappMessages.lenses)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary shrink-0"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
              Discuss Lens Options
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
