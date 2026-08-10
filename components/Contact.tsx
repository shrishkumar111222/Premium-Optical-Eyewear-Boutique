import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  addressLine,
  business,
  mailLink,
  telLink,
  whatsappLink,
  whatsappMessages,
} from '@/config/business';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/** Contact details: phone, WhatsApp, address, hours, email. */
export default function Contact() {
  return (
    <section id="contact" className="bg-paper-warm py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Contact"
          title="Come and try them on"
          subtitle="Frames are hard to judge on a screen. Call ahead, message us, or simply walk in during opening hours."
        />

        <div className="mt-14 grid gap-px bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
          <ContactCard
            icon={<Phone className="h-5 w-5" strokeWidth={1.2} />}
            label="Phone"
            href={telLink}
            action="Call Now"
          >
            {business.phoneDisplay}
          </ContactCard>

          <ContactCard
            icon={<MessageCircle className="h-5 w-5" strokeWidth={1.2} />}
            label="WhatsApp"
            href={whatsappLink(whatsappMessages.general)}
            action="Send a Message"
            external
          >
            {business.whatsappDisplay}
          </ContactCard>

          <ContactCard
            icon={<Mail className="h-5 w-5" strokeWidth={1.2} />}
            label="Email"
            href={mailLink}
            action="Write to Us"
          >
            {business.email}
          </ContactCard>

          <ContactCard
            icon={<MapPin className="h-5 w-5" strokeWidth={1.2} />}
            label="Store Address"
            href={business.googleMapsUrl}
            action="Get Directions"
            external
            className="md:col-span-2 lg:col-span-1"
          >
            {addressLine}
          </ContactCard>

          <Reveal className="bg-paper-warm p-7 md:col-span-2">
            <span className="flex items-center gap-3 text-gold-ink">
              <Clock className="h-5 w-5" strokeWidth={1.2} aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-wide2">Opening Hours</span>
            </span>
            <dl className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
              {business.hours.map((slot) => (
                <div key={slot.day} className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-sm text-ink/70">{slot.day}</dt>
                  <dd className="text-sm text-ink">{slot.time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  href,
  action,
  children,
  external,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  action: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="group flex h-full flex-col justify-between gap-6 bg-paper-warm p-7 transition-colors duration-500 hover:bg-paper"
      >
        <div>
          <span className="flex items-center gap-3 text-gold-ink">
            {icon}
            <span className="text-[10px] uppercase tracking-wide2">{label}</span>
          </span>
          <p className="mt-5 text-base leading-relaxed text-ink/80 transition-colors duration-500 group-hover:text-ink">
            {children}
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-wide2 text-ink/55 transition-colors duration-500 group-hover:text-gold">
          {action} →
        </span>
      </a>
    </Reveal>
  );
}
