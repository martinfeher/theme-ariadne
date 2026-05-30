'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import {
  MEGA_MENU_COLUMNS,
  MEGA_MENU_SIDEBAR,
  categoryHref,
  type MegaMenuColumn,
  type MegaMenuSidebarItem,
  type MegaMenuSubGroup,
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
  tCat: ReturnType<typeof useTranslations<'SearchBar.categories'>>
) {
  if (slug === 'all') return tCat('all');
  return tCat(slug as Parameters<typeof tCat>[0]);
}

function sidebarLabel(
  item: MegaMenuSidebarItem,
  t: ReturnType<typeof useTranslations<'Header'>>
) {
  return t(`megaSidebarLabels.${item.labelKey}` as Parameters<typeof t>[0]);
}

function CategoryLink({
  slug,
  onClose,
  tCat,
  compact,
}: {
  slug: MegaMenuColumn['links'][0]['slug'];
  onClose: () => void;
  tCat: ReturnType<typeof useTranslations<'SearchBar.categories'>>;
  compact?: boolean;
}) {
  const icon = ICON_BY_SLUG[slug];

  return (
    <Link
      href={categoryHref(slug)}
      role="menuitem"
      className={`group/link flex items-center gap-2.5 rounded-lg transition-colors ${
        compact ? 'px-2 py-1.5' : 'px-2.5 py-2 -mx-2.5'
      } hover:bg-green-50`}
      onClick={onClose}
    >
      {icon && slug !== 'all' && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 ring-1 ring-gray-100">
          <Image src={icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
        </span>
      )}
      <span className="min-w-0 flex-1 text-sm text-gray-600 group-hover/link:text-green-700">
        {categoryLabel(slug, tCat)}
      </span>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300 opacity-0 group-hover/link:opacity-100" aria-hidden />
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
  return (
    <div className={compact ? '' : 'min-w-0'}>
      <Link
        href={categoryHref(column.categorySlug)}
        role="menuitem"
        className="text-sm font-bold text-gray-900 hover:text-green-600"
        onClick={onClose}
      >
        {t(column.titleKey as Parameters<typeof t>[0])}
      </Link>
      <ul className="mt-2 space-y-0.5">
        {column.links.map(({ slug }) => (
          <li key={`${column.titleKey}-${slug}`}>
            <CategoryLink slug={slug} onClose={onClose} tCat={tCat} compact={compact} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubGroupPanel({
  group,
  onClose,
  tCat,
  t,
}: {
  group: MegaMenuSubGroup;
  onClose: () => void;
  tCat: ReturnType<typeof useTranslations<'SearchBar.categories'>>;
  t: ReturnType<typeof useTranslations<'Header'>>;
}) {
  return (
    <div className="flex min-h-[9rem] gap-4">
      <Link
        href={categoryHref(group.slug)}
        className="group/image relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-50"
        onClick={onClose}
      >
        <Image
          src={group.image}
          alt=""
          fill
          className="object-cover transition-transform group-hover/image:scale-105"
          sizes="80px"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={categoryHref(group.slug)}
          className="text-[15px] font-bold leading-snug text-gray-900 hover:text-green-700"
          onClick={onClose}
        >
          {categoryLabel(group.slug, tCat)}
        </Link>
        <ul className="mt-2.5 space-y-1.5">
          {group.sampleLinkKeys.map((key) => (
            <li key={key}>
              <Link
                href={categoryHref(group.slug)}
                className="text-sm leading-snug text-gray-600 hover:text-gray-900 hover:underline"
                onClick={onClose}
              >
                {t(`megaSubLinks.${key}` as Parameters<typeof t>[0])}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={categoryHref(group.slug)}
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              {t('megaMore')}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function MegaMenuEmptyPanel({ t }: { t: ReturnType<typeof useTranslations<'Header'>> }) {
  return (
    <div className="flex min-h-[22rem] flex-1 flex-col items-center justify-center bg-white px-8 py-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <ShoppingCart className="h-7 w-7" strokeWidth={1.5} aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-slate-900">{t('megaMenuTitle')}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">{t('megaEmptyHint')}</p>
    </div>
  );
}

function MegaMenuSidebar({
  items,
  activeSlug,
  onActiveChange,
  t,
}: {
  items: MegaMenuSidebarItem[];
  activeSlug: string | null;
  onActiveChange: (labelKey: string) => void;
  t: ReturnType<typeof useTranslations<'Header'>>;
}) {
  return (
    <aside className="w-[17rem] shrink-0 border-r border-slate-200/80 bg-slate-50">
      <ul className="max-h-[min(28rem,70vh)] overflow-y-auto py-2">
        {items.map((item) => {
          const isActive = activeSlug === item.labelKey;
          return (
            <li key={item.labelKey} className="px-2">
              <button
                type="button"
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80'
                    : 'text-slate-700 hover:bg-white/70'
                }`}
                onMouseEnter={() => onActiveChange(item.labelKey)}
                onFocus={() => onActiveChange(item.labelKey)}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200/60">
                  <Image
                    src={item.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] object-contain"
                  />
                </span>
                <span className={`min-w-0 flex-1 text-sm leading-snug ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {sidebarLabel(item, t)}
                </span>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 ${isActive ? 'text-slate-400' : 'text-slate-300'}`}
                  strokeWidth={1.75}
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function MegaMenuFullPanel({
  item,
  onClose,
  t,
  tCat,
}: {
  item: MegaMenuSidebarItem;
  onClose: () => void;
  t: ReturnType<typeof useTranslations<'Header'>>;
  tCat: ReturnType<typeof useTranslations<'SearchBar.categories'>>;
}) {
  const categoryName = sidebarLabel(item, t);

  return (
    <div className="min-w-0 flex-1 overflow-y-auto bg-white">
      <div className="border-b border-slate-100 px-8 py-4">
        <Link
          href={categoryHref(item.categorySlug)}
          className="inline-flex items-center gap-1 text-[15px] font-bold text-slate-900 hover:text-green-700"
          onClick={onClose}
        >
          {t('megaAllFrom', { category: categoryName })}
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </Link>
      </div>

      <div className="grid grid-cols-1 border-slate-100 sm:grid-cols-2">
        {item.subgroups.map((group, index) => (
          <div
            key={`${item.labelKey}-${group.slug}-${index}`}
            className={`border-b border-slate-100 p-6 sm:p-7 ${index % 2 === 0 ? 'sm:border-r' : ''}`}
          >
            <SubGroupPanel group={group} onClose={onClose} tCat={tCat} t={t} />
          </div>
        ))}
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
  const [activeLabelKey, setActiveLabelKey] = useState<string | null>(null);

  const activeItem = activeLabelKey
    ? MEGA_MENU_SIDEBAR.find((item) => item.labelKey === activeLabelKey)
    : undefined;

  if (variant === 'compact') {
    return (
      <div
        role="menu"
        className="absolute left-0 top-full z-[60] -mt-px w-[min(38rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl ring-1 ring-black/5 before:absolute before:inset-x-0 before:bottom-full before:h-2 before:content-['']"
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
      </div>
    );
  }

  return (
    <div
      role="menu"
      className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_24px_48px_-12px_rgba(15,23,42,0.18)]"
    >
      <div className="flex min-h-[22rem] max-h-[min(28rem,72vh)]">
        <MegaMenuSidebar
          items={MEGA_MENU_SIDEBAR}
          activeSlug={activeLabelKey}
          onActiveChange={setActiveLabelKey}
          t={t}
        />
        {activeItem ? (
          <MegaMenuFullPanel item={activeItem} onClose={onClose} t={t} tCat={tCat} />
        ) : (
          <MegaMenuEmptyPanel t={t} />
        )}
      </div>
    </div>
  );
}

/** Mobile drawer category list */
export function MobileCategoriesNav({ onClose }: { onClose: () => void }) {
  const t = useTranslations('Header');

  return (
    <div className="space-y-3">
      {MEGA_MENU_SIDEBAR.map((item) => (
        <div
          key={item.labelKey}
          className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50"
        >
          <Link
            href={categoryHref(item.categorySlug)}
            className="flex items-center gap-3 border-b border-gray-100 bg-white px-3 py-2.5 text-sm font-bold text-gray-900 hover:text-green-600"
            onClick={onClose}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-200/60">
              <Image
                src={item.icon}
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px] object-contain"
              />
            </span>
            {sidebarLabel(item, t)}
          </Link>
          <ul className="space-y-0.5 p-2">
            {item.subgroups.slice(0, 4).map((group, index) => (
              <li key={`${group.slug}-${index}`}>
                <Link
                  href={categoryHref(group.slug)}
                  className="block rounded-lg px-2 py-1.5 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700"
                  onClick={onClose}
                >
                  {t(`megaSubLinks.${group.sampleLinkKeys[0]}` as Parameters<typeof t>[0])}
                </Link>
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
