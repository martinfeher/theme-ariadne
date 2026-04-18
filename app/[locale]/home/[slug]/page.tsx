import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';

const HOME_SLUGS = ['home-1', 'home-2', 'home-3', 'home-4'] as const;
type HomeSlug = (typeof HOME_SLUGS)[number];

const SLUG_TO_KEY: Record<HomeSlug, 'homeMenu1' | 'homeMenu2' | 'homeMenu3' | 'homeMenu4'> = {
  'home-1': 'homeMenu1',
  'home-2': 'homeMenu2',
  'home-3': 'homeMenu3',
  'home-4': 'homeMenu4',
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function HomeVariantPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!HOME_SLUGS.includes(slug as HomeSlug)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations('Header');
  const titleKey = SLUG_TO_KEY[slug as HomeSlug];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">{t(titleKey)}</h1>
      </main>
    </div>
  );
}
