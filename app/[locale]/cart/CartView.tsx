'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import { useCart } from '@/app/context/CartContext';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { useProductI18n } from '@/app/hooks/useProductI18n';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/checkout-options';

function CartSummaryPanel({
  subtotal,
  itemCount,
  showCheckout,
}: {
  subtotal: number;
  itemCount: number;
  showCheckout?: boolean;
}) {
  const t = useTranslations('CartPage');
  const formatPrice = useFormatCurrency();
  const freeShippingLeft = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold text-gray-900">{t('summary')}</h2>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <dt>
            {itemCount === 1 ? t('itemsOne') : t('itemsMany', { count: itemCount })}
          </dt>
          <dd className="font-medium text-gray-900">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-gray-600">
          <dt>{t('shippingEstimate')}</dt>
          <dd className="text-gray-500">{t('calculatedAtCheckout')}</dd>
        </div>
      </dl>
      {freeShippingLeft > 0 && (
        <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
          {t('freeShippingHint', { amount: formatPrice(freeShippingLeft) })}
        </p>
      )}
      {subtotal >= FREE_SHIPPING_THRESHOLD && (
        <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
          {t('freeShippingUnlocked')}
        </p>
      )}
      <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-base font-bold text-gray-900">
        <span>{t('subtotal')}</span>
        <span className="text-green-600">{formatPrice(subtotal)}</span>
      </div>
      {showCheckout && (
        <Link
          href="/checkout"
          className="mt-5 flex w-full items-center justify-center rounded-lg bg-green-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
        >
          {t('proceedCheckout')}
        </Link>
      )}
      <Link
        href="/category/all"
        className="mt-3 block text-center text-sm font-medium text-green-600 hover:text-green-700"
      >
        {t('continueShopping')}
      </Link>
    </div>
  );
}

export default function CartView() {
  const t = useTranslations('CartPage');
  const tCart = useTranslations('Cart');
  const tHeader = useTranslations('Header');
  const { getProductName } = useProductI18n();
  const formatPrice = useFormatCurrency();
  const {
    lines,
    itemCount,
    subtotal,
    removeLine,
    removeOne,
    addItem,
    setQuantity,
  } = useCart();

  return (
    <PageShell>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-green-600" aria-label={t('breadcrumbNav')}>
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                {tHeader('home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-gray-800">{t('breadcrumbCart')}</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>

        {lines.length === 0 ? (
          <div className="mx-auto mt-12 max-w-md rounded-2xl border border-gray-100 bg-white px-8 py-14 text-center shadow-sm">
            <ShoppingCart className="mx-auto h-14 w-14 text-gray-300" strokeWidth={1.25} aria-hidden />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">{t('emptyTitle')}</h2>
            <p className="mt-2 text-sm text-gray-600">{tCart('empty')}</p>
            <Link
              href="/category/all"
              className="mt-8 inline-flex rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              {t('continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="hidden border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:grid sm:grid-cols-[1fr_120px_100px_80px]">
                  <span>{t('product')}</span>
                  <span className="text-center">{t('price')}</span>
                  <span className="text-center">{t('quantity')}</span>
                  <span className="text-right">{t('lineTotal')}</span>
                </div>
                <ul className="divide-y divide-gray-100">
                  {lines.map(({ product, quantity }) => {
                    const name = getProductName(product);
                    const outOfStock = product.inStock === false;
                    return (
                      <li
                        key={product.id}
                        className="grid gap-4 px-5 py-4 sm:grid-cols-[1fr_120px_100px_80px] sm:items-center"
                      >
                        <div className="flex gap-4">
                          <Link
                            href={`/product/${product.id}`}
                            className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50"
                          >
                            <Image
                              src={product.image}
                              alt={name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </Link>
                          <div className="min-w-0">
                            <Link
                              href={`/product/${product.id}`}
                              className="font-medium text-gray-900 hover:text-green-600 line-clamp-2"
                            >
                              {name}
                            </Link>
                            {outOfStock && (
                              <p className="mt-1 text-xs font-medium text-red-600">
                                {t('outOfStock')}
                              </p>
                            )}
                            <button
                              type="button"
                              onClick={() => removeLine(product.id)}
                              className="mt-2 flex items-center gap-1 text-xs text-red-600 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" aria-hidden />
                              {tCart('removeLine')}
                            </button>
                          </div>
                        </div>
                        <p className="text-center text-sm font-medium text-gray-900 sm:block">
                          <span className="mr-2 text-gray-500 sm:hidden">{t('price')}:</span>
                          {formatPrice(product.price)}
                        </p>
                        <div className="flex justify-center">
                          <div className="flex items-center rounded-lg border border-gray-200">
                            <button
                              type="button"
                              className="p-2 text-gray-600 hover:bg-gray-50 cursor-pointer disabled:opacity-40"
                              aria-label={tCart('decreaseQty')}
                              disabled={outOfStock}
                              onClick={() =>
                                quantity <= 1
                                  ? removeLine(product.id)
                                  : removeOne(product.id)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <input
                              type="number"
                              min={1}
                              max={99}
                              value={quantity}
                              disabled={outOfStock}
                              onChange={(e) =>
                                setQuantity(product.id, Number(e.target.value))
                              }
                              className="w-10 border-x border-gray-200 py-2 pl-[13px] text-center text-sm font-medium outline-none"
                              aria-label={t('quantity')}
                            />
                            <button
                              type="button"
                              className="p-2 text-gray-600 hover:bg-gray-50 cursor-pointer disabled:opacity-40"
                              aria-label={tCart('increaseQty')}
                              disabled={outOfStock}
                              onClick={() => addItem(product, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-right text-sm font-bold text-gray-900">
                          <span className="mr-2 text-gray-500 sm:hidden">{t('lineTotal')}:</span>
                          {formatPrice(product.price * quantity)}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div>
              <CartSummaryPanel subtotal={subtotal} itemCount={itemCount} showCheckout />
            </div>
          </div>
        )}
      </main>
    </PageShell>
  );
}
