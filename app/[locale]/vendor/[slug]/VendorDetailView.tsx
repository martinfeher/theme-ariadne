'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, MapPin, Star } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import ProductCard from '@/app/components/ProductCard';
import { useVendorI18n } from '@/app/hooks/useVendorI18n';
import { getProductsByVendor, type Vendor } from '@/lib/mock-vendors';
import { CONTACT_INFO } from '@/lib/contact-info';

function StarRow({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < filled ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

export default function VendorDetailView({ vendor }: { vendor: Vendor }) {
  const t = useTranslations('Vendors');
  const tHeader = useTranslations('Header');
  const { getVendorTagline, getVendorDescription } = useVendorI18n();
  const products = getProductsByVendor(vendor);

  return (
    <PageShell>

      <main>
        <section className="relative overflow-hidden bg-gray-900">
          <div className="absolute inset-0">
            <Image
              src={vendor.banner}
              alt=""
              fill
              className="object-cover opacity-50"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/40" />
          </div>

          <div className="container relative mx-auto px-4 py-10 lg:py-14">
            <nav className="text-sm text-green-200" aria-label={t('breadcrumbNav')}>
              <ol className="flex flex-wrap items-center gap-1">
                <li>
                  <Link href="/" className="hover:text-white">
                    {tHeader('home')}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/vendors" className="hover:text-white">
                    {t('breadcrumbVendors')}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-white">{vendor.name}</li>
              </ol>
            </nav>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg sm:h-24 sm:w-24">
                <Image src={vendor.logo} alt="" fill className="object-cover" sizes="96px" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                    {vendor.name}
                  </h1>
                  {vendor.featured && (
                    <span className="rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                      {t('featured')}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-green-100">{getVendorTagline(vendor.slug)}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-200">
                  <span className="inline-flex items-center gap-1.5">
                    <StarRow rating={vendor.rating} />
                    {t('rating', { rating: vendor.rating.toFixed(1) })}
                    <span className="text-gray-400">({vendor.reviewCount})</span>
                  </span>
                  <span>{t('productsCount', { count: products.length })}</span>
                  <span>{t('since', { year: vendor.since })}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-3 lg:py-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900">{t('aboutVendor')}</h2>
            <p className="mt-4 leading-relaxed text-gray-600">{getVendorDescription(vendor.slug)}</p>

            <h2 className="mt-10 text-xl font-bold text-gray-900">
              {t('vendorProducts', { name: vendor.name })}
            </h2>
            {products.length === 0 ? (
              <p className="mt-4 text-gray-600">{t('noProducts')}</p>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                {t('storeInfo')}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li className="flex gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden />
                  <span>
                    {CONTACT_INFO.addressLine1}
                    <br />
                    {CONTACT_INFO.city}
                  </span>
                </li>
                <li className="flex gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden />
                  <a href={CONTACT_INFO.emailHref} className="hover:text-green-600">
                    {CONTACT_INFO.email}
                  </a>
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
              >
                {t('contactVendor')}
              </Link>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                {t('browseMore')}
              </h2>
              <Link
                href="/vendors"
                className="mt-3 inline-flex text-sm font-semibold text-green-600 hover:text-green-700"
              >
                {t('allVendors')} →
              </Link>
            </div>
          </aside>
        </section>
      </main>
    </PageShell>
  );
}
