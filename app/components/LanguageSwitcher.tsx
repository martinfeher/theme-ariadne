'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('Header');

  return (
    <div
      className="flex items-center gap-0.5 rounded-md border border-gray-200 bg-white p-0.5 shadow-sm"
      role="group"
      aria-label={t('language')}
    >
      <Link
        href={pathname}
        locale="sk"
        className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
          locale === 'sk'
            ? 'bg-green-500 text-white'
            : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
        }`}
        prefetch={false}
      >
        SK
      </Link>
      <Link
        href={pathname}
        locale="en"
        className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
          locale === 'en'
            ? 'bg-green-500 text-white'
            : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
        }`}
        prefetch={false}
      >
        EN
      </Link>
    </div>
  );
}
