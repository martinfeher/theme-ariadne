import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ShopInvoiceView from './ShopInvoiceView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ShopInvoice');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function ShopInvoicePage() {
  return <ShopInvoiceView />;
}
