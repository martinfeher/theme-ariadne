import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FaqView from './FaqView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('FAQ');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function FaqPage() {
  return <FaqView />;
}
