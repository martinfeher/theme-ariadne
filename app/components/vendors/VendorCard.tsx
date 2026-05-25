'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Star } from 'lucide-react';
import type { Vendor } from '@/lib/mock-vendors';
import { countProductsByVendor, vendorHref } from '@/lib/mock-vendors';
import { useVendorI18n } from '@/app/hooks/useVendorI18n';

function StarRow({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < filled ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  const t = useTranslations('Vendors');
  const { getVendorTagline } = useVendorI18n();
  const productCount = countProductsByVendor(vendor);

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={vendorHref(vendor.slug)} className="block">
        <div className="relative aspect-[16/7] overflow-hidden bg-gray-100">
          <Image
            src={vendor.banner}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {vendor.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white">
              {t('featured')}
            </span>
          )}
          <div className="absolute bottom-3 left-3 flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl border-2 border-white bg-white shadow-sm">
              <Image src={vendor.logo} alt="" fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{vendor.name}</h2>
              <p className="text-xs text-green-100">{getVendorTagline(vendor.slug)}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-3 p-4">
        <div>
          <div className="flex items-center gap-2">
            <StarRow rating={vendor.rating} />
            <span className="text-xs text-gray-500">
              {t('rating', { rating: vendor.rating.toFixed(1) })}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {t('productsCount', { count: productCount })} · {t('since', { year: vendor.since })}
          </p>
        </div>
        <Link
          href={vendorHref(vendor.slug)}
          className="shrink-0 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition-colors hover:bg-green-100"
        >
          {t('visitStore')}
        </Link>
      </div>
    </article>
  );
}

export function VendorListItem({ vendor }: { vendor: Vendor }) {
  const t = useTranslations('Vendors');
  const { getVendorTagline } = useVendorI18n();
  const productCount = countProductsByVendor(vendor);

  return (
    <article className="group flex overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={vendorHref(vendor.slug)}
        className="relative w-36 shrink-0 overflow-hidden bg-gray-100 sm:w-44"
      >
        <Image src={vendor.banner} alt="" fill className="object-cover" sizes="176px" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-100">
            <Image src={vendor.logo} alt="" fill className="object-cover" sizes="44px" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-600">
                <Link href={vendorHref(vendor.slug)}>{vendor.name}</Link>
              </h2>
              {vendor.featured && (
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-green-700">
                  {t('featured')}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-gray-600">{getVendorTagline(vendor.slug)}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <StarRow rating={vendor.rating} />
            <span>{t('productsCount', { count: productCount })}</span>
            <span>{t('since', { year: vendor.since })}</span>
          </div>
          <Link
            href={vendorHref(vendor.slug)}
            className="text-sm font-semibold text-green-600 hover:text-green-700"
          >
            {t('visitStore')} →
          </Link>
        </div>
      </div>
    </article>
  );
}
