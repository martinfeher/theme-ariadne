import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import VendorsView from './VendorsView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Vendors');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function VendorsPage() {
  return <VendorsView />;
}
