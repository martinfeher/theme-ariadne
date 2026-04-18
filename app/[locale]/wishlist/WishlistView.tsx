'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { Link } from '@/i18n/navigation';
import { Trash2 } from 'lucide-react';
import Header from '@/app/components/Header';
import { useWishlist } from '@/app/context/WishlistContext';
import { useCart } from '@/app/context/CartContext';
import type { Product } from '@/app/types/product';

function isInStock(product: Product) {
  return product.inStock !== false;
}

function StarRating({ rating, ratingCount }: { rating: number; ratingCount: number }) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="mt-1 flex items-center">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 fill-current ${
              i < filledStars
                ? 'text-yellow-400'
                : i === filledStars && hasHalfStar
                  ? 'text-yellow-400'
                  : 'text-gray-300'
            }`}
            viewBox="0 0 20 20"
            aria-hidden
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <span className="ml-2 text-sm text-gray-500">({ratingCount})</span>
    </div>
  );
}

export default function WishlistView() {
  const t = useTranslations('Wishlist');
  const tHeader = useTranslations('Header');
  const formatPrice = useFormatCurrency();
  const { items, removeFromWishlist } = useWishlist();
  const { addItem, openCart } = useCart();
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    setSelected((prev) => {
      const ids = new Set(items.map((p) => p.id));
      const next = new Set<number>();
      prev.forEach((id) => {
        if (ids.has(id)) next.add(id);
      });
      return next;
    });
  }, [items]);

  const allIds = useMemo(() => items.map((p) => p.id), [items]);
  const allSelected =
    items.length > 0 && selected.size === items.length;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(allIds));
  };

  const toggleRow = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const subtitle =
    items.length === 0
      ? t('emptySubtitle')
      : items.length === 1
        ? t('countOne')
        : t('countMany', { count: items.length });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-green-600" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                {tHeader('home')}
              </Link>
            </li>
            <li className="text-gray-400" aria-hidden>
              /
            </li>
            <li>
              <Link href="/" className="hover:text-green-700">
                {t('breadcrumbShop')}
              </Link>
            </li>
            <li className="text-gray-400" aria-hidden>
              /
            </li>
            <li className="font-medium text-green-600">{t('breadcrumbWishlist')}</li>
          </ol>
        </nav>

        <header className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-2 text-base text-gray-500">{subtitle}</p>
        </header>

        {items.length === 0 ? (
          <div className="mt-12 rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <p className="text-gray-600">{t('emptyHint')}</p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-600"
            >
              {t('continue')}
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100">
                    <th className="w-12 px-4 py-4 align-middle">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                        checked={allSelected}
                        onChange={toggleAll}
                        aria-label={t('selectAll')}
                      />
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                      {t('product')}
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                      {t('price')}
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                      {t('stockStatus')}
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">
                      {t('action')}
                    </th>
                    <th className="w-16 px-4 py-4 text-center text-sm font-semibold text-gray-700">
                      {t('removeCol')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((product) => {
                    const inStock = isInStock(product);
                    return (
                      <tr
                        key={product.id}
                        className="border-b border-gray-200 last:border-b-0"
                      >
                        <td className="px-4 py-6 align-middle">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                            checked={selected.has(product.id)}
                            onChange={() => toggleRow(product.id)}
                            aria-label={t('selectRow', { name: product.name })}
                          />
                        </td>
                        <td className="px-4 py-6 align-middle">
                          <div className="flex items-center gap-4">
                            <Link
                              href={`/product/${product.id}`}
                              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white"
                            >
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </Link>
                            <div className="min-w-0">
                              <Link
                                href={`/product/${product.id}`}
                                className="font-semibold text-green-600 hover:text-green-700 line-clamp-2"
                              >
                                {product.name}
                              </Link>
                              <StarRating
                                rating={product.rating}
                                ratingCount={product.ratingCount}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-6 align-middle">
                          <span className="text-xl font-bold text-green-600 tabular-nums">
                            {formatPrice(product.price)}
                          </span>
                        </td>
                        <td className="px-4 py-6 align-middle">
                          {inStock ? (
                            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                              {t('inStock')}
                            </span>
                          ) : (
                            <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800">
                              {t('outStock')}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-6 align-middle text-center">
                          {inStock ? (
                            <button
                              type="button"
                              onClick={() => {
                                addItem(product, 1);
                                openCart();
                              }}
                              className="rounded-md bg-green-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-600 cursor-pointer"
                            >
                              {t('addToCart')}
                            </button>
                          ) : (
                            <Link
                              href="/contact"
                              className="inline-block rounded-md bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-900"
                            >
                              {t('contactUs')}
                            </Link>
                          )}
                        </td>
                        <td className="px-4 py-6 align-middle text-center">
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(product.id)}
                            className="inline-flex rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600 cursor-pointer"
                            aria-label={t('removeFromWishlist', { name: product.name })}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
