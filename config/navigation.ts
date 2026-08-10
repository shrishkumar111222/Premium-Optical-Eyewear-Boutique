/** Primary navigation. Every entry is an in-page anchor on the single-page layout. */
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'Eyewear', href: '#eyeglasses' },
  { label: 'Sunglasses', href: '#sunglasses' },
  { label: 'Men', href: '#men' },
  { label: 'Women', href: '#women' },
  { label: 'Kids', href: '#kids' },
  { label: 'Brands', href: '#brands' },
  { label: 'Face Shape Guide', href: '#face-shapes' },
  { label: 'Consultation', href: '#consultation' },
  { label: 'Contact', href: '#contact' },
];

/** Sections offered by the header search overlay. */
export const searchTargets: NavItem[] = [
  ...navItems.filter((item) => item.href !== '#top'),
  { label: 'New Collection', href: '#collection' },
  { label: 'Frame Finder', href: '#frame-finder' },
  { label: 'Lens Options', href: '#lenses' },
  { label: 'Store Experience', href: '#store' },
  { label: 'Customer Reviews', href: '#reviews' },
  { label: 'Style Stories', href: '#stories' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit Our Boutique', href: '#map' },
  { label: 'FAQ', href: '#faq' },
];
