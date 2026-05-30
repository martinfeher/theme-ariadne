import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import DealsView from './DealsView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Deals');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function DealsPage() {
  return <DealsView />;
}
