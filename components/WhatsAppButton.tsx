'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { whatsappLink, whatsappMessages } from '@/config/business';

/**
 * Floating WhatsApp button. Appears after the hero and sits above the mobile
 * CTA bar so the two never overlap.
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink(whatsappMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-[92px] right-4 z-[55] inline-flex h-14 w-14 items-center justify-center
                     rounded-full bg-[#25D366] text-white shadow-[0_14px_36px_-12px_rgba(37,211,102,0.85)]
                     transition-transform duration-500 ease-luxe hover:scale-105 sm:right-6 lg:bottom-6"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping"
            style={{ animationDuration: '3.2s' }}
          />
          <MessageCircle className="relative h-6 w-6" strokeWidth={1.6} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
