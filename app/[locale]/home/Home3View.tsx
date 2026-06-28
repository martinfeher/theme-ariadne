'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Flame, Home as HomeIcon, Sparkles, Tag, Truck } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import ProductCard from '@/app/components/ProductCard';
import CategorySidebar, {
  type CategorySidebarSlug,
} from '@/app/components/category/CategorySidebar';
import type { Product } from '@/app/types/product';
import { fetchProducts } from '@/lib/fetch-products';
import { getDealProducts } from '@/lib/deals';

type SortId = 'featured' | 'priceAsc' | 'priceDesc' | 'rating';

const PROMO_BANNERS = [
  {
    key: 'bannerFresh',
    href: '/category/vegetables',
    image: '/images/products/mock/fresh_broccoli.jpg',
    tone: 'from-emerald-600/90 to-emerald-800/80',
  },
  {
    key: 'bannerBreakfast',
    href: '/category/milks-dairies',
    image: '/images/products/mock/pear.jpeg',
    tone: 'from-amber-500/90 to-orange-600/80',
  },
  {
    key: 'bannerOrganic',
    href: '/category/fruits',
    image: '/images/products/mock/organic_carrots.jpeg',
    tone: 'from-green-600/90 to-teal-700/80',
  },
] as const;

export default function Home3View() {
  const t = useTranslations('Home3');
  const tHeader = useTranslations('Header');
  const tBar = useTranslations('SearchBar.categories');
  const [activeCategory, setActiveCategory] = useState<CategorySidebarSlug>('all');
  const [activeSubcategoryKey, setActiveSubcategoryKey] = useState<string | null>(null);
  const [sort, setSort] = useState<SortId>('featured');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ok' | 'error'>('loading');

  const handleCategorySelect = useCallback(
    (slug: CategorySidebarSlug, subcategoryKey?: string | null) => {
      setActiveCategory(slug);
      setActiveSubcategoryKey(subcategoryKey ?? null);
    },
    []
  );

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
    let list =
      activeCategory === 'all'
        ? products
        : products.filter((p) => p.categories?.includes(activeCategory) ?? false);

    switch (sort) {
      case 'priceAsc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  }, [products, activeCategory, sort]);

  const dealCount = useMemo(() => getDealProducts(products).length, [products]);

  const sectionTitle =
    activeCategory === 'all'
      ? t('productsAll')
      : t('productsInCategory', { category: tBar(activeCategory as Parameters<typeof tBar>[0]) });

  return (
    <PageShell>

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
            <nav
              className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600"
              aria-label={t('breadcrumbNav')}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1 rounded-md hover:text-[#3BB77E]"
              >
                <HomeIcon className="h-4 w-4" aria-hidden />
                {tHeader('home')}
              </Link>
              <span className="text-slate-400" aria-hidden>
                /
              </span>
              <span className="font-medium text-slate-800">{tHeader('homeMenu3')}</span>
            </nav>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {t('heroTitle')}
                </h1>
                <p className="mt-2 text-slate-600">{t('heroSubtitle')}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/deals"
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  <Flame className="h-4 w-4" aria-hidden />
                  {t('dealsCta')}
                  {dealCount > 0 && (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{dealCount}</span>
                  )}
                </Link>
                <Link
                  href="/category/all"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-green-300 hover:text-green-700"
                >
                  <Tag className="h-4 w-4" aria-hidden />
                  {t('shopAllCta')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 py-8 lg:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                {PROMO_BANNERS.map(({ key, href, image, tone }) => (
                  <Link
                    key={key}
                    href={href}
                    className="group relative overflow-hidden rounded-xl shadow-sm"
                  >
                    <div className="relative aspect-[16/10] min-h-[120px]">
                      <Image
                        src={image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 280px"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr ${tone} mix-blend-multiply`}
                        aria-hidden
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-4">
                        <p className="text-sm font-bold leading-snug text-white sm:text-base">
                          {t(key)}
                        </p>
                        <span className="mt-1 text-xs font-medium text-white/90">
                          {t('bannerShopNow')} →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-900">
                <Truck className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                {t('perkBanner')}
              </div>

              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
                    <Sparkles className="h-5 w-5 text-green-600" aria-hidden />
                    {sectionTitle}
                  </h2>
                  {loadState === 'ok' && (
                    <p className="mt-1 text-sm text-gray-500">
                      {filteredProducts.length === 1
                        ? t('countOne')
                        : t('countMany', { count: filteredProducts.length })}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {activeCategory !== 'all' && (
                    <button
                      type="button"
                      onClick={() => handleCategorySelect('all', null)}
                      className="cursor-pointer text-sm font-medium text-green-600 hover:text-green-700"
                    >
                      {t('clearFilter')}
                    </button>
                  )}
                  <label htmlFor="home3-sort" className="sr-only">
                    {t('sortLabel')}
                  </label>
                  <select
                    id="home3-sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortId)}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  >
                    <option value="featured">{t('sortFeatured')}</option>
                    <option value="priceAsc">{t('sortPriceAsc')}</option>
                    <option value="priceDesc">{t('sortPriceDesc')}</option>
                    <option value="rating">{t('sortRating')}</option>
                  </select>
                </div>
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
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3 xl:gap-5">
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

            <CategorySidebar
              activeSlug={activeCategory}
              activeSubcategoryKey={activeSubcategoryKey}
              onCategorySelect={handleCategorySelect}
            />
          </div>
        </div>
      </main>
    </PageShell>
  );
}
