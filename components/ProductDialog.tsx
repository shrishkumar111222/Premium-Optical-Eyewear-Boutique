'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, MessageCircle, Phone, X } from 'lucide-react';
import { business, telLink, whatsappLink, whatsappMessages } from '@/config/business';
import { formatPrice, type Product } from '@/config/products';

/** Full product detail sheet. Focus is trapped while open and Esc closes it. */
export default function ProductDialog({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-end justify-center bg-ink/80 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-dialog-title"
            onClick={(event) => event.stopPropagation()}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto bg-paper-warm shadow-2xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center bg-paper/90 text-ink/70 backdrop-blur-sm transition-colors hover:text-gold"
            >
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square bg-paper-soft">
                <Image
                  src={product.image}
                  alt={`${product.name} — ${product.frameType}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-9">
                <span className="eyebrow">{product.category}</span>
                <h2 id="product-dialog-title" className="heading-md mt-4">
                  {product.name}
                </h2>
                <p className="mt-2 text-[11px] uppercase tracking-wide2 text-ink/60">
                  {product.frameType}
                </p>

                <p className="body-lg mt-5">{product.description}</p>

                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-ink/10 py-6 text-sm">
                  <Spec label="Frame Shape" value={product.shape} />
                  <Spec label="Material" value={product.material} />
                  <Spec label="Colours" value={product.colors.join(' · ')} />
                  <Spec
                    label="Prescription"
                    value={product.prescriptionReady ? 'Compatible' : 'Non-prescription'}
                  />
                </dl>

                <p className="mt-5 flex items-start gap-2.5 text-sm text-ink/60">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                  {product.lensNote}
                </p>

                <div className="mt-7 flex items-baseline gap-2">
                  <span className="text-[10px] uppercase tracking-wide2 text-ink/55">From</span>
                  <span className="font-display text-3xl font-normal">
                    {formatPrice(product.price, business.currency)}
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-ink/60">
                  Indicative demo pricing. Final price depends on the lenses you choose.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappLink(whatsappMessages.product(product.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold flex-1"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
                    Ask on WhatsApp
                  </a>
                  <a href={telLink} className="btn-outline flex-1">
                    <Phone className="h-4 w-4" strokeWidth={1.6} />
                    Call Store
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wide2 text-ink/55">{label}</dt>
      <dd className="mt-1.5 text-ink/80">{value}</dd>
    </div>
  );
}
