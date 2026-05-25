import type { MetadataRoute } from 'next';
import { getSiteUrl, robotsDisallowPaths } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: robotsDisallowPaths(),
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
