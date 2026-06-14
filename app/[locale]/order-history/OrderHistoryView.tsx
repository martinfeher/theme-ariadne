'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { ChevronRight, Package, ShoppingBag } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import AccountSidebar from '@/app/components/AccountSidebar';
import { useAuth } from '@/app/context/AuthContext';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { useProductI18n } from '@/app/hooks/useProductI18n';
import { getOrdersForEmail } from '@/lib/order-history';
import { MOCK_PRODUCTS } from '@/lib/mock-products';
import { orderTotal, type MockOrder, type OrderStatus } from '@/lib/mock-orders';

function formatDateTime(iso: string, locale: string) {
  return new Date(iso).toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
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

function OrderCard({ order, email }: { order: MockOrder; email: string }) {
  const t = useTranslations('OrderHistory');
  const tStatus = useTranslations('OrderTracking');
  const locale = useLocale();
  const formatPrice = useFormatCurrency();
  const { getProductName } = useProductI18n();

  const itemCount = order.lines.reduce((sum, line) => sum + line.quantity, 0);
  const previewLines = order.lines.slice(0, 3);
  const trackingHref = `/order-tracking?order=${encodeURIComponent(order.id)}&email=${encodeURIComponent(email)}`;

  return (
    <article className="rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {t('orderNumber')}
          </p>
          <p className="mt-0.5 font-bold text-gray-900">{order.id}</p>
          <p className="mt-1 text-sm text-gray-600">
            {t('placedOn', { date: formatDateTime(order.placedAt, locale) })}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusBadgeClass(order.status)}`}
        >
          {tStatus(`status.${order.status}`)}
        </span>
      </div>

      <div className="px-5 py-4">
        <ul className="space-y-3">
          {previewLines.map((line) => {
            const product = MOCK_PRODUCTS.find((p) => p.id === line.productId);
            if (!product) return null;
            const name = getProductName(product);
            return (
              <li key={line.productId} className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                  <Image src={product.image} alt={name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">
                    {t('qtyLabel', { qty: line.quantity })}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        {order.lines.length > previewLines.length && (
          <p className="mt-2 text-xs text-gray-500">
            {t('moreItems', { count: order.lines.length - previewLines.length })}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
        <div>
          <p className="text-xs text-gray-500">{t('itemCount', { count: itemCount })}</p>
          <p className="text-lg font-bold text-green-600">{formatPrice(orderTotal(order))}</p>
        </div>
        <Link
          href={trackingHref}
          className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
        >
          {t('viewDetails')}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export default function OrderHistoryView() {
  const t = useTranslations('OrderHistory');
  const tHeader = useTranslations('Header');
  const tAuth = useTranslations('Auth');
  const router = useRouter();
  const { user, isReady, logout } = useAuth();
  const [orders, setOrders] = useState<MockOrder[]>([]);

  useEffect(() => {
    if (isReady && !user) {
      router.replace('/login');
    }
  }, [isReady, user, router]);

  useEffect(() => {
    if (user) {
      setOrders(getOrdersForEmail(user.email));
    }
  }, [user]);

  const handleSignOut = () => {
    logout();
    router.push('/login');
  };

  if (!isReady || !user) {
    return (
      <PageShell>
        <main className="container mx-auto px-4 py-16 text-center text-gray-500">
          {tAuth('loading')}
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-gray-500" aria-label={t('breadcrumbNav')}>
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-600">
                {tHeader('home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/account" className="hover:text-green-600">
                {t('accountBreadcrumb')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-gray-800">{t('breadcrumb')}</li>
          </ol>
        </nav>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
          <AccountSidebar user={user} activeHref="/order-history" onSignOut={handleSignOut} />

          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <Package className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>
                <p className="mt-2 text-gray-600">{t('subtitle')}</p>
              </div>
            </div>

            {orders.length > 0 ? (
              <div className="mt-8 space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} email={user.email} />
                ))}
                <p className="text-center text-xs text-gray-400">{t('demoHint')}</p>
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
                <ShoppingBag className="mx-auto h-10 w-10 text-gray-300" aria-hidden />
                <h2 className="mt-4 text-lg font-semibold text-gray-900">{t('emptyTitle')}</h2>
                <p className="mt-2 text-sm text-gray-600">{t('emptyDesc')}</p>
                <Link
                  href="/category/all"
                  className="mt-6 inline-flex rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                >
                  {t('shopCta')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
