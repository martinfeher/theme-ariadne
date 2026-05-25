import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import NotFoundView from './NotFoundView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('StatusPages');
  return {
    title: `${t('notFoundTitle')} | WebAriadne`,
    description: t('notFoundMeta'),
  };
}

export default function NotFoundPage() {
  return <NotFoundView />;
}
