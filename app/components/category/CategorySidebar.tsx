'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LayoutGrid } from 'lucide-react';
import { CATEGORY_SIDEBAR_ICONS } from '@/lib/category-shop';
import { countProductsWithCategorySlug } from '@/lib/mock-products';
import { fetchProducts } from '@/lib/fetch-products';

const ACCENT = '#3BB77E';

export type CategorySidebarSlug = 'all' | (typeof CATEGORY_SIDEBAR_ICONS)[number]['slug'];

type CategorySidebarProps = {
  activeSlug: CategorySidebarSlug;
  /** When set, category rows act as filters instead of navigating away. */
  onCategorySelect?: (slug: CategorySidebarSlug) => void;
  className?: string;
};

export default function CategorySidebar({
  activeSlug,
  onCategorySelect,
  className = '',
}: CategorySidebarProps) {
  const t = useTranslations('Category');
  const tBar = useTranslations('SearchBar.categories');
  const tDetail = useTranslations('ProductDetail');
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
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
  }, []);

  const rowClass = (active: boolean) =>
    `flex w-full items-center justify-between rounded-xl py-2.5 pl-1 pr-1 text-left transition-colors ${
      active ? 'bg-emerald-50 ring-1 ring-emerald-100' : 'hover:bg-slate-50'
    }`;

  const renderRow = (
    slug: CategorySidebarSlug,
    label: string,
    count: number | string,
    icon: React.ReactNode
  ) => {
    const active = activeSlug === slug;
    const inner = (
      <>
        <span className="flex min-w-0 items-center gap-3">
          {icon}
          <span className="truncate text-sm text-slate-700">{label}</span>
        </span>
        <span
          className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full px-2 text-xs font-semibold text-white"
          style={{ backgroundColor: ACCENT }}
        >
          {count}
        </span>
      </>
    );

    if (onCategorySelect) {
      return (
        <button
          type="button"
          onClick={() => onCategorySelect(slug)}
          className={`${rowClass(active)} cursor-pointer`}
        >
          {inner}
        </button>
      );
    }

    const href = slug === 'all' ? '/category/all' : `/category/${slug}`;
    return (
      <Link href={href} className={rowClass(active)}>
        {inner}
      </Link>
    );
  };

  return (
    <aside className={`w-full shrink-0 lg:w-[300px] ${className}`.trim()}>
      <div className="sticky top-24 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          {tDetail('sidebarCategory')}
        </h2>
        <ul className="space-y-1">
          <li>
            {renderRow(
              'all',
              t('allCategories'),
              totalCount ?? '—',
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#3BB77E]">
                <LayoutGrid className="h-4 w-4" aria-hidden />
              </span>
            )}
          </li>
          {CATEGORY_SIDEBAR_ICONS.map(({ slug, icon }) => (
            <li key={slug}>
              {renderRow(
                slug as CategorySidebarSlug,
                tBar(slug as Parameters<typeof tBar>[0]),
                countProductsWithCategorySlug(slug),
                <Image
                  src={icon}
                  alt=""
                  width={28}
                  height={28}
                  className="shrink-0 opacity-80"
                />
              )}
            </li>
          ))}
        </ul>
        <Link
          href="/category/all"
          className="mt-4 block text-center text-sm font-semibold text-[#3BB77E] hover:text-green-700"
        >
          {t('browseAllShop')} →
        </Link>
      </div>
    </aside>
  );
}
