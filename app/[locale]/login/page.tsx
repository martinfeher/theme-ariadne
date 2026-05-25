import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LoginView from './LoginView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth');
  return {
    title: `${t('loginTitle')} | WebAriadne`,
    description: t('loginSubtitle'),
  };
}

export default function LoginPage() {
  return <LoginView />;
}
