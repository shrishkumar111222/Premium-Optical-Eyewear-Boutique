'use client';

import { Calendar, Glasses, MessageCircle, Phone } from 'lucide-react';
import { telLink, whatsappLink, whatsappMessages } from '@/config/business';

const actions = [
  { label: 'Collection', href: '#collection', Icon: Glasses, external: false },
  { label: 'Book', href: '#consultation', Icon: Calendar, external: false },
  {
    label: 'WhatsApp',
    href: whatsappLink(whatsappMessages.general),
    Icon: MessageCircle,
    external: true,
  },
  { label: 'Call', href: telLink, Icon: Phone, external: false },
];

/** Sticky four-action bar, phones and small tablets only. */
export default function MobileCta() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-[56] border-t border-paper/10 bg-ink/95 backdrop-blur-lg lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-4">
        {actions.map(({ label, href, Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="flex min-h-[64px] flex-col items-center justify-center gap-1.5 px-1 py-2.5 text-paper/75 transition-colors duration-300 active:text-gold"
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.4} aria-hidden="true" />
              <span className="text-[9px] uppercase tracking-wide2">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
