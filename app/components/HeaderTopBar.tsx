'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Percent } from 'lucide-react';
import { FaShippingFast } from "react-icons/fa";
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
              <FaShippingFast className="h-[18px] w-[18px] shrink-0 text-green-800" />
              <span>{t('topBarFreeShippingAlways')}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#009137]">
              <span
                className="flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full border bg-[#216d2f]"
                aria-hidden
              >
                <Percent className="h-[11px] w-[11px] text-[#d3f0d5]" strokeWidth={2.5} />
              </span>
              <span>{t('topBarBrandDiscount')}</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm">
            <span className="shrink-0 flex items-center justify-center">
              <svg fill="#256932" xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px]" width="22" height="22" viewBox="0 0 23 23" aria-hidden>
                <path d="M12 2C7.03 2 3 6.03 3 11V17C3 18.1 3.9 19 5 19H6C7.1 19 8 18.1 8 17V13C8 11.9 7.1 11 6 11H4C4 7.13 7.13 4 11 4H13C16.87 4 20 7.13 20 11H18C16.9 11 16 11.9 16 13V17C16 18.1 16.9 19 18 19H19C20.1 19 21 18.1 21 17V11C21 6.03 16.97 2 12 2Z" />
              </svg>
            </span>
            <span className="text-[#009137]/90">
              {t('needHelp')}{' '}
              <a
                href={`tel:${t('topBarPhoneTel')}`}
                className="text-[#2f833e]  hover:text-green-800"
              >
                {t('topBarPhoneDisplay')}
              </a>
            </span>
            <span className="text-green-400/70" aria-hidden>
              |
            </span>
            <LanguageSwitcher variant="dropdown" />
            <span className="text-green-400/70" aria-hidden>
              |
            </span>
            <CurrencySwitcher className="text-[#009137]/90 hover:text-green-800 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
