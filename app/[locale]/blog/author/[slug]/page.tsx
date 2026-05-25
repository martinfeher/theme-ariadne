import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import BlogArchiveView from '../../BlogArchiveView';
import {
  BLOG_AUTHORS,
  getBlogAuthorBySlug,
} from '@/lib/mock-blog';
import { getBlogAuthorBio, getBlogAuthorName } from '@/lib/blog-i18n';
import { routing } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_AUTHORS.map((author) => ({ locale, slug: author.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const author = getBlogAuthorBySlug(slug);
  if (!author) {
    const t = await getTranslations({ locale, namespace: 'Meta' });
    return { title: t('title') };
  }
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const name = getBlogAuthorName(slug, t);
  const description = getBlogAuthorBio(slug, t);
  return {
    title: `${name} | WebAriadne`,
    description,
  };
}

export default async function BlogAuthorPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!getBlogAuthorBySlug(slug)) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <BlogArchiveView filter={{ type: 'author', authorSlug: slug }} initialLayout="grid" />
    </Suspense>
  );
}
