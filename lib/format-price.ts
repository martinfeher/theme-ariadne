/** BCP 47 tags for consistent € formatting per app locale. */
const EUR_LOCALE_BY_APP_LOCALE: Record<string, string> = {
  sk: 'sk-SK',
  en: 'en-IE',
};

export function formatEur(amount: number, appLocale: string): string {
  const tag = EUR_LOCALE_BY_APP_LOCALE[appLocale] ?? 'en-IE';
  return new Intl.NumberFormat(tag, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
