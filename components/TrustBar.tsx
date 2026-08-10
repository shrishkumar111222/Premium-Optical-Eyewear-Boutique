import { Award, Eye, Glasses, Ruler, ShieldCheck } from 'lucide-react';
import { trustPoints } from '@/config/content';
import Reveal from './Reveal';

const icons = [Glasses, Eye, Ruler, Award, ShieldCheck];

/** Minimal strip directly beneath the hero. */
export default function TrustBar() {
  return (
    <section aria-label="Why customers choose us" className="border-b border-ink/10 bg-paper">
      <div className="container-luxe">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-7 py-9 sm:grid-cols-3 lg:grid-cols-5 lg:py-10">
          {trustPoints.map((point, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal as="li" key={point} delay={index * 0.06} className="flex items-center gap-3">
                <Icon className="h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.3} aria-hidden="true" />
                <span className="text-[10px] uppercase leading-tight tracking-wide2 text-ink/70 sm:text-[11px]">
                  {point}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
