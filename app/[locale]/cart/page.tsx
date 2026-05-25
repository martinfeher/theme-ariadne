import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CartView from './CartView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('CartPage');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function CartPage() {
  return <CartView />;
}
