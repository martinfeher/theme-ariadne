import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import BlogArchiveView from '../../../BlogArchiveView';
import { BLOG_TAGS, isBlogTag, type BlogTag } from '@/lib/mock-blog';
import { getBlogTagDescription, getBlogTagLabel } from '@/lib/blog-i18n';
import { routing } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string; tag: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_TAGS.map((tag) => ({ locale, tag }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = await params;
  if (!isBlogTag(tag)) {
    const t = await getTranslations({ locale, namespace: 'Meta' });
    return { title: t('title') };
  }
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const title = getBlogTagLabel(tag, t);
  const description = getBlogTagDescription(tag, t);
  return {
    title: `${title} | WebAriadne`,
    description,
  };
}

export default async function BlogTagListPage({ params }: Props) {
  const { locale, tag } = await params;
  setRequestLocale(locale);

  if (!isBlogTag(tag)) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <BlogArchiveView filter={{ type: 'tag', tag: tag as BlogTag }} initialLayout="list" />
    </Suspense>
  );
}
