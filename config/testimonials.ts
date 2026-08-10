/**
 * ⚠️  SAMPLE TESTIMONIALS — NOT REAL CUSTOMER REVIEWS.
 *
 * These are illustrative placeholders written for the demo. They are labelled
 * as sample content in the UI. Replace them with genuine, permissioned reviews
 * before publishing, and never present unverified text as a real review.
 */
export interface Testimonial {
  name: string;
  location: string;
  purchased: string;
  rating: number;
  quote: string;
  /** Initials are used in place of a photo; add `image` to show a real one. */
  initials: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Ananya R.',
    location: 'Indiranagar',
    purchased: 'Amber Cat-Eye · Prescription',
    rating: 5,
    initials: 'AR',
    quote:
      'I went in expecting to browse for ten minutes and left an hour later with a frame I would never have picked myself. The guidance made the difference.',
  },
  {
    name: 'Rohit M.',
    location: 'Koramangala',
    purchased: 'Heritage Browline',
    rating: 5,
    initials: 'RM',
    quote:
      'They measured properly, explained the lens choices in plain language, and adjusted the fit twice until it sat right. Nothing was rushed.',
  },
  {
    name: 'Sara K.',
    location: 'Whitefield',
    purchased: 'Aurum Aviator · Polarized',
    rating: 5,
    initials: 'SK',
    quote:
      'The showroom feels like a boutique rather than a shop. I tried maybe fifteen pairs and never once felt hurried into a decision.',
  },
  {
    name: 'Vikram S.',
    location: 'Jayanagar',
    purchased: 'Meridian Round · Progressive',
    rating: 5,
    initials: 'VS',
    quote:
      'My first pair of progressives. They talked me through what to expect during the adjustment period instead of just handing over a box.',
  },
  {
    name: 'Meera D.',
    location: 'HSR Layout',
    purchased: 'Junior Flex Round (for her son)',
    rating: 5,
    initials: 'MD',
    quote:
      'They were patient with a seven-year-old who did not want glasses. He chose the green pair himself and now actually wears them.',
  },
  {
    name: 'Aditya N.',
    location: 'MG Road',
    purchased: 'Aer Rimless',
    rating: 5,
    initials: 'AN',
    quote:
      'Light enough that I forget I have them on. The after-sales adjustments have been free and quick every single time.',
  },
];

export const testimonialsDisclaimer =
  'Sample testimonials shown for demonstration purposes. Replace with verified customer reviews before publishing.';
