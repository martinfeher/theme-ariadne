'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useHydrated } from '@/app/hooks/useHydrated';

type LanguageSwitcherProps = {
  /** `tabs` = SK/EN chips (default). `dropdown` = label + chevron like a select. */
  variant?: 'tabs' | 'dropdown';
};

export default function LanguageSwitcher({ variant = 'tabs' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('Header');
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();

  if (variant === 'dropdown') {
    const currentLabel = locale === 'en' ? t('localeEnglish') : t('localeSlovak');

    const triggerButton = (
      <button
        type="button"
        className="flex items-center gap-1 text-[#2f833e] transition-colors hover:text-green-600 cursor-pointer"
        aria-label={t('language')}
        aria-expanded={open ? 'true' : 'false'}
        aria-haspopup="listbox"
      >
        <span className="text-sm">{currentLabel}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
      </button>
    );

    if (!hydrated) {
      return triggerButton;
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
        <PopoverContent className="w-44 p-1" align="end" sideOffset={6}>
          <nav className="flex flex-col gap-1 p-[1px]" aria-label={t('language')}>
            <Link
              href={pathname}
              locale="en"
              prefetch={false}
              onClick={() => setOpen(false)}
              className={cn(
                'rounded-md px-3 py-2 text-sm transition-colors',
                locale === 'en'
                  ? 'bg-gray-50 font-medium text-green-800'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              {t('localeEnglish')}
            </Link>
            <Link
              href={pathname}
              locale="sk"
              prefetch={false}
              onClick={() => setOpen(false)}
              className={cn(
                'rounded-md px-3 py-2 text-sm transition-colors',
                locale === 'sk'
                  ? 'bg-gray-50 font-medium text-green-800'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              {t('localeSlovak')}
            </Link>
          </nav>
        </PopoverContent>
      </Popover>
    );
  }

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
            ? 'bg-gray-500 text-white'
            : 'text-[#2f833e] hover:bg-gray-50 hover:text-green-600'
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
            ? 'bg-gray-500 text-white'
            : 'text-[#2f833e] hover:bg-gray-50 hover:text-green-600'
        }`}
        prefetch={false}
      >
        EN
      </Link>
    </div>
  );
}
