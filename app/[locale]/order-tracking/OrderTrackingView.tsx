'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Package, Search, Truck } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { useProductI18n } from '@/app/hooks/useProductI18n';
import { MOCK_PRODUCTS } from '@/lib/mock-products';
import { normalizeLoginIdentifier } from '@/lib/auth-demo';
import { findTrackedOrder } from '@/lib/order-history';
import {
  ORDER_STATUS_FLOW,
  orderSubtotal,
  orderTotal,
  statusStepIndex,
  type MockOrder,
  type OrderStatus,
} from '@/lib/mock-orders';

function formatDateTime(iso: string, locale: string) {
  return new Date(iso).toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDate(iso: string, locale: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function statusBadgeClass(status: OrderStatus) {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-700';
    case 'shipped':
      return 'bg-blue-100 text-blue-700';
    case 'processing':
      return 'bg-amber-100 text-amber-800';
    case 'pending':
      return 'bg-gray-100 text-gray-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
  }
}

function OrderTimeline({ order }: { order: MockOrder }) {
  const t = useTranslations('OrderTracking');
  const current = statusStepIndex(order.status);

  if (order.status === 'cancelled') {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {t('cancelledNotice')}
      </p>
    );
  }

  return (
    <ol className="grid gap-4 sm:grid-cols-4">
      {ORDER_STATUS_FLOW.map((step, index) => {
        const done = index <= current;
        const active = index === current;
        return (
          <li key={step} className="relative flex flex-col items-center text-center">
            {index < ORDER_STATUS_FLOW.length - 1 && (
              <span
                className={`absolute left-[calc(50%+1.25rem)] top-5 hidden h-0.5 w-[calc(100%-2.5rem)] sm:block ${
                  index < current ? 'bg-green-500' : 'bg-gray-200'
                }`}
                aria-hidden
              />
            )}
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${
                done
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-200 bg-white text-gray-400'
              } ${active ? 'ring-4 ring-green-100' : ''}`}
            >
              {index + 1}
            </span>
            <span
              className={`mt-2 text-xs font-semibold sm:text-sm ${
                done ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {t(`steps.${step}`)}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function OrderResult({ order }: { order: MockOrder }) {
  const t = useTranslations('OrderTracking');
  const locale = useLocale();
  const formatPrice = useFormatCurrency();
  const { getProductName } = useProductI18n();

  const subtotal = orderSubtotal(order);
  const total = orderTotal(order);

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">{t('orderNumber')}</p>
            <p className="text-xl font-bold text-gray-900">{order.id}</p>
            <p className="mt-1 text-sm text-gray-600">
              {t('placedOn', { date: formatDateTime(order.placedAt, locale) })}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusBadgeClass(order.status)}`}
          >
            {t(`status.${order.status}`)}
          </span>
        </div>

        <div className="mt-8">
          <OrderTimeline order={order} />
        </div>

        {(order.trackingNumber || order.estimatedDelivery) && order.status !== 'cancelled' && (
          <div className="mt-8 grid gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-2">
            {order.trackingNumber && (
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {t('trackingNumber')}
                  </p>
                  <p className="font-semibold text-gray-900">{order.trackingNumber}</p>
                  {order.carrier && (
                    <p className="text-sm text-gray-600">{order.carrier}</p>
                  )}
                </div>
              </div>
            )}
            {order.estimatedDelivery && order.status !== 'delivered' && (
              <div className="flex items-start gap-3">
                <Package className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {t('estimatedDelivery')}
                  </p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(order.estimatedDelivery, locale)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <h2 className="border-b border-gray-100 px-5 py-4 text-lg font-semibold text-gray-900">
          {t('itemsHeading')}
        </h2>
        <ul className="divide-y divide-gray-100">
          {order.lines.map((line) => {
            const product = MOCK_PRODUCTS.find((p) => p.id === line.productId);
            if (!product) return null;
            const name = getProductName(product);
            const lineTotal = product.price * line.quantity;
            return (
              <li key={line.productId} className="flex items-center gap-4 px-5 py-4">
                <Link
                  href={`/product/${product.id}`}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50"
                >
                  <Image src={product.image} alt={name} fill className="object-cover" sizes="64px" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${product.id}`}
                    className="font-medium text-gray-900 hover:text-green-600 line-clamp-2"
                  >
                    {name}
                  </Link>
                  <p className="mt-1 text-sm text-gray-500">
                    {t('qtyPrice', {
                      qty: line.quantity,
                      price: formatPrice(product.price),
                    })}
                  </p>
                </div>
                <p className="shrink-0 font-semibold text-gray-900">{formatPrice(lineTotal)}</p>
              </li>
            );
          })}
        </ul>
        <div className="space-y-2 border-t border-gray-100 px-5 py-4 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>{t('subtotal')}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>{t('shipping')}</span>
            <span>{order.shipping === 0 ? t('freeShipping') : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900">
            <span>{t('total')}</span>
            <span className="text-green-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderTrackingView() {
  const t = useTranslations('OrderTracking');
  const tHeader = useTranslations('Header');
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<MockOrder | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const qOrder = searchParams.get('order');
    const qEmail = searchParams.get('email');
    if (qOrder) setOrderId(qOrder.toUpperCase());
    if (qEmail) setEmail(qEmail);
    if (qOrder && qEmail) {
      const order = findTrackedOrder(qOrder, normalizeLoginIdentifier(qEmail));
      if (order) setResult(order);
    }
  }, [searchParams]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setNotFound(false);
    setResult(null);

    const order = findTrackedOrder(orderId, normalizeLoginIdentifier(email));
    if (order) {
      setResult(order);
    } else {
      setNotFound(true);
    }
    setSubmitting(false);
  };

  return (
    <PageShell>
      <main className="container mx-auto max-w-3xl px-4 py-8 lg:py-12">
        <nav className="text-sm text-green-600" aria-label={t('breadcrumbNav')}>
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                {tHeader('home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-gray-800">{t('breadcrumbTracking')}</li>
          </ol>
        </nav>

        <div className="mt-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>
          <p className="mt-2 text-sm text-gray-600">{t('subtitle')}</p>
        </div>

        <form
          onSubmit={handleTrack}
          className="mt-8 rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="order-id" className="mb-1.5 block text-sm font-medium text-gray-700">
                {t('orderIdLabel')}
              </label>
              <input
                id="order-id"
                type="text"
                value={orderId}
                onChange={(e) => {
                  setOrderId(e.target.value.toUpperCase());
                  setNotFound(false);
                }}
                placeholder={t('orderIdPlaceholder')}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm uppercase outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                required
              />
            </div>
            <div>
              <label htmlFor="order-email" className="mb-1.5 block text-sm font-medium text-gray-700">
                {t('emailLabel')}
              </label>
              <input
                id="order-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setNotFound(false);
                }}
                placeholder={t('emailPlaceholder')}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:opacity-60 cursor-pointer"
          >
            <Search className="h-4 w-4" aria-hidden />
            {submitting ? t('tracking') : t('trackOrder')}
          </button>

          <p className="mt-4 text-center text-xs text-gray-400">{t('demoHint')}</p>
        </form>

        {notFound && (
          <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {t('notFound')}
          </p>
        )}

        {result && <OrderResult order={result} />}

        {!result && !notFound && (
          <div className="mt-10 rounded-xl border border-dashed border-gray-200 bg-white/60 px-6 py-10 text-center">
            <Package className="mx-auto h-10 w-10 text-gray-300" aria-hidden />
            <p className="mt-3 text-sm text-gray-500">{t('emptyHint')}</p>
          </div>
        )}
      </main>
    </PageShell>
  );
}
