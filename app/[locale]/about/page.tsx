import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutView from './AboutView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('About');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function AboutPage() {
  return <AboutView />;
}
