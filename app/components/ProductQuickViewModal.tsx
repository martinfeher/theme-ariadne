'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { formatEur } from '@/lib/format-price';
import { Link } from '@/i18n/navigation';
import { X } from 'lucide-react';
import type { Product } from '../types/product';

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

function categoryHref(slug: string) {
  return `/category/${slug.toLowerCase().replace(/\s+/g, '-')}`;
}

export type ModalTab = 'description' | 'similar';

interface ProductQuickViewModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  similarProducts: Product[];
  activeTab: ModalTab;
  onTabChange: (tab: ModalTab) => void;
  onAddToCart: () => void;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  open,
  onClose,
  product,
  similarProducts,
  activeTab,
  onTabChange,
  onAddToCart,
}) => {
  const t = useTranslations('ProductQuickView');
  const tBar = useTranslations('SearchBar');
  const locale = useLocale();

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleEscape);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = prev;
    };
  }, [open, handleEscape]);

  if (!open || !product) return null;

  const filterCategoryLinks =
    product.categories?.filter((c) => c !== 'all').map((id) => ({
      href: `/category/${id}`,
      label: isFilterCategorySlug(id) ? tBar(`categories.${id}`) : id,
    })) ?? [];

  const descriptionText =
    product.description?.trim() || t('noDescription');

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
        aria-label={t('close')}
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] rounded-xl bg-white shadow-2xl">
        <div className="sticky top-0 z-20 flex justify-end border-b rounded-t-xl border-gray-100 bg-white/95 px-4 py-2 backdrop-blur">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
            aria-label={t('close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>

            <div className="flex flex-col">
              <h2
                id="quick-view-title"
                className="text-2xl font-semibold text-gray-900"
              >
                {product.name}
              </h2>

              <p className="mt-2 text-sm text-gray-600 line-clamp-3 md:line-clamp-none">
                {descriptionText}
              </p>

              <div className="mt-4 flex flex-wrap items-baseline gap-2">
                <span className="text-2xl font-semibold text-green-600">
                  {formatEur(product.price, locale)}
                </span>
                {product.oldPrice != null && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatEur(product.oldPrice, locale)}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t('categories')}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Link
                    href={categoryHref(product.category)}
                    onClick={onClose}
                    className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700 transition-colors hover:bg-green-100"
                  >
                    {product.category}
                  </Link>
                  {filterCategoryLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={onClose}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onAddToCart}
                  className="rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-600 cursor-pointer"
                >
                  {t('addToCart')}
                </button>
                <Link
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  {t('fullPage')}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <div
              role="tablist"
              className="flex gap-1 rounded-lg bg-gray-100 p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'description'}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'description'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                }`}
                onClick={() => onTabChange('description')}
              >
                {t('description')}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'similar'}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'similar'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                }`}
                onClick={() => onTabChange('similar')}
              >
                {t('similar')}
              </button>
            </div>

            <div className="mt-4 min-h-[120px]" role="tabpanel">
              {activeTab === 'description' && (
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {descriptionText}
                </p>
              )}
              {activeTab === 'similar' && (
                <div>
                  {similarProducts.length === 0 ? (
                    <p className="text-sm text-gray-500">{t('noSimilar')}</p>
                  ) : (
                    <ul className="grid gap-4 sm:grid-cols-2">
                      {similarProducts.map((p) => (
                        <li key={p.id}>
                          <Link
                            href={`/product/${p.id}`}
                            onClick={onClose}
                            className="flex gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:border-green-200 hover:bg-green-50/50"
                          >
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-50">
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 line-clamp-2">
                                {p.name}
                              </p>
                              <p className="mt-1 text-sm font-semibold text-green-600">
                                {formatEur(p.price, locale)}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
