import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TermsView from './TermsView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Terms');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function TermsPage() {
  return <TermsView />;
}
