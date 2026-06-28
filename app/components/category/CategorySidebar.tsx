'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import {
  CATEGORY_SIDEBAR_TREE,
  findCategorySidebarGroup,
  type CategoryShopSlug,
} from '@/lib/category-shop';
import { countProductsWithCategorySlug } from '@/lib/mock-products';
import { fetchProducts } from '@/lib/fetch-products';

const ACCENT = '#3BB77E';

export type CategorySidebarSlug = 'all' | CategoryShopSlug;

type CategorySidebarProps = {
  activeSlug: CategorySidebarSlug;
  /** When set, category rows act as filters instead of navigating away. */
  onCategorySelect?: (slug: CategorySidebarSlug) => void;
  className?: string;
  /** Renders only the inner card (for use inside an existing aside column). */
  embedded?: boolean;
  /** Hide the “Browse full shop” footer link. */
  hideBrowseLink?: boolean;
  totalCountOverride?: number | null;
};

export default function CategorySidebar({
  activeSlug,
  onCategorySelect,
  className = '',
  embedded = false,
  hideBrowseLink = false,
  totalCountOverride,
}: CategorySidebarProps) {
  const t = useTranslations('Category');
  const tBar = useTranslations('SearchBar.categories');
  const tSub = useTranslations('Header.megaSubLinks');
  const tDetail = useTranslations('ProductDetail');
  const [totalCount, setTotalCount] = useState<number | null>(totalCountOverride ?? null);
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const group = findCategorySidebarGroup(activeSlug);
    return group && group.subcategories.length > 0 ? new Set([group.slug]) : new Set();
  });

  useEffect(() => {
    if (totalCountOverride !== undefined) {
      setTotalCount(totalCountOverride);
      return;
    }
    let cancelled = false;
    fetchProducts()
      .then((res) => {
        if (!cancelled) setTotalCount(res.products.length);
      })
      .catch(() => {
        if (!cancelled) setTotalCount(null);
      });
    return () => {
      cancelled = true;
    };
  }, [totalCountOverride]);

  useEffect(() => {
    const group = findCategorySidebarGroup(activeSlug);
    if (group && group.subcategories.length > 0) {
      setExpanded((prev) => new Set(prev).add(group.slug));
    }
  }, [activeSlug]);

  const rowClass = (active: boolean) =>
    `flex w-full items-center justify-between rounded-xl py-2.5 pl-1 pr-1 text-left transition-colors ${
      active ? 'bg-emerald-50 ring-1 ring-emerald-100' : 'hover:bg-slate-50'
    }`;

  const subRowClass = (active: boolean) =>
    `block w-full rounded-lg py-2 pl-10 pr-2 text-left text-sm transition-colors ${
      active ? 'bg-emerald-50 font-medium text-emerald-800' : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-700'
    }`;

  const countBadge = (count: number | string) => (
    <span
      className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full px-2 text-xs font-semibold text-white"
      style={{ backgroundColor: ACCENT }}
    >
      {count}
    </span>
  );

  const navigateOrSelect = (slug: CategorySidebarSlug, href: string, children: React.ReactNode, className: string) => {
    if (onCategorySelect) {
      return (
        <button type="button" onClick={() => onCategorySelect(slug)} className={`${className} cursor-pointer`}>
          {children}
        </button>
      );
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  };

  const toggleExpanded = (slug: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const panel = (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">{tDetail('sidebarCategory')}</h2>
      <ul className="space-y-1">
        <li>
          {navigateOrSelect(
            'all',
            '/category/all',
            <>
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#3BB77E]">
                  <LayoutGrid className="h-4 w-4" aria-hidden />
                </span>
                <span className="truncate text-sm text-slate-700">{t('allCategories')}</span>
              </span>
              {countBadge(totalCount ?? '—')}
            </>,
            rowClass(activeSlug === 'all')
          )}
        </li>

        {CATEGORY_SIDEBAR_TREE.map(({ slug, icon, subcategories }) => {
          const label = tBar(slug as Parameters<typeof tBar>[0]);
          const count = countProductsWithCategorySlug(slug);
          const parentActive = activeSlug === slug;
          const hasSubs = subcategories.length > 0;
          const isExpanded = expanded.has(slug);

          if (!hasSubs) {
            return (
              <li key={slug}>
                {navigateOrSelect(
                  slug,
                  `/category/${slug}`,
                  <>
                    <span className="flex min-w-0 items-center gap-3">
                      <Image src={icon} alt="" width={28} height={28} className="shrink-0 opacity-80" />
                      <span className="truncate text-sm text-slate-700">{label}</span>
                    </span>
                    {countBadge(count)}
                  </>,
                  rowClass(parentActive)
                )}
              </li>
            );
          }

          return (
            <li key={slug}>
              <div
                className={`flex items-center gap-0.5 rounded-xl transition-colors ${
                  parentActive ? 'bg-emerald-50 ring-1 ring-emerald-100' : 'hover:bg-slate-50'
                }`}
              >
                {navigateOrSelect(
                  slug,
                  `/category/${slug}`,
                  <>
                    <span className="flex min-w-0 flex-1 items-center gap-3 py-2.5 pl-1">
                      <Image src={icon} alt="" width={28} height={28} className="shrink-0 opacity-80" />
                      <span className="truncate text-sm text-slate-700">{label}</span>
                    </span>
                    {countBadge(count)}
                  </>,
                  'flex min-w-0 flex-1 items-center justify-between text-left'
                )}
                <button
                  type="button"
                  onClick={() => toggleExpanded(slug)}
                  className="mr-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-white/80 hover:text-slate-600"
                  aria-expanded={isExpanded}
                  aria-label={label}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
              </div>
              {isExpanded && (
                <ul className="mt-0.5 space-y-0.5 border-l border-emerald-100 ml-4 pl-1">
                  {subcategories.map((sub) => {
                    const subActive = activeSlug === sub.slug;
                    return (
                      <li key={`${slug}-${sub.labelKey}`}>
                        {navigateOrSelect(
                          sub.slug,
                          `/category/${sub.slug}`,
                          tSub(sub.labelKey as Parameters<typeof tSub>[0]),
                          subRowClass(subActive)
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      {!hideBrowseLink && (
        <Link
          href="/category/all"
          className="mt-4 block text-center text-sm font-semibold text-[#3BB77E] hover:text-green-700"
        >
          {t('browseAllShop')} →
        </Link>
      )}
    </div>
  );

  if (embedded) {
    return panel;
  }

  return (
    <aside className={`w-full shrink-0 lg:w-[300px] ${className}`.trim()}>
      <div className="sticky top-24">{panel}</div>
    </aside>
  );
}
