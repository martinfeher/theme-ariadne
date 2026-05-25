'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { Link } from '@/i18n/navigation';
import { Combobox } from '@/components/ui/combobox';
import { fetchProducts } from '@/lib/fetch-products';
import type { Product } from '@/app/types/product';
import { useProductI18n } from '@/app/hooks/useProductI18n';

const DEBOUNCE_MS = 280;
const MAX_SUGGESTIONS = 8;

const CATEGORY_VALUE_KEYS = [
  'all',
  'milks-dairies',
  'wines-alcohol',
  'clothing-beauty',
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

export interface SearchBarWithSuggestionsProps {
  variant: 'desktop' | 'mobile';
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onAfterSuggestionPick?: () => void;
}

export default function SearchBarWithSuggestions({
  variant,
  searchQuery,
  onSearchQueryChange,
  selectedCategory,
  onCategoryChange,
  onSubmit,
  onAfterSuggestionPick,
}: SearchBarWithSuggestionsProps) {
  const t = useTranslations('SearchBar');
  const tHeader = useTranslations('Header');
  const { getProductName } = useProductI18n();
  const locale = useLocale();
  const formatPrice = useFormatCurrency();
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = variant === 'desktop' ? 'search-suggestions-desktop' : 'search-suggestions-mobile';
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const categoryOptions = useMemo(() =>
      CATEGORY_VALUE_KEYS.map((value) => ({value,
        label: t(`categories.${value}`),
      })),
    [t]
  );

  const trimmed = searchQuery.trim();
  const showPanel = panelOpen && trimmed.length > 0;

  useEffect(() => {
    if (!trimmed.length) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const handle = window.setTimeout(async () => {
      setLoading(true);
      try {
        const { products } = await fetchProducts({
          q: trimmed,
          category:
            selectedCategory && selectedCategory !== 'all'
              ? selectedCategory
              : undefined,
        });
        setSuggestions(products.slice(0, MAX_SUGGESTIONS));
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(handle);
  }, [trimmed, selectedCategory]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const viewAllHref = (() => {
    const params = new URLSearchParams();
    if (trimmed) params.set('q', trimmed);
    if (selectedCategory && selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    const qs = params.toString();
    return qs ? `/search?${qs}` : '/search';
  })();

  const handleFormSubmit = (e: React.FormEvent) => {
    setPanelOpen(false);
    onSubmit(e);
  };

  const isDesktop = variant === 'desktop';

  return (
    <div ref={containerRef} className={isDesktop ? 'relative w-full' : 'relative'}>
      <form
        onSubmit={handleFormSubmit}
        className={
          isDesktop
            ? 'flex items-center bg-white border border-[#89b178] rounded-sm shadow-sm overflow-visible'
            : 'flex rounded-lg overflow-visible border border-gray-300'
        }
      >
        {isDesktop && (
          <div className="relative border-r border-gray-200 cursor-pointer shrink-0 pr-2">
          {/* <div className="relative border-r border-gray-200 cursor-pointer shrink-0 pr-4"> */}
            <Combobox
              options={categoryOptions}
              value={selectedCategory}
              onValueChange={onCategoryChange}
              placeholder={t('categories.all')}
              className="w-[160px] border-0 rounded-none bg-transparent cursor-pointer"
              boxClassName="ml-[10px] w-[170px] z-300"
            />
          </div>
        )}

        <input
          type="search"
          name="q"
          value={searchQuery}
          onChange={(e) => {
            onSearchQueryChange(e.target.value);
            setPanelOpen(true);
          }}
          onFocus={() => setPanelOpen(true)}
          placeholder={t('placeholder')}
          autoComplete="off"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={showPanel ? listId : undefined}
          aria-autocomplete="list"
          className={
            isDesktop
              ? 'flex-1 px-4 py-3 text-sm border-0 focus:outline-none focus:ring-0 bg-transparent placeholder-gray-400'
              : 'flex-1 px-4 py-2 text-sm border-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset bg-transparent'
          }
          aria-label={tHeader('searchProducts')}
        />

        <button
          type="submit"
          className={ isDesktop
              ? 'bg-green-500 text-white px-6 py-3 hover:bg-green-600 transition-colors flex items-center justify-center shrink-0'
              : 'bg-green-500 text-white px-4 py-2 rounded-r-lg shrink-0'
          }
          aria-label={tHeader('searchProducts')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

      {showPanel && (
        <div
          id={listId}
          role="listbox"
          className={
            isDesktop
              ? 'absolute left-0 right-0 top-full z-50 mt-1 max-h-[min(24rem,70vh)] overflow-y-auto rounded-lg border border-gray-200 bg-white py-2 shadow-lg'
              : 'absolute left-0 right-0 top-full z-[60] mt-1 max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-white py-2 shadow-lg'
          }
        >
          {loading && (
            <p className="px-4 py-3 text-sm text-gray-500">{t('searching')}</p>
          )}
          {!loading && suggestions.length === 0 && (
            <p className="px-4 py-3 text-sm text-gray-500">{t('noMatches')}</p>
          )}
          {!loading &&
            suggestions.map((product) => {
              const suggestionName = getProductName(product);
              return (
              <div
                key={product.id}
                role="option"
                aria-selected={false}
                className="border-b border-gray-100 last:border-0"
              >
                <Link
                  href={`/product/${product.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 text-left hover:bg-green-50"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setPanelOpen(false);
                    onAfterSuggestionPick?.();
                  }}
                >
                  <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50">
                    <Image
                      src={product.image}
                      alt={suggestionName}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 text-sm font-medium text-gray-900">
                      {suggestionName}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold text-green-600">
                      {formatPrice(product.price)}
                    </span>
                  </span>
                </Link>
              </div>
              );
            })}
          {!loading && suggestions.length > 0 && (
            <div className="border-t border-gray-100 px-3 pt-2">
              <Link
                href={viewAllHref}
                className="block rounded-md py-2 text-center text-sm font-medium text-green-600 hover:bg-green-50"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setPanelOpen(false);
                  onAfterSuggestionPick?.();
                }}
              >
                {t('viewAll')}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
