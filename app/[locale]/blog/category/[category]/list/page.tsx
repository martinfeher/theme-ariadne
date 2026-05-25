import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import BlogArchiveView from '../../../BlogArchiveView';
import {
  BLOG_CATEGORIES,
  isBlogCategory,
  type BlogCategory,
} from '@/lib/mock-blog';
import { getBlogCategoryDescription, getBlogCategoryLabel } from '@/lib/blog-i18n';
import { routing } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_CATEGORIES.map((category) => ({ locale, category }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isBlogCategory(category)) {
    const t = await getTranslations({ locale, namespace: 'Meta' });
    return { title: t('title') };
  }
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const title = getBlogCategoryLabel(category, t);
  const description = getBlogCategoryDescription(category, t);
  return {
    title: `${title} | WebAriadne`,
    description,
  };
}

export default async function BlogCategoryListPage({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  if (!isBlogCategory(category)) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <BlogArchiveView
        filter={{ type: 'category', category: category as BlogCategory }}
        initialLayout="list"
      />
    </Suspense>
  );
}
