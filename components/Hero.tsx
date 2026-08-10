'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Glasses, MessageCircle } from 'lucide-react';
import { images } from '@/config/images';
import { whatsappLink, whatsappMessages } from '@/config/business';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Cinematic opener: slow image zoom, parallax drift, one gold light sweep. */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // MotionConfig turns off animations for reduced-motion visitors, but
  // scroll-linked values aren't animations — the parallax has to opt out here.
  const reduceMotion = useReducedMotion();
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '38%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduceMotion ? 1 : 0]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-ink pb-24 pt-32 sm:min-h-screen"
    >
      {/* Backdrop */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        {/* Art direction: the wide composition loses its subject on a phone,
            so narrow viewports get a portrait crop instead. */}
        <div className="relative h-[118%] w-full">
          <Image
            src={images.heroPortrait}
            alt="Premium gold aviator sunglasses lit against a dark studio backdrop"
            fill
            priority
            sizes="100vw"
            className="animate-slow-zoom object-cover sm:hidden"
          />
          <Image
            src={images.hero}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="hidden animate-slow-zoom object-cover sm:block"
          />
        </div>
        {/* Keeps the copy legible on the left while the frames stay visible on the right. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/45" />
        {/* On phones the frames sit directly behind the headline, so they get an extra scrim. */}
        <div className="absolute inset-0 bg-ink/35 sm:hidden" />
      </motion.div>

      {/* Gold light sweep */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-y-0 -left-1/3 w-1/3 animate-gold-sweep bg-gradient-to-r from-transparent via-gold/12 to-transparent blur-2xl" />
      </div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-luxe relative">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
            className="eyebrow eyebrow-light"
          >
            Premium Optical &amp; Eyewear Boutique
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.22, duration: 0.9, ease: EASE }}
            className="heading-xl mt-6 text-paper"
          >
            See the World
            <span className="block italic text-gold-light">in Style</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.36, duration: 0.9, ease: EASE }}
            className="mt-7 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg"
          >
            Discover premium eyewear designed to complement your vision, personality, and
            individual sense of style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <a href="#collection" className="btn-gold">
              <Glasses className="h-4 w-4" strokeWidth={1.6} />
              Explore Collection
            </a>
            <a href="#consultation" className="btn-outline-light">
              <Calendar className="h-4 w-4" strokeWidth={1.6} />
              Book Eye Consultation
            </a>
            <a
              href={whatsappLink(whatsappMessages.collection)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
              WhatsApp Inquiry
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1 }}
            className="mt-10 text-[11px] uppercase tracking-wide2 text-paper/60"
          >
            Premium Frames <span className="mx-2 text-gold">•</span> Expert Guidance
            <span className="mx-2 text-gold">•</span> Personalized Eyewear
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[9px] uppercase tracking-luxe text-paper/55">Scroll</span>
        <span className="relative block h-14 w-px overflow-hidden bg-paper/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-5 bg-gold"
            animate={{ y: ['-100%', '340%'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
