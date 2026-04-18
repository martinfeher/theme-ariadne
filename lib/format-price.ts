/** ISO 4217 codes supported in the storefront switcher. */
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AUD';

export const CURRENCY_CODES: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'AUD'];

/**
 * Stored catalog prices are treated as EUR. Rough static conversion for display
 * (replace with live rates in production).
 */
const EUR_TO: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
  AUD: 1.65,
};

export function convertFromEur(amountEur: number, currency: CurrencyCode): number {
  return amountEur * EUR_TO[currency];
}

/** BCP 47 tags for number/currency formatting. */
const NUMBER_LOCALE_BY_APP_LOCALE: Record<string, string> = {
  sk: 'sk-SK',
  en: 'en-US',
};

/**
 * Format a catalog amount (stored in EUR) in the selected display currency.
 */
export function formatCurrency(
  amountEur: number,
  appLocale: string,
  currency: CurrencyCode
): string {
  const converted = convertFromEur(amountEur, currency);
  const tag = NUMBER_LOCALE_BY_APP_LOCALE[appLocale] ?? 'en-US';
  return new Intl.NumberFormat(tag, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);
}
