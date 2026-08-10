import {
  Award,
  Eye,
  Gem,
  Headphones,
  LayoutGrid,
  Ruler,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { whyChooseUs } from '@/config/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const icons = [Eye, Gem, Ruler, ShieldCheck, Sparkles, Headphones, LayoutGrid, Award];

/** Trust grid with elegant line icons. */
export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-paper-warm py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Why Choose Us"
          align="center"
          title="The difference is in the fitting"
          subtitle="Anyone can sell you a frame. The value is in choosing the right one and making it sit properly."
        />

        <ul className="mt-14 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal as="li" key={item.title} delay={index * 0.05}>
                <div className="group flex h-full flex-col bg-paper-warm p-7 transition-colors duration-500 hover:bg-paper">
                  <Icon
                    className="h-6 w-6 text-gold transition-transform duration-700 ease-luxe group-hover:scale-110"
                    strokeWidth={1.1}
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 font-display text-lg font-normal text-ink">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
