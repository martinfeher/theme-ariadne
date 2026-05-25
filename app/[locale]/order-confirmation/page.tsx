import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import OrderConfirmationView from './OrderConfirmationView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('OrderConfirmation');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationView />
    </Suspense>
  );
}
