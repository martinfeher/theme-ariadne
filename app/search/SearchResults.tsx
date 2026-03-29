'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '@/lib/fetch-products';
import type { Product } from '../types/product';

export default function SearchResults() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <nav className="text-sm text-green-600" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-green-600">Search</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-2xl font-bold text-slate-900 md:text-3xl">
          {q.trim() ? (
            <>
              Search results for{' '}
              <span className="text-green-600">&quot;{q.trim()}&quot;</span>
            </>
          ) : (
            'Search results'
          )}
        </h1>
        {category && category !== 'all' && (
          <p className="mt-1 text-sm text-gray-500">
            Category filter: <span className="font-medium">{category}</span>
          </p>
        )}

        {status === 'loading' && (
          <p className="mt-10 text-gray-500">Loading products…</p>
        )}
        {status === 'error' && (
          <p className="mt-10 text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
        {status === 'ok' && (
          <>
            <p className="mt-4 text-gray-600">
              {products.length === 0
                ? hasQuery
                  ? 'No products matched your search.'
                  : 'Enter a search term or choose a category in the header, then search.'
                : `${products.length} product${products.length === 1 ? '' : 's'} found`}
            </p>
            {products.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    allProducts={allCatalog}
                  />
                ))}
              </div>
            )}
            {products.length === 0 && hasQuery && (
              <Link
                href="/"
                className="mt-8 inline-block rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white hover:bg-green-600"
              >
                Back to home
              </Link>
            )}
          </>
        )}
      </main>
    </div>
  );
}
