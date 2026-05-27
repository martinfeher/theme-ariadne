import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutView2 from '../about/AboutView2';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('About2');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function AboutPage2() {
  return <AboutView2 />;
}
