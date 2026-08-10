/**
 * DEMO BRAND WALL — configurable placeholder content.
 *
 * ⚠️  IMPORTANT: listing a brand here is NOT a claim of authorized dealership,
 * partnership or current stock. Only display brands the business genuinely
 * carries, and only with whatever permission the brand requires. The
 * `disclaimer` below is rendered on the page and should stay unless the store
 * has confirmed its own arrangements.
 */
export interface Brand {
  name: string;
  /** Short descriptor shown on hover. */
  note: string;
}

export const brands: Brand[] = [
  { name: 'Ray-Ban', note: 'Icons & Aviators' },
  { name: 'Oakley', note: 'Performance Eyewear' },
  { name: 'Vogue Eyewear', note: 'Fashion Frames' },
  { name: 'Titan Eye+', note: 'Everyday Essentials' },
  { name: 'Carrera', note: 'Bold Silhouettes' },
  { name: 'Fossil', note: 'Modern Classics' },
  { name: 'Armani Exchange', note: 'Contemporary Design' },
  { name: 'Police', note: 'Statement Style' },
  { name: 'Polo Ralph Lauren', note: 'Heritage Tailoring' },
  { name: 'Tommy Hilfiger', note: 'Relaxed Luxury' },
];

export const brandDisclaimer =
  'Brand names are shown as configurable demo content. Availability varies — please contact the store to confirm which collections are currently stocked.';
