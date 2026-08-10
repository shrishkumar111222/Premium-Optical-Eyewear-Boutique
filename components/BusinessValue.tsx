import { Check, X } from 'lucide-react';
import { businessValue } from '@/config/content';
import { demoCta } from '@/config/business';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import DemoCta from './DemoCta';

/**
 * Written for the business owner evaluating this demo, not the retail customer.
 * Set `demoCta.enabled = false` in config/business.ts to remove it entirely
 * when handing the site over to a client.
 */
export default function BusinessValue() {
  if (!demoCta.enabled) return null;

  return (
    <section id="business-value" className="border-y border-ink/10 bg-paper-soft py-20 sm:py-28">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="For Optical Store Owners"
          align="center"
          title="From Local Optical Store to Premium Eyewear Brand"
          subtitle="What changes when your storefront has a digital equal."
        />

        <div className="mt-14 grid gap-px bg-ink/10 lg:grid-cols-2">
          <Reveal className="bg-paper-warm p-8 sm:p-10">
            <h3 className="text-[10px] uppercase tracking-wide2 text-ink/55">
              Without a professional website
            </h3>
            <ul className="mt-7 space-y-4">
              {businessValue.without.map((item) => (
                <li key={item} className="flex items-start gap-3.5 text-sm text-ink/55">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-ink/25" strokeWidth={1.6} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="bg-ink p-8 sm:p-10">
            <h3 className="text-[10px] uppercase tracking-wide2 text-gold">With this website</h3>
            <ul className="mt-7 space-y-4">
              {businessValue.with.map((item) => (
                <li key={item} className="flex items-start gap-3.5 text-sm text-paper/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.8} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <DemoCta className="mt-12" />
      </div>
    </section>
  );
}
