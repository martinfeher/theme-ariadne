'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PageShell from '@/app/components/PageShell';
import ProductCard from '@/app/components/ProductCard';
import { fetchProducts } from '@/lib/fetch-products';
import type { Product } from '@/app/types/product';

const FILTER_CATEGORY_SLUGS = [
  'milks-dairies',
  'wines-alcohol',
  'clothing-beauty',
  'pet-foods-toy',
  'fast-food',
  'baking-material',
  'vegetables',
  'fresh-seafood',
  'noodles-rice',
  'ice-cream',
  'coffees-teas',
  'pet-foods',
  'meats',
  'fruits',
] as const;

type FilterCategorySlug = (typeof FILTER_CATEGORY_SLUGS)[number];

function isFilterCategorySlug(s: string): s is FilterCategorySlug {
  return (FILTER_CATEGORY_SLUGS as readonly string[]).includes(s);
}

export default function SearchResults() {
  const t = useTranslations('Search');
  const tBar = useTranslations('SearchBar');
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? '';

  const [products, setProducts] = useState<Product[]>([]);
  const [allCatalog, setAllCatalog] = useState<Product[]>([]);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    Promise.all([
      fetchProducts({ q: q || undefined, category: category || undefined }),
      fetchProducts(),
    ])
      .then(([filtered, full]) => {
        if (!cancelled) {
          setProducts(filtered.products);
          setAllCatalog(full.products);
          setStatus('ok');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [q, category]);

  const hasQuery = Boolean(q.trim() || (category && category !== 'all'));

  const categoryDisplay =
    category && category !== 'all'
      ? isFilterCategorySlug(category)
        ? tBar(`categories.${category}`)
        : category
      : null;

  const foundLine =
    products.length === 0
      ? hasQuery
        ? t('noneWithQuery')
        : t('emptyHint')
      : products.length === 1
        ? t('foundOne')
        : t('found', { count: products.length });

  return (
    <PageShell>

      <main className="container mx-auto px-4 py-10">
        <nav className="text-sm text-green-600" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                {t('breadcrumbHome')}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-green-600">{t('breadcrumbSearch')}</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-2xl font-bold text-slate-900 md:text-3xl">
          {q.trim() ? (
            <>
              {t('resultsFor')}{' '}
              <span className="text-green-600">&quot;{q.trim()}&quot;</span>
            </>
          ) : (
            t('resultsTitle')
          )}
        </h1>
        {categoryDisplay && (
          <p className="mt-1 text-sm text-gray-500">
            {t('categoryFilter')}{' '}
            <span className="font-medium">{categoryDisplay}</span>
          </p>
        )}

        {status === 'loading' && (
          <p className="mt-10 text-gray-500">{t('loading')}</p>
        )}
        {status === 'error' && (
          <p className="mt-10 text-red-600">{t('error')}</p>
        )}
        {status === 'ok' && (
          <>
            <p className="mt-4 text-gray-600">{foundLine}</p>
            {products.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    allProducts={allCatalog}
                    size="medium"
                    linkToProductPage
                  />
                ))}
              </div>
            )}
            {products.length === 0 && hasQuery && (
              <Link
                href="/"
                className="mt-8 inline-block rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white hover:bg-green-600"
              >
                {t('backHome')}
              </Link>
            )}
          </>
        )}
      </main>
    </PageShell>
  );
}
