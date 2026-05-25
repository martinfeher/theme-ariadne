'use client';

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LayoutGrid, List, Search } from 'lucide-react';
import Header from '@/app/components/Header';
import VendorCard, { VendorListItem } from '@/app/components/vendors/VendorCard';
import { MOCK_VENDORS } from '@/lib/mock-vendors';
import { useVendorI18n } from '@/app/hooks/useVendorI18n';

type LayoutMode = 'grid' | 'list';

export default function VendorsView({ initialLayout = 'grid' }: { initialLayout?: LayoutMode }) {
  const t = useTranslations('Vendors');
  const tHeader = useTranslations('Header');
  const { getVendorTagline } = useVendorI18n();
  const [layout, setLayout] = useState<LayoutMode>(initialLayout);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_VENDORS;
    return MOCK_VENDORS.filter((vendor) => {
      const tagline = getVendorTagline(vendor.slug).toLowerCase();
      return vendor.name.toLowerCase().includes(q) || tagline.includes(q);
    });
  }, [query, getVendorTagline]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-green-600" aria-label={t('breadcrumbNav')}>
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                {tHeader('home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-gray-800">{t('breadcrumbVendors')}</li>
          </ol>
        </nav>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">{t('subtitle')}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setLayout('grid')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                  layout === 'grid' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-green-600'
                }`}
                aria-pressed={layout === 'grid'}
              >
                <LayoutGrid className="h-4 w-4" aria-hidden />
                {t('gridView')}
              </button>
              <button
                type="button"
                onClick={() => setLayout('list')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                  layout === 'list' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-green-600'
                }`}
                aria-pressed={layout === 'list'}
              >
                <List className="h-4 w-4" aria-hidden />
                {t('listView')}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 max-w-md">
          <label htmlFor="vendor-search" className="sr-only">
            {t('searchPlaceholder')}
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="vendor-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>

        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
              <p className="text-gray-600">{t('noResults')}</p>
            </div>
          ) : layout === 'grid' ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((vendor) => (
                <VendorCard key={vendor.slug} vendor={vendor} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((vendor) => (
                <VendorListItem key={vendor.slug} vendor={vendor} />
              ))}
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">{t('demoHint')}</p>
      </main>
    </div>
  );
}
