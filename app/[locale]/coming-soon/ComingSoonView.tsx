'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Rocket } from 'lucide-react';
import StatusPageShell, { NotifyForm, StatusHero } from '@/app/components/status/StatusPageShell';

export default function ComingSoonView() {
  const t = useTranslations('StatusPages');

  return (
    <StatusPageShell minimal>
      <div className="mx-auto w-full max-w-xl text-center">
        <StatusHero
          code=""
          title={t('comingSoonTitle')}
          description={t('comingSoonDescription')}
          icon={
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
              <Rocket className="h-12 w-12 text-green-500" strokeWidth={1.5} aria-hidden />
            </div>
          }
        />
        <div className="mt-8">
          <p className="mb-3 text-sm font-medium text-gray-700">{t('notifyLabel')}</p>
          <NotifyForm
            emailLabel={t('notifyEmail')}
            emailPlaceholder={t('notifyPlaceholder')}
            submitLabel={t('notifySubmit')}
            sendingLabel={t('notifySending')}
            successMessage={t('notifySuccess')}
          />
        </div>
      </div>
    </StatusPageShell>
  );
}
