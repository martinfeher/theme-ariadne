import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ComingSoonView from './ComingSoonView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('StatusPages');
  return {
    title: `${t('comingSoonTitle')} | WebAriadne`,
    description: t('comingSoonMeta'),
  };
}

export default function ComingSoonPage() {
  return <ComingSoonView />;
}
