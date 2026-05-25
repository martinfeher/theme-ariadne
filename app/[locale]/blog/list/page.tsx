import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import BlogIndexView from '../BlogIndexView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Blog');
  return {
    title: `${t('listTitle')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function BlogListPage() {
  return (
    <Suspense fallback={null}>
      <BlogIndexView initialLayout="list" />
    </Suspense>
  );
}
