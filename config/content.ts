import { asset } from '@/lib/asset';

/**
 * Remaining editorial content: face shapes, lens options, style stories,
 * gallery, trust points and the business-value comparison.
 *
 * All of it is demo copy — polished, realistic and safe to publish, but written
 * for a fictional boutique. Nothing here makes a medical or outcome claim.
 */

/* ── Face shape guide (style guidance, not medical advice) ────────────── */

export interface FaceShape {
  id: string;
  name: string;
  /** One-line description of the face shape itself. */
  summary: string;
  /** The styling principle behind the recommendation. */
  principle: string;
  recommended: string[];
  consider: string[];
  styleNote: string;
}

export const faceShapes: FaceShape[] = [
  {
    id: 'oval',
    name: 'Oval',
    summary: 'Balanced proportions with a gently curved jaw and forehead.',
    principle: 'Most shapes sit comfortably — the aim is to keep the natural balance.',
    recommended: ['Wayfarer', 'Round', 'Square', 'Aviator'],
    consider: ['Frames much wider than the face', 'Very deep lens shapes'],
    styleNote: 'Choose based on personality rather than correction. Almost anything works.',
  },
  {
    id: 'round',
    name: 'Round',
    summary: 'Soft curves with similar face width and length.',
    principle: 'Angular frames create contrast against soft features.',
    recommended: ['Square', 'Rectangle', 'Browline', 'Geometric'],
    consider: ['Small round frames', 'Very low, wide shapes'],
    styleNote: 'A defined brow line adds structure and lengthens the face visually.',
  },
  {
    id: 'square',
    name: 'Square',
    summary: 'A strong jaw with a broad forehead and defined angles.',
    principle: 'Rounded frames soften naturally angular features.',
    recommended: ['Round', 'Oval', 'Panto', 'Aviator'],
    consider: ['Sharp rectangles', 'Heavy squared-off acetate'],
    styleNote: 'Curved rims and thinner materials keep the look from feeling boxy.',
  },
  {
    id: 'heart',
    name: 'Heart',
    summary: 'A wider forehead tapering toward a narrower chin.',
    principle: 'Bottom-heavy or rimless frames create balance lower on the face.',
    recommended: ['Rimless', 'Round', 'Oval', 'Light Bottom-Rim'],
    consider: ['Heavy top bars', 'Wide, decorative brow lines'],
    styleNote: 'Keep visual weight low and let the upper frame stay quiet.',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    summary: 'High cheekbones with a narrower forehead and chin.',
    principle: 'Frames with detail along the brow highlight the eye line.',
    recommended: ['Cat-Eye', 'Oval', 'Browline', 'Rimless'],
    consider: ['Narrow frames', 'Very boxy shapes'],
    styleNote: 'A frame slightly wider than the cheekbones opens up the upper face.',
  },
  {
    id: 'oblong',
    name: 'Oblong',
    summary: 'Longer than it is wide, with a straight cheek line.',
    principle: 'Deeper frames shorten the visual length of the face.',
    recommended: ['Oversized', 'Square', 'Round with Depth', 'Aviator'],
    consider: ['Shallow, narrow lenses', 'Small wire frames'],
    styleNote: 'Decorative temples add width where the face is naturally narrow.',
  },
];

export const faceShapeDisclaimer =
  'This is a general style guide, not medical or optical advice. Fit and comfort are best assessed in person.';

/* ── Lens options (neutral, educational — no medical claims) ──────────── */

export interface LensOption {
  name: string;
  description: string;
  bestFor: string;
}

export const lensOptions: LensOption[] = [
  {
    name: 'Single Vision',
    description: 'One prescription strength across the whole lens.',
    bestFor: 'A single distance — reading, or distance vision.',
  },
  {
    name: 'Progressive',
    description: 'Multiple viewing zones blended into one lens without a visible line.',
    bestFor: 'Switching between near, intermediate and distance.',
  },
  {
    name: 'Blue-Light Filtering',
    description: 'A coating or tint that filters part of the blue-light spectrum from screens.',
    bestFor: 'Long days working at a monitor.',
  },
  {
    name: 'Anti-Reflective',
    description: 'A coating that reduces reflections on the lens surface.',
    bestFor: 'Night driving, photographs and video calls.',
  },
  {
    name: 'Photochromic',
    description: 'Lenses that darken in response to UV light and clear again indoors.',
    bestFor: 'Moving frequently between indoors and outdoors.',
  },
  {
    name: 'Polarized',
    description: 'A filter that cuts glare reflected off flat surfaces such as roads and water.',
    bestFor: 'Driving, the beach and bright outdoor conditions.',
  },
  {
    name: 'UV Protection',
    description: 'Lens treatments rated to block ultraviolet wavelengths.',
    bestFor: 'Any pair worn outdoors regularly.',
  },
  {
    name: 'High Index',
    description: 'Denser lens material that achieves the same prescription in a thinner profile.',
    bestFor: 'Stronger prescriptions, and rimless or thin-rim frames.',
  },
];

export const lensDisclaimer =
  'Lens descriptions are general information only. Our team will discuss which options suit your prescription and daily routine.';

/* ── Consultation ─────────────────────────────────────────────────────── */

export const consultationFeatures = [
  {
    title: 'Personalized Frame Selection',
    description: 'We shortlist frames around your face, colouring and how you actually dress.',
  },
  {
    title: 'Face Shape Guidance',
    description: 'A practical read on proportion and balance, with frames on your face to prove it.',
  },
  {
    title: 'Lens Discussion',
    description: 'Plain-language explanations of coatings, materials and what each one is for.',
  },
  {
    title: 'Frame Fitting',
    description: 'Bridge, temple length and pantoscopic tilt adjusted until it sits properly.',
  },
  {
    title: 'Style Consultation',
    description: 'A second opinion from people who look at frames all day.',
  },
];

export const consultationServices = [
  'Eyewear Consultation',
  'Eye Test',
  'Frame Selection',
  'Sunglasses Consultation',
] as const;

/* ── Why choose us ────────────────────────────────────────────────────── */

export const whyChooseUs = [
  { title: 'Expert Guidance', description: 'A team that fits eyewear every day and will tell you when something does not work.' },
  { title: 'Premium Frames', description: 'A curated wall rather than an endless catalogue — every frame is there for a reason.' },
  { title: 'Personalized Fitting', description: 'Measured, adjusted and re-checked on your face, not estimated from a box.' },
  { title: 'Authentic Products', description: 'Frames sourced through legitimate supply channels, with their original packaging.' },
  { title: 'Quality Lenses', description: 'A considered range of lens materials and coatings, explained before you choose.' },
  { title: 'After-Sales Support', description: 'Adjustments, tightening and nose pad replacement whenever you need them.' },
  { title: 'Wide Selection', description: 'Shapes and sizes for every face, from rimless titanium to heavy acetate.' },
  { title: 'Modern Showroom', description: 'Proper lighting and full-length mirrors, so what you see is what you get.' },
];

/* ── Store experience ─────────────────────────────────────────────────── */

const storeExperienceRaw = [
  {
    title: 'Premium Display Walls',
    description: 'Frames presented individually and lit properly, so the detail is actually visible.',
    image: '/images/store-display-wall.svg',
  },
  {
    title: 'Frame Collections',
    description: 'Grouped by silhouette and material rather than crammed by brand.',
    image: '/images/store-frame-bar.svg',
  },
  {
    title: 'Consultation Area',
    description: 'A quiet corner with a proper mirror, where nobody is watching over your shoulder.',
    image: '/images/store-consultation.svg',
  },
  {
    title: 'Lens Counter',
    description: 'Where measurements are taken and lens options are laid out side by side.',
    image: '/images/store-lens-counter.svg',
  },
  {
    title: 'Customer Experience',
    description: 'Unhurried by design. Try fifteen pairs — that is what the wall is for.',
    image: '/images/store-lens-bench.svg',
  },
  {
    title: 'Modern Interior',
    description: 'Warm neutrals, natural materials and light chosen to show frames honestly.',
    image: '/images/store-interior.svg',
  },
];

/** Image paths run through `asset()` so they survive a base-path deployment. */
export const storeExperience = storeExperienceRaw.map((item) => ({
  ...item,
  image: asset(item.image),
}));

/* ── Style stories ────────────────────────────────────────────────────── */

const styleStoriesRaw = [
  {
    title: 'From Everyday to Effortless',
    excerpt:
      'How one change of frame shape turned a purely functional pair of glasses into the thing people notice first.',
    tag: 'Everyday',
    image: '/images/story-everyday.svg',
  },
  {
    title: 'Finding the Perfect Signature Frame',
    excerpt:
      'A signature frame is the one you reach for without thinking. Here is how our team helps people find theirs.',
    tag: 'Signature',
    image: '/images/story-signature.svg',
  },
  {
    title: 'Minimal Frames for Modern Professionals',
    excerpt:
      'Rimless titanium and fine-wire silhouettes for people who would rather be remembered for what they said.',
    tag: 'Minimal',
    image: '/images/story-minimal.svg',
  },
  {
    title: 'Statement Sunglasses for Weekend Escapes',
    excerpt:
      'Oversized lenses, warm gradients and a little gold hardware — the pair that only comes out on Saturdays.',
    tag: 'Weekend',
    image: '/images/story-weekend.svg',
  },
];

export const styleStories = styleStoriesRaw.map((story) => ({
  ...story,
  image: asset(story.image),
}));

/* ── Gallery ──────────────────────────────────────────────────────────── */

const galleryRaw = [
  { src: '/images/gallery-01.svg', alt: 'Illuminated eyewear display wall inside the boutique', caption: 'Display Wall' },
  { src: '/images/gallery-02.svg', alt: 'Frame selection counter with two pairs of frames on display', caption: 'Frame Selection' },
  { src: '/images/gallery-03.svg', alt: 'Optical lens blanks arranged on the lens bench', caption: 'Lens Counter' },
  { src: '/images/gallery-04.svg', alt: 'The consultation area with an oversized frame on display', caption: 'Consultation Area' },
  { src: '/images/gallery-05.svg', alt: 'A wall of designer frames grouped by silhouette', caption: 'Designer Frames' },
  { src: '/images/gallery-06.svg', alt: 'Sunglasses presented on the boutique counter', caption: 'Sunglasses Display' },
  { src: '/images/gallery-07.svg', alt: 'Close-up of a lens surface catching the light', caption: 'Lens Detail' },
  { src: '/images/gallery-08.svg', alt: 'Customers trying frames along the boutique display wall', caption: 'Trying Frames' },
];

export const gallery = galleryRaw.map((item) => ({ ...item, src: asset(item.src) }));

/* ── Trust bar ────────────────────────────────────────────────────────── */

export const trustPoints = [
  'Premium Eyewear',
  'Expert Guidance',
  'Prescription Support',
  'Personalized Fitting',
  'Authentic Products',
];

/* ── Business value (for the owner reading this demo) ─────────────────── */

export const businessValue = {
  without: [
    'Limited online visibility',
    'Difficult to showcase premium frames',
    'Missed WhatsApp inquiries',
    'Weak digital brand image',
    'Customers cannot explore collections before visiting',
  ],
  with: [
    'Premium online brand presence',
    'Showcase collections 24/7',
    'Generate WhatsApp inquiries',
    'Book consultations',
    'Promote new collections',
    'Build customer trust',
    'Increase showroom visits',
  ],
};
