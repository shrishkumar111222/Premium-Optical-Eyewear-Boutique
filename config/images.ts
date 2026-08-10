import { asset } from '@/lib/asset';

/**
 * Every image slot on the site, in one place.
 *
 * The demo ships with generated vector artwork (see scripts/generate-images.mjs)
 * so there are no external dependencies and nothing can 404. To use real
 * photography, drop the files into /public/images and change the paths below —
 * no component edits required.
 *
 * Paths run through `asset()` so they keep working when the site is deployed
 * under a base path (GitHub Pages project sites).
 */
export const images = {
  hero: asset('/images/hero.svg'),
  /** Portrait crop used below the `sm` breakpoint. */
  heroPortrait: asset('/images/hero-portrait.svg'),
  ogCover: asset('/images/og-cover.svg'),
  finalCta: asset('/images/final-cta.svg'),

  category: {
    eyeglasses: asset('/images/category-eyeglasses.svg'),
    sunglasses: asset('/images/category-sunglasses.svg'),
    men: asset('/images/category-men.svg'),
    women: asset('/images/category-women.svg'),
    kids: asset('/images/category-kids.svg'),
    lenses: asset('/images/category-lenses.svg'),
  },

  consultation: asset('/images/store-consultation.svg'),
} as const;
