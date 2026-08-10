import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { styleStories } from '@/config/content';
import { whatsappLink, whatsappMessages } from '@/config/business';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/** Editorial style stories — the section that makes the site read like a magazine. */
export default function StyleStories() {
  return (
    <section id="stories" className="bg-paper-soft py-20 sm:py-28 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Style Stories"
          title="Frames, in the wild"
          subtitle="Short notes from the shop floor on how people arrive at the pair they end up wearing every day."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {styleStories.map((story, index) => (
            <Reveal as="article" key={story.title} delay={index * 0.08}>
              <a
                href={whatsappLink(whatsappMessages.frameHelp)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-paper">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 bg-paper/90 px-3 py-1.5 text-[9px] uppercase tracking-wide2 text-ink/70 backdrop-blur-sm">
                    {story.tag}
                  </span>
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-2xl font-light leading-snug text-ink transition-colors duration-500 group-hover:text-gold">
                      {story.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/60">
                      {story.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-ink/60 transition-all duration-500 ease-luxe group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold"
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
