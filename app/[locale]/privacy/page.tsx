import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PrivacyView from './PrivacyView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Privacy');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function PrivacyPage() {
  return <PrivacyView />;
}
