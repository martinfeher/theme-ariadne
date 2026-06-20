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
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('title')}</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {TAB_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  activeTab === id ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-500'
                }`}
              >
                {t(`tabs.${id}`)}
              </button>
            ))}
          </div>
        </div>

        {loadState === 'loading' && (
          <p className="text-center text-gray-500 py-12">{t('loading')}</p>
        )}
        {loadState === 'error' && (
          <p className="text-center text-red-600 py-12">{t('error')}</p>
        )}
        {loadState === 'ok' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
              <p className="text-center text-gray-500 py-12">{t('noProducts')}</p>
            )}

            {filteredProducts.length < products.length && activeTab !== 'all' && (
              <div className="text-center mt-8">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
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
