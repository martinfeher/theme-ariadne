'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Wrench } from 'lucide-react';
import StatusPageShell, { StatusActions, StatusHero } from '@/app/components/status/StatusPageShell';

export default function MaintenanceView() {
  const t = useTranslations('StatusPages');

  return (
    <StatusPageShell minimal>
      <StatusHero
        code=""
        title={t('maintenanceTitle')}
        description={t('maintenanceDescription')}
        icon={
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-50">
            <Wrench className="h-12 w-12 text-amber-500" strokeWidth={1.5} aria-hidden />
          </div>
        }
      >
        <p className="mb-6 text-sm font-medium text-gray-700">{t('maintenanceEta')}</p>
        <StatusActions
          primaryHref="/contact"
          primaryLabel={t('contactSupport')}
          secondaryHref="/"
          secondaryLabel={t('backHome')}
        />
      </StatusHero>
    </StatusPageShell>
  );
}
