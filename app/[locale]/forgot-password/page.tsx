import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ForgotPasswordView from './ForgotPasswordView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth');
  return {
    title: `${t('forgotTitle')} | WebAriadne`,
    description: t('forgotSubtitle'),
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
