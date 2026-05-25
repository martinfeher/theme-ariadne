import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AccountView from './AccountView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth');
  return {
    title: `${t('accountBreadcrumb')} | WebAriadne`,
    description: t('accountWelcome', { name: 'User' }),
  };
}

export default function AccountPage() {
  return <AccountView />;
}
