'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { Link } from '@/i18n/navigation';
import SearchCategoryPicker from '@/app/components/SearchCategoryPicker';
import { fetchProducts } from '@/lib/fetch-products';
import type { Product } from '@/app/types/product';
import { useProductI18n } from '@/app/hooks/useProductI18n';

const DEBOUNCE_MS = 280;
const MAX_SUGGESTIONS = 8;

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
  const formatPrice = useFormatCurrency();
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = variant === 'desktop' ? 'search-suggestions-desktop' : 'search-suggestions-mobile';
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const categoryScopedPlaceholder = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      return t('placeholder');
    }
    return t('placeholderInCategory', {
      category: t(`categories.${selectedCategory}`),
    });
  }, [selectedCategory, t]);

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
            ? 'flex items-stretch overflow-visible rounded-2xl border border-[#3BB77E]/70 bg-white shadow-sm'
            : 'flex overflow-visible rounded-xl border border-slate-200 bg-white'
        }
      >
        {isDesktop && (
          <SearchCategoryPicker value={selectedCategory} onValueChange={onCategoryChange} />
        )}

        <div
          className={
            isDesktop
              ? 'flex min-w-0 flex-1 items-center gap-2 px-4'
              : 'flex min-w-0 flex-1 items-center gap-2 px-3'
          }
        >
          <Search
            className="h-4 w-4 shrink-0 text-slate-400"
            strokeWidth={2}
            aria-hidden
          />
          <input
            type="search"
            name="q"
            value={searchQuery}
            onChange={(e) => {
              onSearchQueryChange(e.target.value);
              setPanelOpen(true);
            }}
            onFocus={() => setPanelOpen(true)}
            placeholder={isDesktop ? categoryScopedPlaceholder : t('placeholder')}
            autoComplete="off"
            role="combobox"
            aria-expanded={showPanel}
            aria-controls={showPanel ? listId : undefined}
            aria-autocomplete="list"
            className={
              isDesktop
                ? 'min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0'
                : 'min-w-0 flex-1 border-0 bg-transparent py-1.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3BB77E]/30 focus:ring-inset'
            }
            aria-label={tHeader('searchProducts')}
          />
        </div>
        <button
          type="submit"
          className={
            isDesktop
              ? 'm-1.5 flex shrink-0 items-center justify-center rounded-xl bg-[#3BB77E] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#35a570] cursor-pointer'
              : 'flex shrink-0 items-center justify-center bg-[#3BB77E] px-4 py-2.5 text-white transition-colors hover:bg-[#35a570] cursor-pointer rounded-r-xl'
          }
          aria-label={tHeader('searchProducts')}
        >
          {isDesktop ? (
            t('searchButton')
          ) : (
            <Search className="h-5 w-5" strokeWidth={2} aria-hidden />
          )}
        </button>
      </form>

      {showPanel && (
        <div
          id={listId}
          role="listbox"
          className={
            isDesktop
              ? 'absolute left-0 right-0 top-full z-50 mt-2 max-h-[min(24rem,70vh)] overflow-y-auto rounded-2xl border border-slate-100 bg-white py-2 shadow-xl'
              : 'absolute left-0 right-0 top-full z-[60] mt-1 max-h-64 overflow-y-auto rounded-xl border border-slate-100 bg-white py-2 shadow-lg'
          }
        >
          {loading && (
            <p className="px-4 py-3 text-sm text-slate-500">{t('searching')}</p>
          )}
          {!loading && suggestions.length === 0 && (
            <p className="px-4 py-3 text-sm text-slate-500">{t('noMatches')}</p>
          )}
          {!loading &&
            suggestions.map((product) => {
              const suggestionName = getProductName(product);
              return (
              <div
                key={product.id}
                role="option"
                aria-selected={false}
                className="border-b border-slate-100 last:border-0"
              >
                <Link
                  href={`/product/${product.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 text-left hover:bg-emerald-50/60"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setPanelOpen(false);
                    onAfterSuggestionPick?.();
                  }}
                >
                  <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                    <Image
                      src={product.image}
                      alt={suggestionName}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 text-sm font-medium text-slate-900">
                      {suggestionName}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold text-[#3BB77E]">
                      {formatPrice(product.price)}
                    </span>
                  </span>
                </Link>
              </div>
              );
            })}
          {!loading && suggestions.length > 0 && (
            <div className="border-t border-slate-100 px-3 pt-2">
              <Link
                href={viewAllHref}
                className="block rounded-lg py-2 text-center text-sm font-medium text-[#3BB77E] hover:bg-emerald-50/60"
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
