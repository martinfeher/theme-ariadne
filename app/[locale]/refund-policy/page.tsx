import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import RefundPolicyView from './RefundPolicyView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('RefundPolicy');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function RefundPolicyPage() {
  return <RefundPolicyView />;
}
