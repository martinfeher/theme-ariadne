'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Heart,
  Leaf,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  Users,
} from 'lucide-react';
import Header from '@/app/components/Header';
import { CONTACT_INFO } from '@/lib/contact-info';

const STATS = [
  { key: 'statProducts', value: '2,500+', icon: ShoppingBag },
  { key: 'statCustomers', value: '48k+', icon: Users },
  { key: 'statVendors', value: '120+', icon: Store },
  { key: 'statDelivery', value: '24h', icon: Truck },
] as const;

const VALUES = [
  { key: 'valueQuality', icon: ShieldCheck, tone: 'bg-green-50 text-green-600' },
  { key: 'valueFresh', icon: Leaf, tone: 'bg-emerald-50 text-emerald-600' },
  { key: 'valueCommunity', icon: Heart, tone: 'bg-orange-50 text-orange-500' },
] as const;

export default function AboutView() {
  const t = useTranslations('About');
  const tHeader = useTranslations('Header');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-green-600 text-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(/images/products/mock/vegetables-b.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-700/90 via-green-600/85 to-green-500/80" aria-hidden />
          <div className="container relative mx-auto px-4 py-14 lg:py-20">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <nav className="text-sm text-green-100" aria-label={t('breadcrumbNav')}>
                <ol className="flex flex-wrap items-center gap-1">
                  <li>
                    <Link href="/" className="hover:text-white">
                      {tHeader('home')}
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="font-medium text-white">{t('breadcrumbAbout')}</li>
                </ol>
              </nav>
              <Link
                href="/about-2"
                className="text-sm font-medium text-green-100 underline-offset-2 hover:text-white hover:underline"
              >
                {t('viewVersion2')}
              </Link>
            </div>
            <h1 className="mt-6 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 max-w-xl text-base text-green-50 sm:text-lg">{t('heroSubtitle')}</p>
          </div>
        </section>

        {/* Story */}
        <section className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
              <Image
                src="/images/products/mock/fruits-a.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-green-600">{t('storyEyebrow')}</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{t('storyTitle')}</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{t('storyP1')}</p>
              <p className="mt-4 text-gray-600 leading-relaxed">{t('storyP2')}</p>
              <Link
                href="/category/all"
                className="mt-6 inline-flex rounded-lg bg-green-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
              >
                {t('shopCta')}
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white py-12 lg:py-14">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map(({ key, value, icon: Icon }) => (
                <div
                  key={key}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5 shadow-sm"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-600">{t(key)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 py-12 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-green-600">{t('valuesEyebrow')}</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{t('valuesTitle')}</h2>
            <p className="mt-3 text-gray-600">{t('valuesSubtitle')}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {VALUES.map(({ key, icon: Icon, tone }) => (
              <article
                key={key}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${tone}`}>
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{t(`${key}Title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(`${key}Desc`)}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Mission banner */}
        <section className="container mx-auto px-4 pb-12 lg:pb-16">
          <div className="overflow-hidden rounded-2xl bg-green-600 text-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[220px] lg:min-h-0">
                <Image
                  src="/images/products/mock/organic_carrots.jpeg"
                  alt=""
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-green-900/30" aria-hidden />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <h2 className="text-2xl font-bold sm:text-3xl">{t('missionTitle')}</h2>
                <p className="mt-4 text-green-50 leading-relaxed">{t('missionDesc')}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-green-700 transition-colors hover:bg-green-50"
                  >
                    {t('contactCta')}
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    {t('blogCta')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit */}
        <section className="border-t border-gray-100 bg-white py-10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-bold text-gray-900">{t('visitTitle')}</h2>
            <p className="mt-2 text-gray-600">
              {CONTACT_INFO.addressLine1}, {CONTACT_INFO.city}
            </p>
            <a
              href={CONTACT_INFO.phoneHref}
              className="mt-1 block text-green-600 hover:text-green-700"
            >
              {CONTACT_INFO.phone}
            </a>
            <Link
              href="/contact"
              className="mt-4 inline-flex text-sm font-semibold text-green-600 hover:text-green-700"
            >
              {t('visitLink')} →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
