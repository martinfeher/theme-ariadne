import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import VouchersView from './VouchersView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Vouchers');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function VouchersPage() {
  return <VouchersView />;
}
