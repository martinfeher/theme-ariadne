'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { formatEur } from '@/lib/format-price';
import { Link } from '@/i18n/navigation';
import { Heart, Minus, Plus, Search, Shuffle, ShoppingCart } from 'lucide-react';
import type { Product } from '@/app/types/product';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { useCompare, MAX_COMPARE_PRODUCTS } from '@/app/context/CompareContext';
import { CATEGORY_SIDEBAR_ICONS } from '@/lib/category-shop';
import { countProductsWithCategorySlug } from '@/lib/mock-products';

const ACCENT = '#3BB77E';

const SIZE_OPTIONS = ['50', '60', '80', '100', '150'] as const;

type TabId = 'description' | 'additional' | 'vendor' | 'reviews';

function buildGalleryImages(product: Product, related: Product[]): string[] {
  const urls: string[] = [];
  const add = (u?: string) => {
    if (!u || urls.includes(u)) return;
    urls.push(u);
  };
  add(product.image);
  add(product.hoverImage);
  for (const p of related) {
    if (urls.length >= 4) break;
    add(p.image);
  }
  while (urls.length < 4) add(product.image);
  return urls.slice(0, 4);
}

function discountPercent(price: number, oldPrice: number | undefined): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round((1 - price / oldPrice) * 100);
}

function StarRow({ rating }: { rating: number }) {
  const filled = Math.floor(rating);
  const half = rating % 1 >= 0.25 && rating % 1 < 0.75;
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < filled
              ? 'fill-amber-400 text-amber-400'
              : i === filled && half
                ? 'fill-amber-400 text-amber-400'
                : 'fill-gray-200 text-gray-200'
          }`}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetailView({
  product,
  relatedProducts,
  newProductsSidebar,
}: {
  product: Product;
  relatedProducts: Product[];
  newProductsSidebar: Product[];
}) {
  const t = useTranslations('ProductDetail');
  const tBar = useTranslations('SearchBar.categories');
  const locale = useLocale();
  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare, canAdd } = useCompare();

  const gallery = useMemo(
    () => buildGalleryImages(product, relatedProducts),
    [product, relatedProducts]
  );
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string>(SIZE_OPTIONS[1]);
  const [tab, setTab] = useState<TabId>('description');
  const [zoomOpen, setZoomOpen] = useState(false);
  const [priceTo, setPriceTo] = useState(40);

  const mainSrc = gallery[activeImg] ?? product.image;
  const wishlisted = isInWishlist(product.id);
  const compared = isInCompare(product.id);
  const compareDisabled = !canAdd(product.id) && !compared;
  const pctOff = discountPercent(product.price, product.oldPrice);
  const inStock = product.inStock !== false;
  const stockCount = inStock ? 8 : 0;
  const sku = `NT-${String(product.id).padStart(5, '0')}`;

  const handleCompare = useCallback(() => {
    if (compareDisabled) return;
    if (compared) removeFromCompare(product.id);
    else addToCompare(product);
  }, [compareDisabled, compared, product, addToCompare, removeFromCompare]);

  const addToCart = () => {
    addItem(product, qty);
    openCart();
  };

  const decQty = () => setQty((q) => Math.max(1, q - 1));
  const incQty = () => setQty((q) => Math.min(99, q + 1));

  const tabClass = (id: TabId) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      tab === id
        ? 'text-white shadow-sm'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'
    }`;

  return (
    <>
      <main className="container mx-auto max-w-7xl px-4 py-6">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            {t('breadcrumbHome')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-8 lg:col-span-9">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                <div>
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                    <Image
                      src={mainSrc}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <button
                      type="button"
                      onClick={() => setZoomOpen(true)}
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md backdrop-blur hover:bg-white cursor-pointer"
                      aria-label={t('zoomImage')}
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                    {gallery.map((src, i) => (
                      <button
                        key={`${src}-${i}`}
                        type="button"
                        onClick={() => setActiveImg(i)}
                        aria-label={t('selectImage', { n: i + 1 })}
                        aria-current={activeImg === i ? 'true' : undefined}
                        className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-50 cursor-pointer ${
                          activeImg === i ? 'border-blue-500' : 'border-transparent'
                        }`}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  {product.badge && (
                    <span className="mb-2 inline-flex w-fit rounded-md bg-pink-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-pink-700">
                      {t('saleOff')}
                    </span>
                  )}
                  <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                    {product.name}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StarRow rating={product.rating} />
                    <span className="text-sm text-gray-500">
                      ({product.ratingCount} {t('reviewsLabel')})
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-end gap-3">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: ACCENT }}
                    >
                      {formatEur(product.price, locale)}
                    </span>
                    {product.oldPrice != null && product.oldPrice > product.price && (
                      <span className="text-lg text-gray-400 line-through">
                        {formatEur(product.oldPrice, locale)}
                      </span>
                    )}
                    {pctOff != null && (
                      <span className="rounded bg-orange-100 px-2 py-0.5 text-sm font-semibold text-orange-700">
                        {t('percentOff', { percent: pctOff })}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    {product.description ?? t('shortPlaceholder')}
                  </p>

                  <div className="mt-6">
                    <p className="mb-2 text-sm font-medium text-gray-800">
                      {t('sizeWeight')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SIZE_OPTIONS.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setSize(g)}
                          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                            size === g
                              ? 'border-transparent text-white'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 cursor-pointer'
                          }`}
                          style={
                            size === g
                              ? { backgroundColor: ACCENT }
                              : undefined
                          }
                        >
                          {g}
                          {t('gramSuffix')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                      <button
                        type="button"
                        onClick={decQty}
                        className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 cursor-pointer"
                        aria-label={t('decreaseQty')}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[2.5rem] text-center text-sm font-semibold">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={incQty}
                        className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 cursor-pointer"
                        aria-label={t('increaseQty')}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={addToCart}
                      disabled={!inStock}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-50 min-w-[200px] cursor-pointer"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {t('addToCart')}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      className={`flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer ${
                        wishlisted ? 'text-red-500' : 'text-gray-600'
                      }`}
                      aria-label={
                        wishlisted ? t('removeWishlist') : t('addWishlist')
                      }
                    >
                      <Heart
                        className={`h-5 w-5 ${wishlisted ? 'fill-current' : ''}`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={handleCompare}
                      disabled={compareDisabled}
                      className={`flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer ${
                        compared ? 'text-green-600' : 'text-gray-600'
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                      aria-label={
                        compared ? t('removeCompare') : t('addCompare')
                      }
                      title={
                        compareDisabled ? t('compareFull', { max: MAX_COMPARE_PRODUCTS }) : undefined
                      }
                    >
                      <Shuffle className="h-5 w-5" />
                    </button>
                  </div>

                  <dl className="mt-8 grid grid-cols-1 gap-3 border-t border-gray-100 pt-6 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-gray-500">{t('metaType')}</dt>
                      <dd className="font-medium text-gray-800">{t('typeOrganic')}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">{t('metaMfg')}</dt>
                      <dd className="font-medium text-gray-800">
                        {t('mfgSample')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">{t('metaLife')}</dt>
                      <dd className="font-medium text-gray-800">{t('lifeSample')}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">{t('metaSku')}</dt>
                      <dd className="font-medium text-gray-800">{sku}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-gray-500">{t('metaTags')}</dt>
                      <dd className="font-medium text-gray-800">
                        {[
                          product.category,
                          ...(product.categories?.filter((c) => c !== 'all').map((c) => tBar(c)) ?? []),
                        ]
                          .filter((v, i, arr) => arr.indexOf(v) === i)
                          .join(', ')}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-gray-500">{t('metaStock')}</dt>
                      <dd className="font-medium text-gray-800">
                        {inStock
                          ? t('inStockCount', { count: stockCount })
                          : t('outStock')}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
              <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-4">
                <button
                  type="button"
                  onClick={() => setTab('description')}
                  className={tabClass('description')}
                  style={tab === 'description' ? { backgroundColor: ACCENT } : undefined}
                >
                  {t('tabDescription')}
                </button>
                <button
                  type="button"
                  onClick={() => setTab('additional')}
                  className={tabClass('additional')}
                  style={tab === 'additional' ? { backgroundColor: ACCENT } : undefined}
                >
                  {t('tabAdditional')}
                </button>
                <button
                  type="button"
                  onClick={() => setTab('vendor')}
                  className={tabClass('vendor')}
                  style={tab === 'vendor' ? { backgroundColor: ACCENT } : undefined}
                >
                  {t('tabVendor')}
                </button>
                <button
                  type="button"
                  onClick={() => setTab('reviews')}
                  className={tabClass('reviews')}
                  style={tab === 'reviews' ? { backgroundColor: ACCENT } : undefined}
                >
                  {t('tabReviews', { count: Math.max(1, Math.floor(product.ratingCount)) })}
                </button>
              </div>
              <div className="prose prose-sm max-w-none pt-6 text-gray-600">
                {tab === 'description' && (
                  <div className="space-y-4">
                    <p>{t('longP1')}</p>
                    <p>{t('longP2')}</p>
                    <h3 className="text-base font-semibold text-gray-900">
                      {t('headingPackaging')}
                    </h3>
                    <p>{t('longP3')}</p>
                    <h3 className="text-base font-semibold text-gray-900">
                      {t('headingSuggested')}
                    </h3>
                    <p>{t('longP4')}</p>
                  </div>
                )}
                {tab === 'additional' && (
                  <div className="space-y-4">
                    <ul className="list-inside list-disc space-y-2">
                      <li>{t('specPacking')}</li>
                      <li>{t('specColor')}</li>
                      <li>{t('specQtyCase')}</li>
                      <li>{t('specWeight')}</li>
                    </ul>
                    <h3 className="text-base font-semibold text-gray-900">
                      {t('headingIngredients')}
                    </h3>
                    <p>{t('ingredientsBlurb')}</p>
                    <h3 className="text-base font-semibold text-gray-900">
                      {t('headingWarnings')}
                    </h3>
                    <p>{t('warningsBlurb')}</p>
                  </div>
                )}
                {tab === 'vendor' && (
                  <p>
                    {t('vendorBlurb', { name: product.vendor })}
                  </p>
                )}
                {tab === 'reviews' && (
                  <p className="text-gray-500">{t('reviewsPlaceholder')}</p>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                {t('sidebarCategory')}
              </h2>
              <ul className="space-y-2">
                {CATEGORY_SIDEBAR_ICONS.map(({ slug, icon }) => {
                  const count = countProductsWithCategorySlug(slug);
                  const label = tBar(slug);
                  return (
                    <li key={slug}>
                      <Link
                        href={`/category/${slug}`}
                        className="flex items-center justify-between rounded-lg py-2 pr-1 hover:bg-gray-50"
                      >
                        <span className="flex items-center gap-3">
                          <Image
                            src={icon}
                            alt=""
                            width={28}
                            height={28}
                            className="opacity-80"
                          />
                          <span className="text-sm text-gray-700">{label}</span>
                        </span>
                        <span
                          className="flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-semibold text-white"
                          style={{ backgroundColor: ACCENT }}
                        >
                          {count}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                {t('sidebarFillPrice')}
              </h2>
              <div className="mb-4">
                <input
                  type="range"
                  min={5}
                  max={80}
                  value={priceTo}
                  onChange={(e) => setPriceTo(Number(e.target.value))}
                  aria-label={t('priceRange')}
                  className="h-2 w-full appearance-none rounded-full bg-gray-200 accent-[#3BB77E] cursor-pointer"
                  style={{ accentColor: ACCENT }}
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>
                    {t('from')} {formatEur(5, locale)}
                  </span>
                  <span>
                    {t('to')} {formatEur(priceTo, locale)}
                  </span>
                </div>
              </div>
              <p className="mb-2 text-sm font-medium text-gray-800">{t('color')}</p>
              <ul className="mb-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 cursor-pointer" readOnly /> {t('colorRed')} (12)
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 cursor-pointer" readOnly /> {t('colorGreen')} (4)
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 cursor-pointer" readOnly /> {t('colorBlue')} (8)
                </li>
              </ul>
              <p className="mb-2 text-sm font-medium text-gray-800">{t('itemCondition')}</p>
              <ul className="mb-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 cursor-pointer" readOnly /> {t('condNew')} (6)
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 cursor-pointer" readOnly /> {t('condRefurb')} (2)
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 cursor-pointer" readOnly /> {t('condUsed')} (1)
                </li>
              </ul>
              <button
                type="button"
                className="w-full rounded-lg py-2.5 text-sm font-semibold text-white cursor-pointer"
                style={{ backgroundColor: ACCENT }}
              >
                {t('filter')}
              </button>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                {t('newProducts')}
              </h2>
              <ul className="space-y-4">
                {newProductsSidebar.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.id}`}
                      className="flex gap-3 rounded-lg hover:bg-gray-50"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium text-gray-900">
                          {p.name}
                        </p>
                        <p
                          className="mt-1 text-sm font-semibold"
                          style={{ color: ACCENT }}
                        >
                          {formatEur(p.price, locale)}
                        </p>
                        <div className="mt-1">
                          <StarRow rating={p.rating} />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-amber-50 shadow-sm">
              <div className="absolute inset-0">
                <Image
                  src="/images/products/mock/fruits-a.jpg"
                  alt=""
                  fill
                  className="object-cover opacity-30"
                  sizes="300px"
                />
              </div>
             
            </div>
          </aside>
        </div>
      </main>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4"
          role="presentation"
          onClick={() => setZoomOpen(false)}
        >
          <div
            className="relative aspect-square w-full max-w-3xl overflow-hidden rounded-xl bg-white p-2 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={t('zoomImage')}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 cursor-pointer"
            >
              {t('zoomClose')}
            </button>
            <Image
              src={mainSrc}
              alt={product.name}
              fill
              className="object-contain p-4 pt-10"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      )}
    </>
  );
}
