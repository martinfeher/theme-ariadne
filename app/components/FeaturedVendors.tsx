'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Star, Store } from 'lucide-react';
import { MOCK_VENDORS, countProductsByVendor, vendorHref } from '@/lib/mock-vendors';
import { useVendorI18n } from '@/app/hooks/useVendorI18n';

const FeaturedVendors: React.FC = () => {
  const t = useTranslations('FeaturedVendors');
  const tVendors = useTranslations('Vendors');
  const { getVendorTagline } = useVendorI18n();

  const featured = MOCK_VENDORS.filter((vendor) => vendor.featured);
  const vendors = featured.length > 0 ? featured : MOCK_VENDORS;

  if (vendors.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-gray-50 py-4 lg:py-6">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-2 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="flex shrink-0 items-center gap-2 text-2xl font-bold tracking-tight text-[#253D4E] sm:text-3xl lg:text-[32px]">
              <Store className="h-6 w-6 text-[#17A34B]" aria-hidden />
              {t('title')}
            </h2>
            <p className="mt-1 max-w-md text-sm text-gray-500">{t('subtitle')}</p>
          </div>
          <Link
            href="/vendors"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#17A34B] transition-colors hover:text-green-700"
          >
            {t('viewAll')}
            <span aria-hidden>→</span>
          </Link>
        </div>
        <hr className="mb-6 border-gray-200" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {vendors.map((vendor) => (
            <Link
              key={vendor.slug}
              href={vendorHref(vendor.slug)}
              className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-100">
                <Image
                  src={vendor.logo}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-gray-900 group-hover:text-[#17A34B] sm:text-base">
                  {vendor.name}
                </h3>
                <p className="truncate text-xs text-gray-500">{getVendorTagline(vendor.slug)}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                  <span className="text-xs font-medium text-gray-600">
                    {vendor.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400" aria-hidden>
                    ·
                  </span>
                  <span className="truncate text-xs text-gray-500">
                    {tVendors('productsCount', { count: countProductsByVendor(vendor) })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
