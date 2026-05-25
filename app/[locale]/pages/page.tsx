import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PagesView from './PagesView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('StatusPages');
  return {
    title: `${t('pagesHubTitle')} | WebAriadne`,
    description: t('pagesHubMeta'),
  };
}

export default function PagesHubPage() {
  return <PagesView />;
}
