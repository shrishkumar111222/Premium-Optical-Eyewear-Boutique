import { ArrowRight } from 'lucide-react';
import { demoCta, whatsappLink } from '@/config/business';
import { cn } from '@/lib/utils';
import Reveal from './Reveal';

/**
 * Subtle agency CTA. Deliberately quiet so it never competes with the
 * boutique's own brand. Disable it in config/business.ts (`demoCta.enabled`).
 */
export default function DemoCta({ className }: { className?: string }) {
  if (!demoCta.enabled) return null;

  return (
    <Reveal className={className}>
      <div className="flex flex-col items-center justify-between gap-5 border border-ink/10 bg-paper-warm px-7 py-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-[10px] uppercase tracking-wide2 text-gold-ink">Free demo website</p>
          <p className="mt-2 font-display text-xl font-light text-ink">{demoCta.question}</p>
        </div>
        <a
          href={whatsappLink(demoCta.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline shrink-0"
        >
          {demoCta.buttonLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
        </a>
      </div>
    </Reveal>
  );
}
