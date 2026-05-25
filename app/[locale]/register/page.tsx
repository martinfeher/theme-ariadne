import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import RegisterView from './RegisterView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth');
  return {
    title: `${t('registerTitle')} | WebAriadne`,
    description: t('registerSubtitle'),
  };
}

export default function RegisterPage() {
  return <RegisterView />;
}
