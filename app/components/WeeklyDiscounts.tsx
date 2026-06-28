'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Tag } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';
import { fetchProducts } from '@/lib/fetch-products';
import { getWeeklyDealProducts } from '@/lib/deals';

const WeeklyDiscounts: React.FC = () => {
  const t = useTranslations('WeeklyDiscounts');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    setLoadState('loading');
    fetchProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data.products);
          setLoadState('ok');
        }
      })
      .catch(() => {
        if (!cancelled) setLoadState('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const weeklyDeals = useMemo(() => getWeeklyDealProducts(products), [products]);

  if (loadState === 'ok' && weeklyDeals.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-gray-50 py-6 lg:py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-2 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="flex shrink-0 items-center gap-2 text-2xl font-bold tracking-tight text-[#253D4E] sm:text-3xl lg:text-[32px]">
              <Tag className="h-6 w-6 text-orange-500" aria-hidden />
              {t('title')}
            </h2>
            <p className="mt-1 max-w-md text-sm text-gray-500">{t('subtitle')}</p>
          </div>
          <Link
            href="/deals"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#17A34B] transition-colors hover:text-green-700"
          >
            {t('viewAllDeals')}
            <span aria-hidden>→</span>
          </Link>
        </div>
        <hr className="mb-6 border-gray-200" />

        {loadState === 'loading' && (
          <p className="py-12 text-center text-gray-500">{t('loading')}</p>
        )}
        {loadState === 'error' && (
          <p className="py-12 text-center text-red-600">{t('error')}</p>
        )}
        {loadState === 'ok' && weeklyDeals.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
            {weeklyDeals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                allProducts={products}
                size="medium"
                flyToCartOnAdd
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WeeklyDiscounts;
