import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/app/components/Header';
import CategoryShopView from '@/app/components/CategoryShopView';
import {
  CATEGORY_SHOP_SLUGS,
  isCategoryShopSlug,
} from '@/lib/category-shop';
import { routing } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CATEGORY_SHOP_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'Meta' });
  if (!isCategoryShopSlug(slug)) {
    return { title: tMeta('title') };
  }
  const tBar = await getTranslations({ locale, namespace: 'SearchBar.categories' });
  const tCat = await getTranslations({ locale, namespace: 'Category' });
  const name = slug === 'all' ? tCat('allCategories') : tBar(slug);
  return {
    title: `${name} | ${tMeta('title')}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isCategoryShopSlug(slug)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryShopView slug={slug} />
    </div>
  );
}
