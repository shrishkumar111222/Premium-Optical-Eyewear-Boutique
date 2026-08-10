'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { business, whatsappLink, whatsappMessages } from '@/config/business';
import { formatPrice, type Product } from '@/config/products';
import { toggleSaved } from '@/lib/wishlist';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  /** Cards above the fold in the first grid load eagerly. */
  priority?: boolean;
}

/** Editorial product card: slow image zoom, gold hairline and two clear actions. */
export default function ProductCard({ product, onViewDetails, priority }: ProductCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="card-surface group flex h-full flex-col border border-ink/10 hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.45)]">
      <div className="relative aspect-square overflow-hidden bg-paper-soft">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.frameType} in ${product.colors[0]}`}
          fill
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.07]"
        />

        <span className="absolute left-4 top-4 bg-paper/90 px-3 py-1.5 text-[9px] uppercase tracking-wide2 text-ink/70 backdrop-blur-sm">
          {product.category}
        </span>

        <button
          type="button"
          onClick={() => setSaved(toggleSaved(product.id))}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={cn(
            'absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-colors duration-300',
            saved ? 'bg-gold text-ink' : 'bg-paper/85 text-ink/60 hover:text-gold'
          )}
        >
          <Heart className="h-4 w-4" strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} />
        </button>

        {/* Gold hairline that draws in on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px w-0 bg-gold transition-all duration-700 ease-luxe group-hover:w-full"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-normal text-ink">{product.name}</h3>
        <p className="mt-1.5 text-[11px] uppercase tracking-wide2 text-ink/60">{product.frameType}</p>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wide2 text-ink/55">Colour</span>
          <span className="text-xs text-ink/70">{product.colors[0]}</span>
        </div>

        <div className="mt-5 flex items-baseline gap-2 border-t border-ink/10 pt-5">
          <span className="text-[10px] uppercase tracking-wide2 text-ink/55">From</span>
          <span className="font-display text-2xl font-normal text-ink">
            {formatPrice(product.price, business.currency)}
          </span>
        </div>

        {/* Stacked so neither label ever has to shrink or clip. */}
        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="btn-primary h-11 min-h-0 w-full"
          >
            View Details
          </button>
          <a
            href={whatsappLink(whatsappMessages.product(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline h-11 min-h-0 w-full px-4"
            aria-label={`Ask about ${product.name} on WhatsApp`}
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
