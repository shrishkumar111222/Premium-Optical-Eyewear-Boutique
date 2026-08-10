import { business, addressLine } from '@/config/business';
import { siteOrigin } from '@/lib/asset';
import { faqs } from '@/config/faq';

const origin = siteOrigin(business.siteUrl);

/**
 * Structured data. Only facts that come from config/business.ts are emitted —
 * no ratings, awards or credentials are invented here.
 */

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Optician',
    '@id': `${origin}/#business`,
    name: business.name,
    description: business.shortDescription,
    url: origin,
    telephone: business.phone,
    email: business.email,
    image: `${origin}/images/og-cover.svg`,
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${business.address.line1}, ${business.address.line2}`,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification: business.hoursSchema.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [business.social.instagram, business.social.facebook],
    makesOffer: [
      'Premium Eyeglasses',
      'Designer Frames',
      'Luxury Sunglasses',
      'Prescription Eyewear',
      'Premium Lenses',
      'Eye Consultation',
      'Personalized Frame Selection',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  };
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema() {
  const sections: Array<[string, string]> = [
    ['Home', '/'],
    ['Eyewear', '/#eyeglasses'],
    ['Sunglasses', '/#sunglasses'],
    ['Face Shape Guide', '/#face-shapes'],
    ['Consultation', '/#consultation'],
    ['Contact', '/#contact'],
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: sections.map(([name, path], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: `${origin}${path}`,
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${business.name} — ${business.tagline}`,
    url: origin,
    publisher: { '@id': `${origin}/#business` },
    description: `${business.shortDescription} ${addressLine}.`,
  };
}
