/**
 * Collection taxonomies for the eyeglasses, sunglasses, men's, women's and
 * kids' sections. Purely presentational demo content — edit freely.
 */
import { images } from './images';

export interface CollectionItem {
  title: string;
  description: string;
}

/* ── Premium eyeglasses ───────────────────────────────────────────────── */

export const eyeglassCategories: CollectionItem[] = [
  { title: 'Classic', description: 'Timeless silhouettes that stay relevant year after year.' },
  { title: 'Minimal', description: 'Fine rims and quiet detailing for an understated profile.' },
  { title: 'Bold', description: 'Heavier acetate and defined brow lines with real presence.' },
  { title: 'Titanium', description: 'Feather-light, corrosion-resistant and comfortable all day.' },
  { title: 'Acetate', description: 'Rich, hand-polished material with depth of colour.' },
  { title: 'Rimless', description: 'Mounted lenses for the lightest possible look on the face.' },
  { title: 'Half-Rim', description: 'A defined brow above an open lower edge.' },
  { title: 'Full-Rim', description: 'Complete rim support — the most versatile construction.' },
];

export const eyeglassSpecs = [
  { label: 'Frame Material', value: 'Acetate · Titanium · Stainless Steel · TR90' },
  { label: 'Frame Shape', value: 'Round · Square · Panto · Geometric · Browline' },
  { label: 'Available Colours', value: 'Black · Tortoise · Crystal · Gold · Gunmetal' },
  { label: 'Lens Options', value: 'Single vision · Progressive · Blue-light filtering' },
  { label: 'Prescription', value: 'Prescription compatible — bring your latest prescription' },
];

/* ── Designer sunglasses ──────────────────────────────────────────────── */

export const sunglassCategories: CollectionItem[] = [
  { title: 'Aviator', description: 'Teardrop lenses with a double bridge.' },
  { title: 'Wayfarer', description: 'The definitive acetate silhouette.' },
  { title: 'Round', description: 'Soft circles with a vintage lean.' },
  { title: 'Square', description: 'Structured lines and a strong brow.' },
  { title: 'Oversized', description: 'Generous coverage, editorial attitude.' },
  { title: 'Cat-Eye', description: 'An upswept brow with sculpted flare.' },
  { title: 'Sport', description: 'Wrapped shields built to stay in place.' },
  { title: 'Polarized', description: 'Lenses selected to reduce glare from flat surfaces.' },
];

/* ── Men's ────────────────────────────────────────────────────────────── */

export const mensCollection: CollectionItem[] = [
  { title: 'Classic Frames', description: 'Browlines, wayfarers and rectangles that never date.' },
  { title: 'Business Frames', description: 'Slim metal and matte acetate for the working week.' },
  { title: 'Luxury Frames', description: 'Titanium, hand-finished detail and refined proportions.' },
  { title: 'Sport Frames', description: 'Lightweight wraps with a secure, no-slip fit.' },
  { title: 'Statement Sunglasses', description: 'Larger lenses and confident, defined lines.' },
];

/* ── Women's ──────────────────────────────────────────────────────────── */

export const womensCollection: CollectionItem[] = [
  { title: 'Cat-Eye', description: 'Lifted corners that draw the eye upward.' },
  { title: 'Oversized', description: 'Editorial scale with a soft, flattering curve.' },
  { title: 'Minimal', description: 'Rimless and fine-wire frames that all but disappear.' },
  { title: 'Statement Frames', description: 'Sculptural acetate in considered colourways.' },
  { title: 'Luxury Sunglasses', description: 'Gradient lenses and precious-tone hardware.' },
  { title: 'Fashion Frames', description: 'Seasonal shapes for those who like to change it up.' },
];

/* ── Kids ─────────────────────────────────────────────────────────────── */

export const kidsCollection: CollectionItem[] = [
  { title: 'Kids Frames', description: 'Proportioned for smaller faces, not shrunken adult frames.' },
  { title: 'Flexible Frames', description: 'Bendable temples that recover their shape.' },
  { title: 'Lightweight Frames', description: 'Low weight so they are easy to forget about.' },
  { title: 'Colourful Frames', description: 'Colours children actually want to wear.' },
  { title: 'School Eyewear', description: 'Durable everyday options for the school routine.' },
];

export const kidsTrust = [
  { title: 'Comfort', description: 'Soft nose pads and rounded temple tips, checked in person.' },
  { title: 'Fit', description: 'Measured and adjusted on the child, then re-checked as they grow.' },
  { title: 'Durability', description: 'Flexible materials chosen to survive a school bag.' },
  { title: 'Professional Guidance', description: 'Unhurried help from our team while you choose together.' },
];

/* ── Section imagery ──────────────────────────────────────────────────── */

export const collectionImages = images.category;
