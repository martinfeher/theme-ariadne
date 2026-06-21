'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
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

const PopularProducts: React.FC = () => {
  const t = useTranslations('PopularProducts');
  const [activeTab, setActiveTab] = useState<TabId>('all');
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

  const filteredProducts =
    activeTab === 'all'
      ? products
      : products.filter((product) => product.categories?.includes(activeTab) ?? false);

  return (
    <section className="relative bg-white py-8 sm:py-10 lg:py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-2 flex flex-col gap-5 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
          <h2 className="shrink-0 text-2xl font-bold tracking-tight text-[#253D4E] sm:text-3xl lg:text-[32px]">
            {t('title')}
          </h2>
          <div className="flex flex-col mt-1 gap-2">
            <p className="text-sm text-gray-500 w-[400px]">
              {t('subtitle')}
            </p>
          </div>
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label={t('title')}
          >
            {TAB_IDS.map((id) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(id)}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-[13px]! font-medium transition-colors duration-200 sm:text-base ${
                    isActive
                      ? 'bg-[#3BB77E] text-white shadow-sm'
                      : 'border border-gray-200 bg-white text-gray-500 hover:border-[#3BB77E]/40 hover:text-[#3BB77E]'
                  }`}
                >
                  {t(`tabs.${id}`)}
                </button>
              );
            })}
          </div>
        </div>
        <hr className="mb-8 border-gray-100" />

        {loadState === 'loading' && (
          <p className="py-12 text-center text-gray-500">{t('loading')}</p>
        )}
        {loadState === 'error' && (
          <p className="py-12 text-center text-red-600">{t('error')}</p>
        )}
        {loadState === 'ok' && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
              {filteredProducts.map((product) => (
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

            {filteredProducts.length < products.length && activeTab !== 'all' && (
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
