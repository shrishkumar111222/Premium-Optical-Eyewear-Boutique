/**
 * DEMO PRODUCT DATA — replaceable sample content.
 *
 * Prices are placeholders written as "from" figures, not live inventory.
 * Swap this array for the store's real catalogue (or a CMS feed) when going live.
 */

import { asset } from '@/lib/asset';

export type FrameCategory =
  | 'New Arrivals'
  | 'Signature Frames'
  | 'Minimal Frames'
  | 'Statement Frames'
  | 'Classic Frames'
  | 'Contemporary Frames';

export type Audience = 'men' | 'women' | 'kids' | 'unisex';

export type StylePreference = 'classic' | 'minimal' | 'bold' | 'luxury';

export type ProductKind = 'eyeglasses' | 'sunglasses';

export interface Product {
  id: string;
  name: string;
  /** e.g. "Aviator · Metal" — shown under the product name. */
  frameType: string;
  shape: string;
  material: string;
  colors: string[];
  /** Placeholder price in the configured currency. */
  price: number;
  image: string;
  category: FrameCategory;
  kind: ProductKind;
  audience: Audience[];
  style: StylePreference[];
  /** Face shapes this silhouette tends to flatter — style guidance, not advice. */
  suitsFaceShapes: string[];
  prescriptionReady: boolean;
  lensNote: string;
  description: string;
}

const productCatalogue: Product[] = [
  {
    id: 'aviator-gold',
    name: 'Aurum Aviator',
    frameType: 'Aviator · Metal',
    shape: 'Aviator',
    material: 'Lightweight Metal Alloy',
    colors: ['Champagne Gold', 'Gunmetal', 'Matte Black'],
    price: 8900,
    image: '/images/product-aviator-gold.svg',
    category: 'New Arrivals',
    kind: 'sunglasses',
    audience: ['men', 'women', 'unisex'],
    style: ['classic', 'luxury'],
    suitsFaceShapes: ['square', 'heart', 'oblong'],
    prescriptionReady: true,
    lensNote: 'Available with polarized or gradient tinted lenses.',
    description:
      'A double-bridge aviator with a hand-finished wire rim and softly tapered teardrop lenses.',
  },
  {
    id: 'wayfarer-onyx',
    name: 'Onyx Wayfarer',
    frameType: 'Wayfarer · Acetate',
    shape: 'Wayfarer',
    material: 'Italian Acetate',
    colors: ['Gloss Black', 'Tortoise', 'Deep Navy'],
    price: 7400,
    image: '/images/product-wayfarer-onyx.svg',
    category: 'Classic Frames',
    kind: 'sunglasses',
    audience: ['men', 'unisex'],
    style: ['classic', 'bold'],
    suitsFaceShapes: ['oval', 'round', 'diamond'],
    prescriptionReady: true,
    lensNote: 'Compatible with prescription sun lenses.',
    description:
      'The archetypal silhouette, cut from dense acetate with a subtly beveled brow line.',
  },
  {
    id: 'round-titanium',
    name: 'Meridian Round',
    frameType: 'Round · Titanium',
    shape: 'Round',
    material: 'Beta Titanium',
    colors: ['Brushed Silver', 'Ink Black', 'Warm Bronze'],
    price: 11200,
    image: '/images/product-round-titanium.svg',
    category: 'Minimal Frames',
    kind: 'eyeglasses',
    audience: ['men', 'women', 'unisex'],
    style: ['minimal', 'luxury'],
    suitsFaceShapes: ['square', 'heart', 'diamond'],
    prescriptionReady: true,
    lensNote: 'Well suited to single vision and progressive lenses.',
    description:
      'Feather-light titanium wire drawn into a perfect circle, with adjustable nose pads.',
  },
  {
    id: 'cateye-amber',
    name: 'Amber Cat-Eye',
    frameType: 'Cat-Eye · Acetate',
    shape: 'Cat-Eye',
    material: 'Hand-Polished Acetate',
    colors: ['Honey Amber', 'Ivory', 'Black'],
    price: 8600,
    image: '/images/product-cateye-amber.svg',
    category: 'Statement Frames',
    kind: 'eyeglasses',
    audience: ['women'],
    style: ['bold', 'luxury'],
    suitsFaceShapes: ['round', 'oval', 'diamond'],
    prescriptionReady: true,
    lensNote: 'Deep enough for progressive lenses.',
    description:
      'An upswept brow with a sculpted temple flare — quietly dramatic, never loud.',
  },
  {
    id: 'square-matte',
    name: 'Atlas Square',
    frameType: 'Square · Acetate',
    shape: 'Square',
    material: 'Matte Acetate',
    colors: ['Matte Charcoal', 'Espresso', 'Slate'],
    price: 6900,
    image: '/images/product-square-matte.svg',
    category: 'Contemporary Frames',
    kind: 'eyeglasses',
    audience: ['men', 'unisex'],
    style: ['bold', 'classic'],
    suitsFaceShapes: ['round', 'oval', 'heart'],
    prescriptionReady: true,
    lensNote: 'A popular choice for blue-light filtering lenses.',
    description:
      'Clean right angles softened at the corners, balanced for everyday wear at a desk.',
  },
  {
    id: 'rimless-air',
    name: 'Aer Rimless',
    frameType: 'Rimless · Titanium',
    shape: 'Rimless',
    material: 'Titanium & Nylon Thread',
    colors: ['Silver', 'Rose Gold', 'Graphite'],
    price: 12800,
    image: '/images/product-rimless-air.svg',
    category: 'Minimal Frames',
    kind: 'eyeglasses',
    audience: ['men', 'women', 'unisex'],
    style: ['minimal', 'luxury'],
    suitsFaceShapes: ['oval', 'square', 'oblong'],
    prescriptionReady: true,
    lensNote: 'Lens edges are shaped individually for rimless mounting.',
    description:
      'Almost nothing on the face — a mounted lens, a titanium bridge and a whisper of a temple.',
  },
  {
    id: 'oversized-noir',
    name: 'Noir Oversized',
    frameType: 'Oversized · Acetate',
    shape: 'Oversized',
    material: 'Italian Acetate',
    colors: ['Jet Black', 'Smoke Grey', 'Cocoa'],
    price: 9600,
    image: '/images/product-oversized-noir.svg',
    category: 'Statement Frames',
    kind: 'sunglasses',
    audience: ['women'],
    style: ['bold', 'luxury'],
    suitsFaceShapes: ['heart', 'oval', 'diamond'],
    prescriptionReady: true,
    lensNote: 'Available with gradient or solid tints.',
    description:
      'Generous coverage with a flat brow and a gold pin detail set into the temple.',
  },
  {
    id: 'browline-heritage',
    name: 'Heritage Browline',
    frameType: 'Browline · Combination',
    shape: 'Browline',
    material: 'Acetate Brow & Metal Rim',
    colors: ['Black / Silver', 'Tortoise / Gold', 'Navy / Gunmetal'],
    price: 8200,
    image: '/images/product-browline-heritage.svg',
    category: 'Classic Frames',
    kind: 'eyeglasses',
    audience: ['men', 'unisex'],
    style: ['classic', 'bold'],
    suitsFaceShapes: ['round', 'oval', 'diamond'],
    prescriptionReady: true,
    lensNote: 'A strong brow line pairs well with anti-reflective coatings.',
    description:
      'A mid-century profile: a weighted acetate brow above a fine metal under-rim.',
  },
  {
    id: 'panto-atelier',
    name: 'Atelier Panto',
    frameType: 'Panto · Acetate',
    shape: 'Panto',
    material: 'Crystal Acetate',
    colors: ['Crystal Clear', 'Sage', 'Rosewood'],
    price: 7800,
    image: '/images/product-panto-atelier.svg',
    category: 'Signature Frames',
    kind: 'eyeglasses',
    audience: ['women', 'unisex'],
    style: ['minimal', 'classic'],
    suitsFaceShapes: ['square', 'heart', 'oblong'],
    prescriptionReady: true,
    lensNote: 'Depth suits both single vision and progressive lenses.',
    description:
      'A gently rounded keyhole-bridge panto, polished by hand to a soft translucency.',
  },
  {
    id: 'geometric-edge',
    name: 'Edge Geometric',
    frameType: 'Geometric · Metal',
    shape: 'Geometric',
    material: 'Stainless Steel',
    colors: ['Polished Steel', 'Black Chrome', 'Antique Gold'],
    price: 10400,
    image: '/images/product-geometric-edge.svg',
    category: 'Contemporary Frames',
    kind: 'eyeglasses',
    audience: ['men', 'women', 'unisex'],
    style: ['bold', 'minimal'],
    suitsFaceShapes: ['round', 'oval'],
    prescriptionReady: true,
    lensNote: 'Angular rims are best paired with thinner high-index lenses.',
    description:
      'Faceted hexagonal rims in fine steel wire — architectural without being severe.',
  },
  {
    id: 'sport-velocity',
    name: 'Velocity Sport',
    frameType: 'Sport Wrap · TR90',
    shape: 'Sport',
    material: 'TR90 Thermoplastic',
    colors: ['Matte Black', 'Storm Blue', 'Olive'],
    price: 6400,
    image: '/images/product-sport-velocity.svg',
    category: 'Contemporary Frames',
    kind: 'sunglasses',
    audience: ['men', 'unisex'],
    style: ['bold'],
    suitsFaceShapes: ['oval', 'square', 'oblong'],
    prescriptionReady: false,
    lensNote: 'Usually fitted with polarized lenses for outdoor use.',
    description:
      'A wrapped shield with grippy temple tips, built to stay put through movement.',
  },
  {
    id: 'kids-flex',
    name: 'Junior Flex Round',
    frameType: 'Round · Flexible',
    shape: 'Round',
    material: 'Flexible TR90',
    colors: ['Sky Blue', 'Coral', 'Forest Green'],
    price: 3900,
    image: '/images/product-kids-flex.svg',
    category: 'New Arrivals',
    kind: 'eyeglasses',
    audience: ['kids'],
    style: ['minimal', 'classic'],
    suitsFaceShapes: ['round', 'oval', 'heart'],
    prescriptionReady: true,
    lensNote: 'Usually fitted with impact-resistant lens materials.',
    description:
      'A bendable frame with soft temple tips and an adjustable strap option for active days.',
  },
];

/** Image paths run through `asset()` so they survive a base-path deployment. */
export const products: Product[] = productCatalogue.map((product) => ({
  ...product,
  image: asset(product.image),
}));

export const frameCategories: FrameCategory[] = [
  'New Arrivals',
  'Signature Frames',
  'Minimal Frames',
  'Statement Frames',
  'Classic Frames',
  'Contemporary Frames',
];

/** Formats a placeholder price, e.g. ₹8,900. */
export function formatPrice(value: number, currency = '₹'): string {
  return `${currency}${value.toLocaleString('en-IN')}`;
}
