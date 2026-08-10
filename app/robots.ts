import type { MetadataRoute } from 'next';
import { business } from '@/config/business';
import { siteOrigin } from '@/lib/asset';

const origin = siteOrigin(business.siteUrl);

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${origin}/sitemap.xml`,
  };
}
