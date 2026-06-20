'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AlertCircle, ChevronDown, Filter, Home, LayoutGrid, PackageOpen, RefreshCw, X } from 'lucide-react';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { fetchProducts } from '@/lib/fetch-products';
import {
  CATEGORY_SIDEBAR_ICONS,
  type CategoryShopSlug,
} from '@/lib/category-shop';
import { countProductsWithCategorySlug } from '@/lib/mock-products';
import type { Product } from '@/app/types/product';
import ProductCard from './ProductCard';
import { useProductI18n } from '@/app/hooks/useProductI18n';

const BANNER_PATTERN =
  'url("data:image/svg+xml,%3Csvg width%3D%2280%22 height%3D%2280%22 viewBox%3D%220 0 80 80%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath d%3D%22M12 48c8-18 22-28 36-32M20 24c12 4 20 14 24 28M52 20c-6 14-6 28 2 40%22 fill%3D%22none%22 stroke%3D%22%233BB77E%22 stroke-opacity%3D%220.14%22 stroke-width%3D%221.2%22 stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E")';

const PAGE_SIZES = [12, 24, 50] as const;
type PageSize = (typeof PAGE_SIZES)[number];

const CATEGORY_SELECT_CLASS =
  'appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-10 text-sm text-slate-800 shadow-sm focus:border-[#3BB77E] focus:outline-none focus:ring-1 focus:ring-[#3BB77E] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50';

type SortId = 'featured' | 'priceAsc' | 'priceDesc' | 'rating';

function StarRow({ rating }: { rating: number }) {
  const filled = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${
            i < filled ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ProductGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5"
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
        >
          <div className="aspect-square animate-pulse bg-slate-100" />
          <div className="space-y-2 p-3">
            <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-2/5 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SidebarProductSkeleton() {
  return (
    <li className="flex gap-3" aria-hidden>
      <div className="h-16 w-16 shrink-0 animate-pulse rounded-lg bg-slate-100" />
      <div className="min-w-0 flex-1 space-y-2 py-1">
        <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
      </div>
    </li>
  );
}

function CategoryStatusPanel({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-400">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export default function CategoryShopView({ slug }: { slug: CategoryShopSlug }) {
  const t = useTranslations('Category');
  const { getProductName } = useProductI18n();
  const tDetail = useTranslations('ProductDetail');
  const tBar = useTranslations('SearchBar.categories');
  const formatPrice = useFormatCurrency();

  const [catalog, setCatalog] = useState<Product[]>([]);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  const [bannerTags, setBannerTags] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>(50);
  const [sort, setSort] = useState<SortId>('featured');
  const [draftPriceMin, setDraftPriceMin] = useState(0);
  const [draftPriceMax, setDraftPriceMax] = useState(80);
  const [appliedPriceMin, setAppliedPriceMin] = useState(0);
  const [appliedPriceMax, setAppliedPriceMax] = useState(80);
  const [retrying, setRetrying] = useState(false);

  const loadCatalog = useCallback(() => {
    setStatus('loading');
    return fetchProducts()
      .then((res) => {
        setCatalog(res.products);
        setStatus('ok');
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  useEffect(() => {
    setBannerTags([
      t('tagCabbage'),
      t('tagBroccoli'),
      t('tagArtichoke'),
      t('tagCelery'),
      t('tagSpinach'),
    ]);
  }, [t]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  useEffect(() => {
    setAppliedPriceMin(0);
    setAppliedPriceMax(80);
    setDraftPriceMin(0);
    setDraftPriceMax(80);
  }, [slug]);

  const categoryTitle = slug === 'all' ? t('allCategories') : tBar(slug);

  const inCategory = useMemo(() => {
    if (slug === 'all') return catalog;
    return catalog.filter((p) => p.categories?.includes(slug) ?? false);
  }, [catalog, slug]);

  const processed = useMemo(() => {
    let list = inCategory.filter(
      (p) => p.price >= appliedPriceMin && p.price <= appliedPriceMax
    );

    if (sort === 'priceAsc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'priceDesc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [inCategory, appliedPriceMin, appliedPriceMax, sort]);

  const visible = useMemo(() => processed.slice(0, pageSize), [processed, pageSize]);

  const newProductsSidebar = useMemo(() => {
    const sorted = [...catalog].sort((a, b) => b.id - a.id);
    return sorted.slice(0, 3);
  }, [catalog]);

  const removeBannerTag = (label: string) => {
    setBannerTags((prev) => prev.filter((x) => x !== label));
  };

  const applySidebarFilter = () => {
    setAppliedPriceMin(draftPriceMin);
    setAppliedPriceMax(draftPriceMax);
  };

  const clearPriceFilters = () => {
    setDraftPriceMin(0);
    setDraftPriceMax(80);
    setAppliedPriceMin(0);
    setAppliedPriceMax(80);
  };

  const handleRetry = () => {
    setRetrying(true);
    void loadCatalog().finally(() => setRetrying(false));
  };

  const isEmptyCategory = status === 'ok' && inCategory.length === 0;
  const isEmptyFromFilters =
    status === 'ok' && inCategory.length > 0 && processed.length === 0;

  const foundLabel =
    status === 'loading'
      ? t('loadingCount')
      : processed.length === 1
        ? t('foundItemsOne')
        : t('foundItems', { count: processed.length });

  const statusAnnouncement =
    status === 'loading'
      ? t('loading')
      : status === 'error'
        ? t('errorTitle')
        : isEmptyCategory
          ? t('emptyCategoryTitle')
          : isEmptyFromFilters
            ? t('emptyFiltersTitle')
            : foundLabel;

  return (
    <main>
      <section
        className="relative overflow-hidden border-b border-emerald-100/80"
        style={{
          backgroundColor: '#E8F8F1',
          backgroundImage: BANNER_PATTERN,
        }}
      >
        <div className="container mx-auto max-w-7xl px-4 py-10 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {categoryTitle}
              </h1>
              <nav
                className="mt-3 flex flex-wrap items-center gap-1.5 text-sm text-slate-600"
                aria-label={t('breadcrumbNav')}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 rounded-md hover:text-[#3BB77E]"
                >
                  <Home className="h-4 w-4" aria-hidden />
                  <span>{t('breadcrumbHome')}</span>
                </Link>
                <span className="text-slate-400" aria-hidden>
                  &gt;
                </span>
                <span>{t('breadcrumbShop')}</span>
                <span className="text-slate-400" aria-hidden>
                  &gt;
                </span>
                <span className="font-medium text-slate-800">{categoryTitle}</span>
              </nav>
            </div>

            {bannerTags.length > 0 && (
              <div className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
                {bannerTags.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100 cursor-pointer"
                  >
                    {label}
                    <button
                      type="button"
                      onClick={() => removeBannerTag(label)}
                      className="rounded-full p-0.5 text-[#3BB77E] hover:bg-emerald-50"
                      aria-label={t('removeTag', { label })}
                    >
                      <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1 py-2">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                className={`text-sm font-medium ${
                  status === 'loading' ? 'text-slate-400' : 'text-slate-700'
                }`}
              >
                {foundLabel}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <label htmlFor="category-page-size" className="flex items-center gap-2 text-sm text-slate-600">
                  <span>{t('show')}</span>
                  <div className="relative inline-flex">
                    <select
                      id="category-page-size"
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value) as PageSize)}
                      aria-label={t('ariaPageSize')}
                      disabled={status === 'loading'}
                      className={CATEGORY_SELECT_CLASS}
                    >
                      {PAGE_SIZES.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <span
                      className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-2 pr-2.5"
                      aria-hidden
                    >
                      <ChevronDown className="h-4 w-4 text-slate-500" strokeWidth={2} />
                    </span>
                  </div>
                </label>
                <label htmlFor="category-sort" className="flex items-center gap-2 text-sm text-slate-600">
                  <span>{t('sortBy')}</span>
                  <div className="relative inline-flex">
                    <select
                      id="category-sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortId)}
                      aria-label={t('ariaSort')}
                      disabled={status === 'loading'}
                      className={CATEGORY_SELECT_CLASS}
                    >
                      <option value="featured">{t('sortFeatured')}</option>
                      <option value="priceAsc">{t('sortPriceAsc')}</option>
                      <option value="priceDesc">{t('sortPriceDesc')}</option>
                      <option value="rating">{t('sortRating')}</option>
                    </select>
                    <span
                      className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-2 pr-2.5"
                      aria-hidden
                    >
                      <ChevronDown className="h-4 w-4 text-slate-500" strokeWidth={2} />
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <p className="sr-only" aria-live="polite">
              {statusAnnouncement}
            </p>

            {status === 'loading' && <ProductGridSkeleton count={pageSize > 12 ? 12 : pageSize} />}
            {status === 'error' && (
              <CategoryStatusPanel
                icon={<AlertCircle className="h-7 w-7" strokeWidth={1.5} />}
                title={t('errorTitle')}
                description={t('error')}
                action={
                  <button
                    type="button"
                    onClick={handleRetry}
                    disabled={retrying}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#3BB77E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#35a570] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${retrying ? 'animate-spin' : ''}`}
                      aria-hidden
                    />
                    {t('errorRetry')}
                  </button>
                }
              />
            )}
            {isEmptyCategory && (
              <CategoryStatusPanel
                icon={<PackageOpen className="h-7 w-7" strokeWidth={1.5} />}
                title={t('emptyCategoryTitle')}
                description={t('emptyCategoryDesc')}
                action={
                  <Link
                    href="/category/all"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#3BB77E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#35a570]"
                  >
                    {t('emptyCategoryCta')}
                  </Link>
                }
              />
            )}
            {isEmptyFromFilters && (
              <CategoryStatusPanel
                icon={<Filter className="h-7 w-7" strokeWidth={1.5} />}
                title={t('emptyFiltersTitle')}
                description={t('emptyFiltersDesc')}
                action={
                  <button
                    type="button"
                    onClick={clearPriceFilters}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden />
                    {t('emptyFiltersReset')}
                  </button>
                }
              />
            )}
            {status === 'ok' && visible.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
                {visible.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    allProducts={catalog}
                    size="small"
                    flyToCartOnAdd
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="w-full shrink-0 space-y-6 lg:w-[300px]">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                {tDetail('sidebarCategory')}
              </h2>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/category/all"
                    className={`flex items-center justify-between rounded-xl py-2.5 pl-1 pr-1 transition-colors ${
                      slug === 'all' ? 'bg-emerald-50 ring-1 ring-emerald-100' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#3BB77E]">
                        <LayoutGrid className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="truncate text-sm text-slate-700">{t('allCategories')}</span>
                    </span>
                    <span className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-[#3BB77E] px-2 text-xs font-semibold text-white">
                      {status === 'ok' ? catalog.length : '—'}
                    </span>
                  </Link>
                </li>
                {CATEGORY_SIDEBAR_ICONS.map(({ slug: catSlug, icon }) => {
                  const count = countProductsWithCategorySlug(catSlug);
                  const label = tBar(catSlug);
                  const active = slug === catSlug;
                  return (
                    <li key={catSlug}>
                      <Link
                        href={`/category/${catSlug}`}
                        className={`flex items-center justify-between rounded-xl py-2.5 pl-1 pr-1 transition-colors ${
                          active ? 'bg-emerald-50 ring-1 ring-emerald-100' : 'hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <Image
                            src={icon}
                            alt=""
                            width={28}
                            height={28}
                            className="shrink-0 opacity-80"
                          />
                          <span className="truncate text-sm text-slate-700">{label}</span>
                        </span>
                        <span className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-[#3BB77E] px-2 text-xs font-semibold text-white">
                          {count}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                {tDetail('sidebarFillPrice')}
              </h2>
              <div className="mb-4 space-y-3">
                <div>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    value={draftPriceMin}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setDraftPriceMin(Math.min(v, draftPriceMax));
                    }}
                    aria-label={t('ariaPriceMin')}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#3BB77E]"
                  />
                </div>
                <div>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    value={draftPriceMax}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setDraftPriceMax(Math.max(v, draftPriceMin));
                    }}
                    aria-label={t('ariaPriceMax')}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#3BB77E]"
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>
                    {tDetail('from')} {formatPrice(draftPriceMin)}
                  </span>
                  <span>
                    {tDetail('to')} {formatPrice(draftPriceMax)}
                  </span>
                </div>
              </div>
              <p className="mb-2 text-sm font-medium text-slate-800">{tDetail('color')}</p>
              <ul className="mb-4 space-y-2 text-sm text-slate-600">
                <li>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300 accent-[#3BB77E]" readOnly />
                    {tDetail('colorRed')} (12)
                  </label>
                </li>
                <li>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300 accent-[#3BB77E]" readOnly />
                    {tDetail('colorGreen')} (4)
                  </label>
                </li>
                <li>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300 accent-[#3BB77E]" readOnly />
                    {tDetail('colorBlue')} (8)
                  </label>
                </li>
              </ul>
              <p className="mb-2 text-sm font-medium text-slate-800">{tDetail('itemCondition')}</p>
              <ul className="mb-4 space-y-2 text-sm text-slate-600">
                <li>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300 accent-[#3BB77E]" readOnly />
                    {tDetail('condNew')} (6)
                  </label>
                </li>
                <li>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300 accent-[#3BB77E]" readOnly />
                    {tDetail('condRefurb')} (2)
                  </label>
                </li>
                <li>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300 accent-[#3BB77E]" readOnly />
                    {tDetail('condUsed')} (1)
                  </label>
                </li>
              </ul>
              <button
                type="button"
                onClick={applySidebarFilter}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3BB77E] py-2.5 text-sm font-semibold text-white hover:bg-[#35a570] cursor-pointer"
              >
                <Filter className="h-4 w-4" aria-hidden />
                {tDetail('filter')}
              </button>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                {tDetail('newProducts')}
              </h2>
              <ul className="space-y-4">
                {status === 'loading' &&
                  Array.from({ length: 3 }, (_, i) => <SidebarProductSkeleton key={i} />)}
                {status === 'error' && (
                  <li className="text-sm text-slate-500">{t('sidebarUnavailable')}</li>
                )}
                {status === 'ok' &&
                  newProductsSidebar.map((p) => {
                  const sidebarName = getProductName(p);
                  return (
                  <li key={p.id}>
                    <Link href={`/product/${p.id}`} className="flex gap-3 rounded-lg hover:bg-slate-50">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={p.image}
                          alt={sidebarName}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium text-[#3BB77E]">{sidebarName}</p>
                        <p className="mt-1 text-sm font-semibold text-amber-600">
                          {formatPrice(p.price)}
                        </p>
                        <div className="mt-1">
                          <StarRow rating={p.rating} />
                        </div>
                      </div>
                    </Link>
                  </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
