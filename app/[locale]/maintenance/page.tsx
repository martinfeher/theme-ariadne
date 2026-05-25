import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import MaintenanceView from './MaintenanceView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('StatusPages');
  return {
    title: `${t('maintenanceTitle')} | WebAriadne`,
    description: t('maintenanceMeta'),
  };
}

export default function MaintenancePage() {
  return <MaintenanceView />;
}
