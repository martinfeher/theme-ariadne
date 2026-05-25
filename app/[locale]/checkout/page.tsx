import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CheckoutView from './CheckoutView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Checkout');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function CheckoutPage() {
  return <CheckoutView />;
}
