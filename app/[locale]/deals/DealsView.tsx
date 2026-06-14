'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Flame, Home as HomeIcon, Tag } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import ProductCard from '@/app/components/ProductCard';
import DiscountBadge, { getDiscountPercent } from '@/app/components/DiscountBadge';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { useProductI18n } from '@/app/hooks/useProductI18n';
import type { Product } from '@/app/types/product';
import { fetchProducts } from '@/lib/fetch-products';
import {
  DEAL_CATEGORY_TABS,
  getDealProducts,
  getDealSavings,
  getDealsEndDate,
  getFeaturedDeal,
  sortDealProducts,
  type DealCategoryTab,
  type DealSort,
} from '@/lib/deals';

function useCountdown(target: Date) {
  const [parts, setParts] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setParts({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return parts;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[3.25rem] flex-col items-center rounded-lg bg-white/95 px-2 py-2 shadow-sm">
      <span className="text-lg font-bold tabular-nums text-gray-900 sm:text-xl">{value}</span>
      <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function DealsView() {
  const t = useTranslations('Deals');
  const tHeader = useTranslations('Header');
  const tBar = useTranslations('SearchBar.categories');
  const formatPrice = useFormatCurrency();
  const { getProductName } = useProductI18n();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [activeCategory, setActiveCategory] = useState<DealCategoryTab>('all');
  const [sort, setSort] = useState<DealSort>('discount');

  const countdown = useCountdown(getDealsEndDate());

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

  const dealProducts = useMemo(() => getDealProducts(products), [products]);
  const featured = useMemo(() => getFeaturedDeal(products), [products]);

  const filteredDeals = useMemo(() => {
    const list =
      activeCategory === 'all'
        ? dealProducts
        : dealProducts.filter((p) => p.categories?.includes(activeCategory) ?? false);
    return sortDealProducts(list, sort);
  }, [dealProducts, activeCategory, sort]);

  const featuredDiscount = featured ? getDiscountPercent(featured.price, featured.oldPrice) : null;
  const featuredName = featured ? getProductName(featured) : '';

  return (
    <PageShell>

      <main>
        <section className="border-b border-orange-100 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
          <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-10">
            <nav
              className="flex flex-wrap items-center gap-1.5 text-sm text-gray-600"
              aria-label={t('breadcrumbNav')}
            >
              <Link href="/" className="inline-flex items-center gap-1 hover:text-green-600">
                <HomeIcon className="h-4 w-4" aria-hidden />
                {tHeader('home')}
              </Link>
              <span className="text-gray-400" aria-hidden>
                /
              </span>
              <span className="font-medium text-gray-900">{t('breadcrumb')}</span>
            </nav>

            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                  <Flame className="h-3.5 w-3.5" aria-hidden />
                  {t('eyebrow')}
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {t('title')}
                </h1>
                <p className="mt-3 text-gray-600">{t('subtitle')}</p>
                {loadState === 'ok' && (
                  <p className="mt-2 text-sm font-medium text-green-700">
                    {dealProducts.length === 1
                      ? t('dealCountOne')
                      : t('dealCountMany', { count: dealProducts.length })}
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-orange-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t('countdownLabel')}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <CountdownUnit value={countdown.days} label={t('countdownDays')} />
                  <CountdownUnit value={countdown.hours} label={t('countdownHours')} />
                  <CountdownUnit value={countdown.minutes} label={t('countdownMinutes')} />
                  <CountdownUnit value={countdown.seconds} label={t('countdownSeconds')} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {featured && loadState === 'ok' && (
          <section className="container mx-auto max-w-7xl px-4 py-8">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <div className="relative min-h-[220px] bg-gray-50 md:min-h-[280px]">
                  <Image
                    src={featured.image}
                    alt={featuredName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 480px"
                    priority
                  />
                  {featuredDiscount != null && featuredDiscount > 0 && (
                    <span className="absolute left-4 top-4">
                      <DiscountBadge percent={featuredDiscount} size="md" />
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                    {t('featuredLabel')}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">{featuredName}</h2>
                  <div className="mt-3 flex flex-wrap items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(featured.price)}
                    </span>
                    {featured.oldPrice != null && (
                      <span className="text-lg text-gray-400 line-through">
                        {formatPrice(featured.oldPrice)}
                      </span>
                    )}
                    {getDealSavings(featured) > 0 && (
                      <span className="text-sm font-medium text-orange-700">
                        {t('saveAmount', { amount: formatPrice(getDealSavings(featured)) })}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                    {featured.description}
                  </p>
                  <Link
                    href={`/product/${featured.id}`}
                    className="mt-6 inline-flex w-fit rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                  >
                    {t('shopFeatured')}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="container mx-auto max-w-7xl px-4 pb-12 pt-2 lg:pb-16">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
                <Tag className="h-5 w-5 text-green-600" aria-hidden />
                {t('gridTitle')}
              </h2>
              {loadState === 'ok' && (
                <p className="mt-1 text-sm text-gray-500">
                  {filteredDeals.length === 1
                    ? t('resultsOne')
                    : t('resultsMany', { count: filteredDeals.length })}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="deals-sort" className="text-sm font-medium text-gray-700">
                {t('sortLabel')}
              </label>
              <select
                id="deals-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as DealSort)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              >
                <option value="discount">{t('sortDiscount')}</option>
                <option value="priceAsc">{t('sortPriceAsc')}</option>
                <option value="priceDesc">{t('sortPriceDesc')}</option>
              </select>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {DEAL_CATEGORY_TABS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveCategory(id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  activeCategory === id
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                {id === 'all' ? t('tabAll') : tBar(id)}
              </button>
            ))}
          </div>

          {loadState === 'loading' && (
            <p className="py-16 text-center text-gray-500">{t('loading')}</p>
          )}
          {loadState === 'error' && (
            <p className="py-16 text-center text-red-600">{t('error')}</p>
          )}
          {loadState === 'ok' && filteredDeals.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
              <p className="text-gray-600">{t('noDeals')}</p>
              <Link
                href="/category/all"
                className="mt-4 inline-flex rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
              >
                {t('browseShop')}
              </Link>
            </div>
          )}
          {loadState === 'ok' && filteredDeals.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-5">
              {filteredDeals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  allProducts={products}
                  size="small"
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </PageShell>
  );
}
