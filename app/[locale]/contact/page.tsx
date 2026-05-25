import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactView from './ContactView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Contact');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function ContactPage() {
  return <ContactView />;
}
