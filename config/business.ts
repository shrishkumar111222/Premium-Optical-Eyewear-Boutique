/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH FOR BUSINESS INFORMATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Everything a store owner needs to change lives in this file. No component
 * hardcodes a phone number, address or brand name.
 *
 * ⚠️  DEMO CONTENT: the name, address, hours and statistics below are
 * placeholders for a fictional boutique. Replace them with real details before
 * publishing. Do not advertise credentials, certifications or dealer status
 * that the business does not actually hold.
 */

export const business = {
  /** Brand name shown in the header, footer, schema and page titles. */
  name: 'VISIONÉ',
  /** Optional second word rendered in a lighter weight beside the logo. */
  nameSuffix: 'Eyewear Atelier',
  tagline: 'Premium Optical & Eyewear Boutique',
  shortDescription:
    'A premium eyewear boutique offering designer frames, luxury sunglasses and personalized optical guidance.',

  /* ── Contact ─────────────────────────────────────────────────────────── */
  /** E.164 format, no spaces — used for tel: links. */
  phone: '+919905429650',
  /** Pretty version shown to visitors. */
  phoneDisplay: '+91 99054 29650',
  /** Digits only, with country code — used for wa.me links. */
  whatsapp: '919905429650',
  whatsappDisplay: '+91 99054 29650',
  email: 'hello@visione-demo.com',

  /* ── Location (placeholder — replace with the real address) ──────────── */
  address: {
    line1: 'Ground Floor, The Optic House',
    line2: '12 Boulevard Lane, Fashion District',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560001',
    country: 'India',
  },
  /** Paste the store's own Google Maps share link here. */
  googleMapsUrl: 'https://www.google.com/maps',
  /** Paste the store's own Google Maps embed URL here (Share → Embed a map). */
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Bengaluru%2C%20Karnataka&output=embed',
  /** Approximate coordinates, used only for LocalBusiness schema. */
  geo: { latitude: 12.9716, longitude: 77.5946 },
  nearbyLandmarks: [
    'Opposite the Boulevard Lane metro exit',
    '2 minutes from the Fashion District parking plaza',
    'Beside the Heritage Arcade courtyard',
  ],

  /* ── Hours ───────────────────────────────────────────────────────────── */
  hours: [
    { day: 'Monday — Friday', time: '10:00 AM — 8:30 PM' },
    { day: 'Saturday', time: '10:00 AM — 9:00 PM' },
    { day: 'Sunday', time: '11:00 AM — 7:00 PM' },
  ],
  /** Machine-readable hours for LocalBusiness schema. */
  hoursSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '20:30' },
    { days: ['Saturday'], opens: '10:00', closes: '21:00' },
    { days: ['Sunday'], opens: '11:00', closes: '19:00' },
  ],

  /* ── Social ──────────────────────────────────────────────────────────── */
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },

  /* ── Demo statistics — replace or remove; never publish unverified numbers ─ */
  stats: {
    /** Placeholder rating. Remove this if the store has no public rating yet. */
    googleRating: '4.9',
    googleReviewCount: '380+',
    yearsExperience: '18',
    customersServed: '25,000+',
    framesInStore: '2,400+',
  },

  /** Canonical site URL — update before deploying for correct OG tags.
      On GitHub Pages the repo path is appended automatically (see lib/asset.ts). */
  siteUrl: 'https://shrishkumar111222.github.io',

  /** Currency symbol used for the demo price placeholders. */
  currency: '₹',
} as const;

/* ── WhatsApp ─────────────────────────────────────────────────────────── */

/**
 * Contextual WhatsApp messages. Each CTA on the site sends a different
 * prefilled message so the store knows what the enquiry is about.
 */
export const whatsappMessages = {
  general: "Hi, I'd like to know more about your eyewear boutique.",
  collection: "Hi, I'd like to explore your eyewear collection.",
  consultation: "Hi, I'd like to book an eye consultation.",
  frameHelp: "Hi, I'd like help choosing a frame.",
  sunglasses: "Hi, I'd like to ask about your sunglasses.",
  eyeglasses: "Hi, I'd like to ask about your prescription eyeglasses.",
  lenses: "Hi, I'd like to enquire about lens options.",
  men: "Hi, I'd like to see your men's eyewear collection.",
  women: "Hi, I'd like to see your women's eyewear collection.",
  kids: "Hi, I'd like to know about kids' eyewear.",
  brands: "Hi, I'd like to know which eyewear brands you currently stock.",
  visit: "Hi, I'd like to visit your store. Could you share the directions?",
  product: (name: string) => `Hi, I'm interested in the "${name}" frame. Could you share more details?`,
  frameFinder: (summary: string) => `Hi, I used your frame finder (${summary}) and would like recommendations.`,
  booking: (details: string) => `Hi, I'd like to book a consultation.\n\n${details}`,
} as const;

/** Builds a wa.me deep link with a prefilled, URL-encoded message. */
export function whatsappLink(message: string = whatsappMessages.general): string {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** tel: link for one-tap calling on mobile. */
export const telLink = `tel:${business.phone}`;

/** mailto: link. */
export const mailLink = `mailto:${business.email}`;

/** Single-line address, used in the footer and schema. */
export const addressLine = [
  business.address.line1,
  business.address.line2,
  `${business.address.city} ${business.address.postalCode}`,
].join(', ');

/* ── The "get your own website" demo banner ───────────────────────────── */

/**
 * This site doubles as a sales demo. Set `enabled: false` to strip every trace
 * of the agency CTA when handing the site to a real client.
 */
export const demoCta = {
  enabled: true,
  question: 'Want a website like this for your optical store?',
  buttonLabel: 'Get FREE Website Demo',
  message: "Hi, I saw the VISIONÉ demo website and I'd like a website like this for my optical store.",
} as const;
