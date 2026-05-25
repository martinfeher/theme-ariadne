'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package } from 'lucide-react';
import Header from '@/app/components/Header';
import { useFormatCurrency } from '@/app/context/CurrencyContext';

export default function OrderConfirmationView() {
  const t = useTranslations('OrderConfirmation');
  const tHeader = useTranslations('Header');
  const formatPrice = useFormatCurrency();
  const searchParams = useSearchParams();

  const orderId = searchParams.get('order') ?? '';
  const email = searchParams.get('email') ?? '';
  const name = searchParams.get('name') ?? '';
  const totalRaw = searchParams.get('total');
  const total = totalRaw ? parseFloat(totalRaw) : null;

  const valid = Boolean(orderId && email);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto max-w-2xl px-4 py-8 lg:py-16">
        {valid ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-14">
            <CheckCircle2
              className="mx-auto h-16 w-16 text-green-500"
              strokeWidth={1.5}
              aria-hidden
            />
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>
            <p className="mt-3 text-gray-600">
              {name ? t('thanksName', { name }) : t('thanks')}
            </p>

            <div className="mt-8 rounded-xl bg-gray-50 p-5 text-left text-sm">
              <dl className="space-y-3">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">{t('orderNumber')}</dt>
                  <dd className="font-bold text-gray-900">{orderId}</dd>
                </div>
                {total != null && !Number.isNaN(total) && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">{t('totalPaid')}</dt>
                    <dd className="font-bold text-green-600">{formatPrice(total)}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">{t('confirmationEmail')}</dt>
                  <dd className="font-medium text-gray-900">{email}</dd>
                </div>
              </dl>
            </div>

            <p className="mt-6 text-sm text-gray-600">{t('emailHint')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={`/order-tracking?order=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-600"
              >
                <Package className="h-4 w-4" aria-hidden />
                {t('trackOrder')}
              </Link>
              <Link
                href="/category/all"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {t('continueShopping')}
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-gray-600">{t('invalid')}</p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-600"
            >
              {tHeader('home')}
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
