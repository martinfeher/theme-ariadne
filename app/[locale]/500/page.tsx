import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ServerErrorView from './ServerErrorView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('StatusPages');
  return {
    title: `${t('serverErrorTitle')} | WebAriadne`,
    description: t('serverErrorMeta'),
  };
}

export default function ServerErrorPage() {
  return <ServerErrorView />;
}
