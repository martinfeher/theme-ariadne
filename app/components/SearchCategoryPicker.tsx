'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Check, ChevronDown, ChevronUp, LayoutGrid, Search } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useHydrated } from '@/app/hooks/useHydrated';
import {
  DEFAULT_RECENT_CATEGORY_SLUGS,
  getSearchCategoryIcon,
  RECENT_CATEGORIES_STORAGE_KEY,
  SEARCH_CATEGORY_SLUGS,
} from '@/lib/search-categories';
import { countProductsWithCategorySlug, MOCK_PRODUCTS } from '@/lib/mock-products';

function readRecentSlugs(): string[] {
  if (typeof window === 'undefined') return [...DEFAULT_RECENT_CATEGORY_SLUGS];
  try {
    const raw = window.localStorage.getItem(RECENT_CATEGORIES_STORAGE_KEY);
    if (!raw) return [...DEFAULT_RECENT_CATEGORY_SLUGS];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [...DEFAULT_RECENT_CATEGORY_SLUGS];
    return parsed.filter((s): s is string => typeof s === 'string');
  } catch {
    return [...DEFAULT_RECENT_CATEGORY_SLUGS];
  }
}

function writeRecentSlugs(slugs: string[]) {
  try {
    window.localStorage.setItem(RECENT_CATEGORIES_STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    /* ignore quota errors */
  }
}

type SearchCategoryPickerProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export default function SearchCategoryPicker({
  value,
  onValueChange,
}: SearchCategoryPickerProps) {
  const t = useTranslations('SearchBar');
  const [open, setOpen] = useState(false);
  const [recentSlugs, setRecentSlugs] = useState<string[]>([...DEFAULT_RECENT_CATEGORY_SLUGS]);
  const hydrated = useHydrated();

  useEffect(() => {
    setRecentSlugs(readRecentSlugs());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const categories = useMemo(
    () =>
      SEARCH_CATEGORY_SLUGS.map((slug) => ({
        slug,
        label: t(`categories.${slug}`),
        icon: getSearchCategoryIcon(slug),
        count:
          slug === 'all' ? MOCK_PRODUCTS.length : countProductsWithCategorySlug(slug),
      })),
    [t]
  );

  const selectedLabel =
    categories.find((c) => c.slug === value)?.label ?? t('categories.all');

  const recentCategories = useMemo(
    () =>
      recentSlugs
        .filter((slug) => slug !== 'all' && slug !== value)
        .map((slug) => categories.find((c) => c.slug === slug))
        .filter((c): c is (typeof categories)[number] => Boolean(c))
        .slice(0, 4),
    [recentSlugs, categories, value]
  );

  const rememberRecent = useCallback((slug: string) => {
    if (slug === 'all') return;
    setRecentSlugs((prev) => {
      const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, 4);
      writeRecentSlugs(next);
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (slug: string) => {
      onValueChange(slug);
      rememberRecent(slug);
      setOpen(false);
    },
    [onValueChange, rememberRecent]
  );

  const trigger = (
    <button
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-label={`${t('categoryLabel')}: ${selectedLabel}`}
      className="flex min-w-44 max-w-52 items-center gap-2.5 px-4 py-1.5 text-left hover:bg-slate-50/80 cursor-pointer"
    >
      <LayoutGrid className="h-5 w-5 shrink-0 text-[#3BB77E]" strokeWidth={1.75} aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {t('categoryLabel')}
        </span>
        <span className="block truncate text-sm font-semibold text-slate-900">{selectedLabel}</span>
      </span>
      {open ? (
        <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
      ) : (
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
      )}
    </button>
  );

  if (!hydrated) {
    return <div className="shrink-0 border-r border-slate-200">{trigger}</div>;
  }

  return (
    <div className="shrink-0 border-r border-slate-200">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-[min(26rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-100 p-0 shadow-xl"
        >
          <Command
            filter={(itemValue, search) => {
              if (!search) return 1;
              return itemValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
            }}
          >
            <div
              className="flex items-center gap-2 border-b border-slate-100 px-3 py-1"
              cmdk-input-wrapper=""
            >
              <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              <CommandPrimitive.Input
                placeholder={t('searchCategories')}
                className="h-9 w-full flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
              <kbd className="hidden shrink-0 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:inline">
                Esc
              </kbd>
            </div>

            <CommandList className="max-h-[min(20rem,50vh)]">
              <CommandEmpty>{t('noCategoryMatches')}</CommandEmpty>

              {recentCategories.length > 0 && (
                <div className="border-b border-slate-100 px-3 py-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {t('recent')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentCategories.map((category) => (
                      <button
                        key={category.slug}
                        type="button"
                        onClick={() => handleSelect(category.slug)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-[#3BB77E]/40 hover:bg-emerald-50/60 cursor-pointer"
                      >
                        <Image
                          src={category.icon}
                          alt=""
                          width={14}
                          height={14}
                          className="shrink-0 opacity-80"
                        />
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <CommandGroup
                heading={t('allCategories')}
                className="px-2 py-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-slate-400"
              >
                {categories.map((category) => (
                  <CommandItem
                    key={category.slug}
                    value={`${category.label} ${category.slug}`}
                    onSelect={() => handleSelect(category.slug)}
                    className="cursor-pointer rounded-xl px-2 py-2.5 aria-selected:bg-emerald-50 data-[selected=true]:bg-emerald-50"
                  >
                    <div className="flex w-full items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                        {category.slug === 'all' ? (
                          <LayoutGrid
                            className="h-5 w-5 text-[#3BB77E]"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        ) : (
                          <Image
                            src={category.icon}
                            alt=""
                            width={22}
                            height={22}
                            className="opacity-90"
                          />
                        )}
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block text-sm font-semibold text-slate-900">
                          {category.label}
                        </span>
                        <span className="block text-xs text-slate-400">
                          {t('itemCount', { count: category.count })}
                        </span>
                      </span>
                      {value === category.slug ? (
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3BB77E] text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                        </span>
                      ) : (
                        <span className="h-6 w-6 shrink-0" aria-hidden />
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-3 py-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-3">
                <span>{t('keyboardNavigate')}</span>
                <span>{t('keyboardSelect')}</span>
              </span>
              <span>{t('categoryCount', { count: categories.length })}</span>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
