import type { MetadataRoute } from 'next';
import { getSitemapPathEntries } from '@/lib/sitemap-paths';
import { absoluteUrl, languageAlternates } from '@/lib/site-url';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getSitemapPathEntries();

  return entries.map(({ path, changeFrequency, priority, lastModified }) => ({
    url: absoluteUrl(routing.defaultLocale, path),
    lastModified: lastModified ?? new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: languageAlternates(path),
    },
  }));
}
