import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import OrderTrackingView from './OrderTrackingView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('OrderTracking');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={null}>
      <OrderTrackingView />
    </Suspense>
  );
}
