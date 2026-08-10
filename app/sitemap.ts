import type { MetadataRoute } from 'next';
import { business } from '@/config/business';
import { siteOrigin } from '@/lib/asset';

const origin = siteOrigin(business.siteUrl);

/**
 * Static sitemap. `output: 'export'` writes this to /sitemap.xml at build time.
 * Update `business.siteUrl` before deploying so the URLs are correct.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${origin}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${origin}/privacy/`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${origin}/terms/`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
