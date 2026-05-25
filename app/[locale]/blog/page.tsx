import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import BlogIndexView from './BlogIndexView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Blog');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function BlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogIndexView initialLayout="grid" />
    </Suspense>
  );
}
