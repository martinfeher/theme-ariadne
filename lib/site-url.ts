import { routing } from '@/i18n/routing';

/** Public site origin used in sitemap.xml and robots.txt. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }

  const vercel = process.env.VERCEL_URL;
  if (vercel) {
    return `https://${vercel.replace(/\/$/, '')}`;
  }

  return 'http://localhost:3000';
}

/** Path for a locale (`as-needed`: default locale has no prefix). */
export function localizedPath(locale: string, pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;

  if (locale === routing.defaultLocale) {
    return path;
  }

  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

export function absoluteUrl(locale: string, pathname: string): string {
  return `${getSiteUrl()}${localizedPath(locale, pathname)}`;
}

export function languageAlternates(pathname: string): Record<string, string> {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, absoluteUrl(locale, pathname)])
  );
}

/** Paths that should not be indexed (applied for every locale in robots.txt). */
export const ROBOTS_DISALLOW_PATHS = [
  '/cart',
  '/checkout',
  '/order-confirmation',
  '/account',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/api',
] as const;

export function robotsDisallowPaths(): string[] {
  const paths = new Set<string>();
  for (const pathname of ROBOTS_DISALLOW_PATHS) {
    for (const locale of routing.locales) {
      paths.add(localizedPath(locale, pathname));
    }
  }
  return [...paths].sort();
}
