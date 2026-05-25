'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle } from 'lucide-react';
import StatusPageShell, { StatusActions, StatusHero } from '@/app/components/status/StatusPageShell';

type ServerErrorViewProps = {
  onRetry?: () => void;
};

export default function ServerErrorView({ onRetry }: ServerErrorViewProps) {
  const t = useTranslations('StatusPages');

  return (
    <StatusPageShell>
      <StatusHero
        code="500"
        title={t('serverErrorTitle')}
        description={t('serverErrorDescription')}
        icon={
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-12 w-12 text-red-500" strokeWidth={1.5} aria-hidden />
          </div>
        }
      >
        <StatusActions
          primaryLabel={onRetry ? t('tryAgain') : t('backHome')}
          primaryHref={onRetry ? undefined : '/'}
          primaryType={onRetry ? 'button' : 'link'}
          onPrimaryClick={onRetry}
          secondaryHref="/contact"
          secondaryLabel={t('contactSupport')}
        />
      </StatusHero>
    </StatusPageShell>
  );
}
