import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AccountSettingsView from './AccountSettingsView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('AccountSettings');
  return {
    title: `${t('title')} | WebAriadne`,
    description: t('metaDescription'),
  };
}

export default function AccountSettingsPage() {
  return <AccountSettingsView />;
}
