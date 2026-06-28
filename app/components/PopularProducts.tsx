'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Apple,
  Coffee,
  CupSoda,
  LayoutGrid,
  Leaf,
  Milk,
  Package,
  PawPrint,
  type LucideIcon,
} from 'lucide-react';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';
import { fetchProducts } from '@/lib/fetch-products';

const TAB_IDS = [
  'all',
  'fruits',
  'vegetables',
  'pet-foods',
  'coffees-teas',
  'drinks',
  'jam-jelly',
  'milks-dairies',
] as const;

type TabId = (typeof TAB_IDS)[number];

const TAB_ICONS: Record<TabId, LucideIcon> = {
  all: LayoutGrid,
  fruits: Apple,
  vegetables: Leaf,
  'pet-foods': PawPrint,
  'coffees-teas': Coffee,
  drinks: CupSoda,
  'jam-jelly': Package,
  'milks-dairies': Milk,
};

/** Two rows at the xl breakpoint (5 columns). */
const ROWS_PER_PAGE = 2;
const XL_COLUMNS = 5;
const PAGE_SIZE = ROWS_PER_PAGE * XL_COLUMNS;

const PopularProducts: React.FC = () => {
  const t = useTranslations('PopularProducts');
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeTab]);

  const filteredProducts =
    activeTab === 'all'
      ? products
      : products.filter((product) => product.categories?.includes(activeTab) ?? false);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  const activeCount = filteredProducts.length;

  return (
    <section className="relative bg-white py-6 lg:py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md shrink-0">
            <h2 className="text-2xl font-bold tracking-tight text-[#253D4E] sm:text-3xl lg:text-[32px]">
              {t('title')}
            </h2>
            <p className="mt-2 text-sm text-gray-500 sm:text-[15px]">{t('subtitle')}</p>
            {loadState === 'ok' && (
              <p className="mt-3 text-sm text-gray-500">
                {t('showingPrefix')}{' '}
                <span className="font-semibold text-[#253D4E]">{activeCount}</span>{' '}
                {t('showingMiddle')}{' '}
                <span className="font-semibold text-[#253D4E]">{t(`tabs.${activeTab}`)}</span>
              </p>
            )}
          </div>

          <div
            className="flex flex-wrap gap-2 lg:max-w-3xl lg:justify-end"
            role="tablist"
            aria-label={t('title')}
          >
            {TAB_IDS.map((id) => {
              const isActive = activeTab === id;
              const Icon = TAB_ICONS[id];

              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(id)}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#17A34B] text-white shadow-sm'
                      : 'border border-gray-200 bg-white text-gray-600 hover:border-[#17A34B]/30 hover:text-[#17A34B]'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`}
                    aria-hidden
                  />
                  <span>{t(`tabs.${id}`)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {loadState === 'loading' && (
          <p className="py-12 text-center text-gray-500">{t('loading')}</p>
        )}
        {loadState === 'error' && (
          <p className="py-12 text-center text-red-600">{t('error')}</p>
        )}
        {loadState === 'ok' && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  allProducts={products}
                  size="medium"
                  flyToCartOnAdd
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="py-12 text-center text-gray-500">{t('noProducts')}</p>
            )}

            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="cursor-pointer rounded-full border border-[#17A34B] bg-[#17A34B] px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#15803d]"
                >
                  {t('loadMore')}
                </button>
              </div>
            )}

            {filteredProducts.length < products.length && activeTab !== 'all' && !hasMore && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className="cursor-pointer rounded-lg bg-[#3BB77E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                >
                  {t('viewAll')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
