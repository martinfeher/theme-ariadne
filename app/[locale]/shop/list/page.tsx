import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageShell from '@/app/components/PageShell';
import ShopListView from '@/app/components/ShopListView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ShopList');
  const tMeta = await getTranslations('Meta');
  return {
    title: `${t('title')} | ${tMeta('title')}`,
    description: t('metaDescription'),
  };
}

export default function ShopListPage() {
  return (
    <PageShell>
      <ShopListView />
    </PageShell>
  );
}
