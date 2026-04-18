'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Percent, ShoppingBag, Truck } from 'lucide-react';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import CurrencySwitcher from '@/app/components/CurrencySwitcher';

export default function HeaderTopBar() {
  const t = useTranslations('Header');

  return (
    <div className="w-full">
      <div className="border-b border-emerald-200/60 bg-[#d2f1d5] text-green-950">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2">
          <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 text-xs sm:gap-x-6 sm:text-sm">
            <span className="flex items-center gap-1.5 text-[#088036]">
              <Truck className="h-4 w-4 shrink-0 text-green-800" aria-hidden />
              <span>{t('topBarFreeShippingAlways')}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#009137]">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-green-800/40 bg-white/60"
                aria-hidden
              >
                <Percent className="h-3 w-3 text-green-800" strokeWidth={2.5} />
              </span>
              <span>{t('topBarBrandDiscount')}</span>
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm">
            <span className="text-[#009137]/90">
              {t('needHelp')}{' '}
              <a
                href={`tel:${t('topBarPhoneTel')}`}
                className="font-medium text-green-700 hover:text-green-800"
              >
                {t('topBarPhoneDisplay')}
              </a>
            </span>
            <span className="text-green-500/70" aria-hidden>
              |
            </span>
            <LanguageSwitcher variant="dropdown" />
            <span className="text-green-500/70" aria-hidden>
              |
            </span>
            <CurrencySwitcher className="text-[#009137]/90 hover:text-green-800 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
