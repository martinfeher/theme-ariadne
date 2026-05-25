'use client';

import React, { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Copy, Check, Tag } from 'lucide-react';
import Header from '@/app/components/Header';
import { MOCK_VOUCHERS, findVoucherByCode, type Voucher } from '@/lib/mock-vouchers';
import { useFormatCurrency } from '@/app/context/CurrencyContext';

function formatExpiry(date: string, locale: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function discountLabel(
  voucher: Voucher,
  t: ReturnType<typeof useTranslations<'Vouchers'>>,
  formatPrice: (n: number) => string
) {
  if (voucher.code === 'FREESHIP') return t('freeShipping');
  if (voucher.discountType === 'percent') {
    return t('percentOff', { percent: voucher.discountValue });
  }
  return t('amountOff', { amount: formatPrice(voucher.discountValue) });
}

function statusStyles(status: Voucher['status']) {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'used':
      return 'bg-gray-100 text-gray-600';
    case 'expired':
      return 'bg-red-100 text-red-700';
  }
}

export default function VouchersView() {
  const t = useTranslations('Vouchers');
  const tHeader = useTranslations('Header');
  const locale = useLocale();
  const formatPrice = useFormatCurrency();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [redeemCode, setRedeemCode] = useState('');
  const [redeemMessage, setRedeemMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const activeCount = useMemo(
    () => MOCK_VOUCHERS.filter((v) => v.status === 'active').length,
    []
  );

  const copyCode = async (voucher: Voucher) => {
    try {
      await navigator.clipboard.writeText(voucher.code);
      setCopiedId(voucher.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    const match = findVoucherByCode(redeemCode);
    if (!match) {
      setRedeemMessage({ type: 'error', text: t('redeemInvalid') });
      return;
    }
    if (match.status === 'used') {
      setRedeemMessage({ type: 'error', text: t('redeemUsed') });
      return;
    }
    if (match.status === 'expired') {
      setRedeemMessage({ type: 'error', text: t('redeemExpired') });
      return;
    }
    setRedeemMessage({ type: 'success', text: t('redeemSuccess', { code: match.code }) });
    setRedeemCode('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-green-600" aria-label={t('breadcrumbNav')}>
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                {tHeader('home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/category/all" className="hover:text-green-700">
                {t('breadcrumbShop')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-gray-800">{t('breadcrumbVouchers')}</li>
          </ol>
        </nav>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>
            <p className="mt-2 text-sm text-gray-600">
              {activeCount === 1 ? t('activeOne') : t('activeMany', { count: activeCount })}
            </p>
          </div>
          <Link
            href="/category/all"
            className="rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50"
          >
            {t('shopNow')}
          </Link>
        </div>

        <form
          onSubmit={handleRedeem}
          className="mt-8 flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
        >
          <div className="flex flex-1 items-center gap-3">
            <Tag className="h-5 w-5 shrink-0 text-green-500" aria-hidden />
            <input
              type="text"
              value={redeemCode}
              onChange={(e) => {
                setRedeemCode(e.target.value.toUpperCase());
                setRedeemMessage(null);
              }}
              placeholder={t('redeemPlaceholder')}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm uppercase outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              aria-label={t('redeemPlaceholder')}
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-green-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 cursor-pointer"
          >
            {t('redeem')}
          </button>
        </form>

        {redeemMessage && (
          <p
            role="status"
            className={`mt-3 text-sm ${
              redeemMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {redeemMessage.text}
          </p>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_VOUCHERS.map((voucher) => (
            <article
              key={voucher.id}
              className={`relative overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
                voucher.status === 'active' ? 'border-gray-100' : 'border-gray-100 opacity-80'
              }`}
            >
              <div className="border-b border-dashed border-gray-200 bg-gradient-to-r from-green-50 to-white px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold text-green-600">
                      {discountLabel(voucher, t, formatPrice)}
                    </p>
                    <h2 className="mt-1 font-semibold text-gray-900">{voucher.title}</h2>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles(voucher.status)}`}
                  >
                    {t(`status.${voucher.status}`)}
                  </span>
                </div>
              </div>

              <div className="px-5 py-4">
                <p className="text-sm text-gray-600">{voucher.description}</p>

                {voucher.minOrder != null && voucher.minOrder > 0 && (
                  <p className="mt-2 text-xs text-gray-500">
                    {t('minOrder', { amount: formatPrice(voucher.minOrder) })}
                  </p>
                )}

                <p className="mt-3 text-xs text-gray-500">
                  {t('expires', { date: formatExpiry(voucher.expiresAt, locale) })}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <code className="flex-1 rounded-lg border border-dashed border-green-300 bg-green-50 px-3 py-2 text-sm font-bold tracking-wider text-green-700">
                    {voucher.code}
                  </code>
                  <button
                    type="button"
                    disabled={voucher.status !== 'active'}
                    onClick={() => copyCode(voucher)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    aria-label={t('copyCode', { code: voucher.code })}
                  >
                    {copiedId === voucher.id ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">{t('demoHint')}</p>
      </main>
    </div>
  );
}
