import type { Metadata, Viewport } from 'next';
import { MotionConfig } from 'framer-motion';
import './globals.css';
import { business } from '@/config/business';
import { asset, siteOrigin } from '@/lib/asset';
import { localBusinessSchema, faqSchema, breadcrumbSchema, websiteSchema } from '@/lib/seo';
import PageLoader from '@/components/PageLoader';
import ScrollProgress from '@/components/ScrollProgress';
import CursorGlow from '@/components/CursorGlow';

const title = `${business.name} — Premium Optical Store, Designer Eyewear & Luxury Sunglasses`;
const description =
  'Discover premium eyeglasses, designer frames and luxury sunglasses at our eyewear boutique. Prescription glasses, premium lenses, personalized frame selection and expert eye consultation.';

// A GitHub Pages project site lives under /<repo>, so the canonical origin
// includes the base path.
const origin = siteOrigin(business.siteUrl);

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: title,
    template: `%s | ${business.name}`,
  },
  description,
  keywords: [
    'premium optical store',
    'optical store near me',
    'eyewear store',
    'designer eyewear',
    'sunglasses store',
    'prescription glasses',
    'optician',
    'eye test',
    'eyewear boutique',
    'luxury sunglasses',
    'premium eyeglasses',
    'kids eyewear',
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: origin,
    siteName: business.name,
    title,
    description,
    images: [
      {
        url: asset('/images/og-cover.svg'),
        width: 1200,
        height: 630,
        alt: `${business.name} — premium eyewear boutique`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [asset('/images/og-cover.svg')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: asset('/favicon.svg'), type: 'image/svg+xml' }],
    apple: [{ url: asset('/favicon.svg') }],
  },
  category: 'shopping',
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const schema = [localBusinessSchema(), websiteSchema(), faqSchema(), breadcrumbSchema()];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Loaded as a plain stylesheet link so the build never needs network access.
            The CSS stacks in globals.css cover the site if the fonts don't load. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* The rule targets the pages router; this link lives in the root layout,
            so it already applies to every page. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap"
        />
        <script
          type="application/ld+json"
          // Structured data is built from config only — no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <PageLoader />
          <ScrollProgress />
          <CursorGlow />
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
