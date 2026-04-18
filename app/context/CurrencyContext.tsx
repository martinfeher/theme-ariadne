'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocale } from 'next-intl';
import {
  type CurrencyCode,
  CURRENCY_CODES,
  formatCurrency,
} from '@/lib/format-price';

const STORAGE_KEY = 'app.currency';

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function readStoredCurrency(): CurrencyCode {
  if (typeof window === 'undefined') return 'EUR';
  try {
    const raw = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (raw && CURRENCY_CODES.includes(raw)) return raw;
  } catch {
    /* ignore */
  }
  return 'EUR';
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('EUR');

  useEffect(() => {
    setCurrencyState(readStoredCurrency());
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ currency, setCurrency }),
    [currency, setCurrency]
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
}

/** Format catalog EUR amounts using the user-selected display currency. */
export function useFormatCurrency() {
  const locale = useLocale();
  const { currency } = useCurrency();
  return useCallback(
    (amountEur: number) => formatCurrency(amountEur, locale, currency),
    [locale, currency]
  );
}
