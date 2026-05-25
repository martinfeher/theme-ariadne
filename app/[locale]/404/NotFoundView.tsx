'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SearchX } from 'lucide-react';
import StatusPageShell, { StatusActions, StatusHero } from '@/app/components/status/StatusPageShell';

export default function NotFoundView() {
  const t = useTranslations('StatusPages');

  return (
    <StatusPageShell>
      <StatusHero
        code="404"
        title={t('notFoundTitle')}
        description={t('notFoundDescription')}
        icon={
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
            <SearchX className="h-12 w-12 text-green-500" strokeWidth={1.5} aria-hidden />
          </div>
        }
      >
        <StatusActions
          primaryLabel={t('backHome')}
          secondaryHref="/contact"
          secondaryLabel={t('contactSupport')}
        />
      </StatusHero>
    </StatusPageShell>
  );
}
