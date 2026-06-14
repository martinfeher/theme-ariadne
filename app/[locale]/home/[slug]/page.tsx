import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import PageShell from '@/app/components/PageShell';
import Home2View from '../Home2View';
import Home3View from '../Home3View';

const HOME_SLUGS = ['home-1', 'home-2', 'home-3', 'home-4'] as const;
type HomeSlug = (typeof HOME_SLUGS)[number];

const SLUG_TO_KEY: Record<HomeSlug, 'homeMenu1' | 'homeMenu2' | 'homeMenu3' | 'homeMenu4'> = {
  'home-1': 'homeMenu1',
  'home-2': 'homeMenu2',
  'home-3': 'homeMenu3',
  'home-4': 'homeMenu4',
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'home-2') {
    const t = await getTranslations('Home2');
    return {
      title: `${t('metaTitle')} | WebAriadne`,
      description: t('metaDescription'),
    };
  }
  if (slug === 'home-3') {
    const t = await getTranslations('Home3');
    return {
      title: `${t('metaTitle')} | WebAriadne`,
      description: t('metaDescription'),
    };
  }
  const t = await getTranslations('Header');
  const titleKey = SLUG_TO_KEY[slug as HomeSlug];
  if (!HOME_SLUGS.includes(slug as HomeSlug)) {
    return { title: 'WebAriadne' };
  }
  return {
    title: `${t(titleKey)} | WebAriadne`,
    description: t('homeMenu2'),
  };
}

export default async function HomeVariantPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!HOME_SLUGS.includes(slug as HomeSlug)) {
    notFound();
  }
  setRequestLocale(locale);

  if (slug === 'home-2') {
    return <Home2View />;
  }

  if (slug === 'home-3') {
    return <Home3View />;
  }

  const t = await getTranslations('Header');
  const titleKey = SLUG_TO_KEY[slug as HomeSlug];

  return (
    <PageShell>
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">{t(titleKey)}</h1>
        {slug === 'home-1' && (
          <p className="mt-2 text-sm text-gray-600">
            <Link href="/" className="text-green-600 hover:text-green-700">
              ← Main homepage
            </Link>
          </p>
        )}
      </main>
    </PageShell>
  );
}
