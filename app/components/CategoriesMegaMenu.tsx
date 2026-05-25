'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';
import {
  MEGA_MENU_COLUMNS,
  categoryHref,
  type MegaMenuColumn,
} from '@/lib/category-mega-menu';
import { CATEGORY_SIDEBAR_ICONS } from '@/lib/category-shop';

const ICON_BY_SLUG = Object.fromEntries(
  CATEGORY_SIDEBAR_ICONS.map(({ slug, icon }) => [slug, icon])
) as Record<string, string>;

type CategoriesMegaMenuProps = {
  onClose: () => void;
  variant?: 'full' | 'compact';
};

function categoryLabel(
  slug: string,
  tCat: ReturnType<typeof useTranslations<'SearchBar.categories'>>,
  t: ReturnType<typeof useTranslations<'Header'>>
) {
  if (slug === 'all') return tCat('all');
  return tCat(slug as Parameters<typeof tCat>[0]);
}

function CategoryLink({
  slug,
  onClose,
  tCat,
  t,
  compact,
}: {
  slug: MegaMenuColumn['links'][0]['slug'];
  onClose: () => void;
  tCat: ReturnType<typeof useTranslations<'SearchBar.categories'>>;
  t: ReturnType<typeof useTranslations<'Header'>>;
  compact?: boolean;
}) {
  const icon = ICON_BY_SLUG[slug];
  const showIcon = Boolean(icon && slug !== 'all');

  return (
    <Link
      href={categoryHref(slug)}
      role="menuitem"
      className={`group/link flex items-center gap-2.5 rounded-lg transition-colors ${
        compact ? 'px-2 py-1.5' : 'px-2.5 py-2 -mx-2.5'
      } hover:bg-green-50`}
      onClick={onClose}
    >
      {showIcon && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 ring-1 ring-gray-100 transition-colors group-hover/link:bg-white group-hover/link:ring-green-100">
          <Image src={icon!} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
        </span>
      )}
      {!showIcon && slug === 'all' && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 ring-1 ring-green-100">
          <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      )}
      <span className="min-w-0 flex-1 text-sm text-gray-600 transition-colors group-hover/link:text-green-700">
        {categoryLabel(slug, tCat, t)}
      </span>
      <ChevronRight
        className="h-3.5 w-3.5 shrink-0 text-gray-300 opacity-0 transition-all group-hover/link:translate-x-0.5 group-hover/link:text-green-500 group-hover/link:opacity-100"
        aria-hidden
      />
    </Link>
  );
}

function MegaMenuColumnBlock({
  column,
  onClose,
  t,
  tCat,
  compact,
}: {
  column: MegaMenuColumn;
  onClose: () => void;
  t: ReturnType<typeof useTranslations<'Header'>>;
  tCat: ReturnType<typeof useTranslations<'SearchBar.categories'>>;
  compact?: boolean;
}) {
  const columnIcon = ICON_BY_SLUG[column.categorySlug];

  return (
    <div className={compact ? '' : 'min-w-0'}>
      <Link
        href={categoryHref(column.categorySlug)}
        role="menuitem"
        className={`group/title inline-flex items-center gap-2 transition-colors hover:text-green-600 ${
          compact
            ? 'text-sm font-bold text-gray-900'
            : 'text-base font-bold text-gray-900 lg:text-[17px]'
        }`}
        onClick={onClose}
      >
        {columnIcon && !compact && (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 ring-1 ring-green-100">
            <Image src={columnIcon} alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" />
          </span>
        )}
        <span>{t(column.titleKey as Parameters<typeof t>[0])}</span>
      </Link>
      {!compact && (
        <div className="mt-2 h-0.5 w-10 rounded-full bg-green-500/80 transition-all group-hover/title:w-14" />
      )}
      <ul className={compact ? 'mt-2 space-y-0.5' : 'mt-4 space-y-0.5'}>
        {column.links.map(({ slug }) => (
          <li key={`${column.titleKey}-${slug}`}>
            <CategoryLink slug={slug} onClose={onClose} tCat={tCat} t={t} compact={compact} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function PromoBanner({ onClose, t }: { onClose: () => void; t: ReturnType<typeof useTranslations<'Header'>> }) {
  return (
    <div className="relative h-full min-h-[240px] overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-green-500 shadow-inner">
      <Image
        src="/images/products/mock/fruits-a.jpg"
        alt=""
        fill
        className="object-cover opacity-90 mix-blend-overlay"
        sizes="(max-width: 1024px) 100vw, 380px"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-green-700/75 via-green-600/55 to-transparent" />
      <div className="relative flex h-full flex-col justify-center p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-100">
          {t('megaBannerEyebrow')}
        </p>
        <h3 className="mt-2 max-w-[12rem] text-2xl font-bold leading-tight text-white whitespace-pre-line sm:text-[1.65rem]">
          {t('megaBannerTitle')}
        </h3>
        <p className="mt-2 text-sm font-semibold text-green-100">{t('megaBannerSave')}</p>
        <Link
          href="/category/all"
          className="mt-5 inline-flex w-fit rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-green-700 shadow-sm transition-colors hover:bg-green-50"
          onClick={onClose}
        >
          {t('megaBannerCta')}
        </Link>
      </div>
      <div
        className="pointer-events-none absolute -right-1 top-3 flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-full bg-orange-500 text-center text-white shadow-lg ring-4 ring-white/20 sm:h-20 sm:w-20"
        aria-hidden
      >
        <span className="text-lg font-black leading-none sm:text-xl">25%</span>
        <span className="text-[10px] font-bold uppercase leading-tight sm:text-xs">off</span>
      </div>
    </div>
  );
}

export default function CategoriesMegaMenu({
  onClose,
  variant = 'full',
}: CategoriesMegaMenuProps) {
  const t = useTranslations('Header');
  const tCat = useTranslations('SearchBar.categories');

  if (variant === 'compact') {
    return (
      <div
        role="menu"
        className="absolute left-0 top-full z-[60] mt-1.5 w-[min(38rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl ring-1 ring-black/5"
      >
        <div className="border-b border-gray-100 bg-gray-50/80 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{t('megaMenuTitle')}</p>
        </div>
        <div className="grid max-h-[min(28rem,70vh)] grid-cols-2 gap-x-5 gap-y-6 overflow-y-auto p-4 sm:grid-cols-3">
          {MEGA_MENU_COLUMNS.map((column) => (
            <MegaMenuColumnBlock
              key={column.titleKey}
              column={column}
              onClose={onClose}
              t={t}
              tCat={tCat}
              compact
            />
          ))}
        </div>
        <div className="border-t border-gray-100 bg-gray-50/60 px-4 py-3">
          <Link
            href="/category/all"
            className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
            onClick={onClose}
          >
            {t('megaViewAll')}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      role="menu"
      className="overflow-hidden rounded-b-2xl border border-t-0 border-gray-100 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
    >
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-3.5">
          <p className="text-sm font-bold text-gray-900">{t('megaMenuTitle')}</p>
          <Link
            href="/category/all"
            className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 transition-colors hover:text-green-700"
            onClick={onClose}
          >
            {t('megaViewAll')}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-7 lg:py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-6 xl:gap-8">
          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {MEGA_MENU_COLUMNS.map((column) => (
              <MegaMenuColumnBlock
                key={column.titleKey}
                column={column}
                onClose={onClose}
                t={t}
                tCat={tCat}
              />
            ))}
          </div>

          <div className="w-full shrink-0 lg:w-[min(100%,22rem)] xl:w-[min(100%,24rem)]">
            <PromoBanner onClose={onClose} t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile drawer category list — shared styling with mega menu */
export function MobileCategoriesNav({ onClose }: { onClose: () => void }) {
  const t = useTranslations('Header');
  const tCat = useTranslations('SearchBar.categories');

  return (
    <div className="space-y-3">
      {MEGA_MENU_COLUMNS.map((column) => (
        <div
          key={column.titleKey}
          className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50"
        >
          <Link
            href={categoryHref(column.categorySlug)}
            className="flex items-center gap-3 border-b border-gray-100 bg-white px-3 py-2.5 text-sm font-bold text-gray-900 hover:text-green-600"
            onClick={onClose}
          >
            {ICON_BY_SLUG[column.categorySlug] && (
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 ring-1 ring-green-100">
                <Image
                  src={ICON_BY_SLUG[column.categorySlug]}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </span>
            )}
            {t(column.titleKey as Parameters<typeof t>[0])}
          </Link>
          <ul className="space-y-0.5 p-2">
            {column.links.map(({ slug }) => (
              <li key={`${column.titleKey}-${slug}`}>
                <CategoryLink slug={slug} onClose={onClose} tCat={tCat} t={t} compact />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link
        href="/category/all"
        className="flex items-center justify-center gap-1 rounded-xl border border-green-200 bg-green-50 py-2.5 text-sm font-semibold text-green-700"
        onClick={onClose}
      >
        {t('megaViewAll')}
        <ChevronRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
