import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import OrderHistoryView from './OrderHistoryView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('OrderHistory');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function OrderHistoryPage() {
  return <OrderHistoryView />;
}
