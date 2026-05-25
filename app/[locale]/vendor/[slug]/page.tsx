import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import VendorDetailView from './VendorDetailView';
import { MOCK_VENDORS, getVendorBySlug } from '@/lib/mock-vendors';
import { getVendorTagline } from '@/lib/vendor-i18n';
import { routing } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    MOCK_VENDORS.map((vendor) => ({ locale, slug: vendor.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) {
    const t = await getTranslations({ locale, namespace: 'Meta' });
    return { title: t('title') };
  }
  const t = await getTranslations({ locale, namespace: 'Vendors' });
  const tagline = getVendorTagline(slug, t);
  return {
    title: `${vendor.name} | WebAriadne`,
    description: tagline,
  };
}

export default async function VendorDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const vendor = getVendorBySlug(slug);
  if (!vendor) {
    notFound();
  }

  return <VendorDetailView vendor={vendor} />;
}
