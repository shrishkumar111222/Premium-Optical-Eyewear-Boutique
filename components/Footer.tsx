import Link from 'next/link';
import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  addressLine,
  business,
  mailLink,
  telLink,
  whatsappLink,
  whatsappMessages,
} from '@/config/business';
import { navItems } from '@/config/navigation';
import Logo from './Logo';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-ink pt-20 text-paper">
      <div className="container-luxe">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.3fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/55">
              {business.shortDescription}
            </p>
            <div className="mt-7 flex gap-3">
              <SocialLink href={business.social.instagram} label="Instagram">
                <Instagram className="h-4 w-4" strokeWidth={1.4} />
              </SocialLink>
              <SocialLink href={business.social.facebook} label="Facebook">
                <Facebook className="h-4 w-4" strokeWidth={1.4} />
              </SocialLink>
              <SocialLink href={whatsappLink(whatsappMessages.general)} label="WhatsApp">
                <MessageCircle className="h-4 w-4" strokeWidth={1.4} />
              </SocialLink>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="text-[10px] uppercase tracking-wide2 text-gold">Explore</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {navItems
                .filter((item) => item.href !== '#top')
                .map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-paper/60 transition-colors duration-300 hover:text-gold"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[10px] uppercase tracking-wide2 text-gold">Visit &amp; Contact</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href={telLink} className="group flex items-start gap-3 text-paper/60 hover:text-gold">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.4} />
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(whatsappMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-paper/60 hover:text-gold"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.4} />
                  WhatsApp {business.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={mailLink} className="flex items-start gap-3 text-paper/60 hover:text-gold">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.4} />
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-paper/60 hover:text-gold"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.4} />
                  <span>{addressLine}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-paper/60">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.4} />
                <span>
                  {business.hours.map((slot) => (
                    <span key={slot.day} className="block">
                      {slot.day}: {slot.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/10 py-7 text-[11px] text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy/" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms/" className="transition-colors hover:text-gold">
              Terms
            </Link>
            <a href="#top" className="transition-colors hover:text-gold">
              Back to top
            </a>
          </div>
        </div>

        <p className="border-t border-paper/10 py-6 text-[11px] leading-relaxed text-paper/50">
          Demonstration website. {business.name} is a fictional boutique; the business details,
          statistics, testimonials, pricing and brand listings shown here are placeholder content
          for design purposes. Nothing on this page constitutes medical or optical advice.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center border border-paper/15 text-paper/70 transition-all duration-500 hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}
