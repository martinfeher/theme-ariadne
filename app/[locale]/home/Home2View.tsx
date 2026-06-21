'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Home as HomeIcon, Truck, Shield, Headphones } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import ProductCard from '@/app/components/ProductCard';
import CategorySidebar, {
  type CategorySidebarSlug,
} from '@/app/components/category/CategorySidebar';
import type { Product } from '@/app/types/product';
import { fetchProducts } from '@/lib/fetch-products';

export default function Home2View() {
  const t = useTranslations('Home2');
  const tHeader = useTranslations('Header');
  const tBar = useTranslations('SearchBar.categories');
  const [activeCategory, setActiveCategory] = useState<CategorySidebarSlug>('all');
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

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => p.categories?.includes(activeCategory) ?? false);
  }, [products, activeCategory]);

  const sectionTitle =
    activeCategory === 'all'
      ? t('productsAll')
      : t('productsInCategory', { category: tBar(activeCategory as Parameters<typeof tBar>[0]) });

  const perks = [
    { icon: Truck, titleKey: 'perkShippingTitle', descKey: 'perkShippingDesc' },
    { icon: Shield, titleKey: 'perkSecureTitle', descKey: 'perkSecureDesc' },
    { icon: Headphones, titleKey: 'perkSupportTitle', descKey: 'perkSupportDesc' },
  ] as const;

  return (
    <PageShell>

      <main>
        <section
          className="border-b border-emerald-100/80"
          style={{ backgroundColor: '#E8F8F1' }}
        >
          <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-10">
            <nav
              className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600"
              aria-label={t('breadcrumbNav')}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1 rounded-md hover:text-[#3BB77E]"
              >
                <HomeIcon className="h-4 w-4" aria-hidden />
                <span>{tHeader('home')}</span>
              </Link>
              <span className="text-slate-400" aria-hidden>
                /
              </span>
              <span className="font-medium text-slate-800">{tHeader('homeMenu2')}</span>
            </nav>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">{t('heroSubtitle')}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {perks.map(({ icon: Icon, titleKey, descKey }) => (
                <div
                  key={titleKey}
                  className="flex items-start gap-3 rounded-xl border border-white/80 bg-white/90 p-4 shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[#3BB77E]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{t(titleKey)}</p>
                    <p className="mt-0.5 text-sm text-slate-600">{t(descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 py-8 lg:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <CategorySidebar
              activeSlug={activeCategory}
              onCategorySelect={setActiveCategory}
              className="order-1 lg:order-none"
            />

            <div className="min-w-0 flex-1">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{sectionTitle}</h2>
                  {loadState === 'ok' && (
                    <p className="mt-1 text-sm text-gray-500">
                      {filteredProducts.length === 1
                        ? t('countOne')
                        : t('countMany', { count: filteredProducts.length })}
                    </p>
                  )}
                </div>
                {activeCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className="text-sm font-medium text-green-600 hover:text-green-700 cursor-pointer"
                  >
                    {t('clearFilter')}
                  </button>
                )}
              </div>

              {loadState === 'loading' && (
                <p className="py-16 text-center text-gray-500">{t('loading')}</p>
              )}
              {loadState === 'error' && (
                <p className="py-16 text-center text-red-600">{t('error')}</p>
              )}
              {loadState === 'ok' && filteredProducts.length === 0 && (
                <p className="py-16 text-center text-gray-500">{t('noProducts')}</p>
              )}
              {loadState === 'ok' && filteredProducts.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      allProducts={products}
                      size="small"
                      flyToCartOnAdd
                    />
                  ))}
                </div>
              )}

              {loadState === 'ok' && activeCategory !== 'all' && (
                <div className="mt-8 text-center">
                  <Link
                    href={`/category/${activeCategory}`}
                    className="inline-flex rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                  >
                    {t('shopCategory')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
