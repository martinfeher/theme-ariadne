'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  type CurrencyCode,
  CURRENCY_CODES,
} from '@/lib/format-price';
import { useCurrency } from '@/app/context/CurrencyContext';
import { useHydrated } from '@/app/hooks/useHydrated';

const FLAG: Record<CurrencyCode, string> = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  AUD: '🇦🇺',
};

export default function CurrencySwitcher({
  className,
}: {
  /** e.g. text color on mint top bar */
  className?: string;
}) {
  const t = useTranslations('Header');
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();

  const triggerButton = (
    <button
      type="button"
      className={cn(
        'flex items-center gap-1 text-sm font-medium transition-colors',
        className ?? 'text-gray-600 hover:text-green-700'
      )}
      aria-label={t('currency')}
      aria-expanded={open ? 'true' : 'false'}
      aria-haspopup="listbox"
    >
      <span>{currency}</span>
      <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
    </button>
  );

  if (!hydrated) {
    return triggerButton;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent className="w-48 p-1" align="end" sideOffset={6}>
        <ul className="flex flex-col gap-0.5" role="listbox" aria-label={t('currency')}>
          {CURRENCY_CODES.map((code) => (
            <li key={code} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={currency === code}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer',
                  currency === code
                    ? 'bg-green-50 font-medium text-green-900'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <span className="text-base leading-none" aria-hidden>
                  {FLAG[code]}
                </span>
                <span>{code}</span>
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
