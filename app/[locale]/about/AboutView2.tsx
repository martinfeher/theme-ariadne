'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Recycle,
  Sparkles,
} from 'lucide-react';
import Header from '@/app/components/Header';
import { CONTACT_INFO } from '@/lib/contact-info';

const STEPS = ['stepSource', 'stepPick', 'stepDeliver'] as const;

const HIGHLIGHTS = [
  { key: 'highlightOrganic', icon: Sparkles },
  { key: 'highlightLocal', icon: MapPin },
  { key: 'highlightWaste', icon: Recycle },
  { key: 'highlightSpeed', icon: Clock },
] as const;

export default function AboutView2() {
  const t = useTranslations('About2');
  const tHeader = useTranslations('Header');

  return (
    <div className="min-h-screen bg-[#f8f9f6]">
      <Header />

      <main>
        <section className="border-b border-gray-100 bg-white">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <nav className="text-gray-500" aria-label={t('breadcrumbNav')}>
                <ol className="flex flex-wrap items-center gap-1">
                  <li>
                    <Link href="/" className="hover:text-green-600">
                      {tHeader('home')}
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="font-medium text-gray-800">{t('breadcrumbAbout')}</li>
                </ol>
              </nav>
              <Link
                href="/about"
                className="font-medium text-green-600 hover:text-green-700"
              >
                {t('viewVersion1')}
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-800">
                {t('heroBadge')}
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {t('heroTitle')}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
                {t('heroSubtitle')}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/category/all"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                >
                  {t('shopCta')}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/vendors"
                  className="inline-flex rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-green-200 hover:text-green-700"
                >
                  {t('vendorsCta')}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-gray-100 shadow-lg ring-1 ring-gray-100">
                <Image
                  src="/images/products/mock/vegetables-b.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 max-w-[220px] rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:-left-6">
                <p className="text-2xl font-bold text-green-600">2018</p>
                <p className="mt-1 text-sm text-gray-600">{t('foundedLabel')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-green-700 py-10 text-white lg:py-12">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm font-bold uppercase tracking-wide text-green-200">
              {t('statsEyebrow')}
            </p>
            <div className="mt-6 grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  { value: '2,500+', key: 'statProducts' },
                  { value: '48k+', key: 'statCustomers' },
                  { value: '120+', key: 'statVendors' },
                  { value: '98%', key: 'statSatisfaction' },
                ] as const
              ).map(({ value, key }) => (
                <div key={key}>
                  <p className="text-3xl font-bold lg:text-4xl">{value}</p>
                  <p className="mt-1 text-sm text-green-100">{t(key)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('highlightsTitle')}</h2>
            <p className="mt-3 text-gray-600">{t('highlightsSubtitle')}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map(({ key, icon: Icon }) => (
              <article
                key={key}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3 font-bold text-gray-900">{t(`${key}Title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(`${key}Desc`)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-gray-100 bg-white py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start lg:gap-14">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-green-600">
                  {t('processEyebrow')}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{t('processTitle')}</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{t('processDesc')}</p>
              </div>
              <ol className="space-y-6">
                {STEPS.map((key, index) => (
                  <li
                    key={key}
                    className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50/80 p-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900">{t(`${key}Title`)}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">{t(`${key}Desc`)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid items-center gap-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 lg:grid-cols-2">
            <div className="relative min-h-[240px] lg:min-h-full">
              <Image
                src="/images/products/mock/fruits-a.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-8 lg:p-10">
              <Package className="h-8 w-8 text-green-500" aria-hidden />
              <blockquote className="mt-4 text-xl font-medium leading-relaxed text-gray-900 sm:text-2xl">
                &ldquo;{t('quote')}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-gray-500">{t('quoteAttribution')}</p>
              <ul className="mt-6 space-y-2">
                {(['promise1', 'promise2', 'promise3'] as const).map((key) => (
                  <li key={key} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12 lg:pb-16">
          <div className="rounded-2xl bg-gradient-to-br from-green-600 to-green-700 px-6 py-10 text-center text-white sm:px-10 lg:py-12">
            <h2 className="text-2xl font-bold sm:text-3xl">{t('ctaTitle')}</h2>
            <p className="mx-auto mt-3 max-w-lg text-green-50">{t('ctaDesc')}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-green-700 transition-colors hover:bg-green-50"
              >
                {t('contactCta')}
              </Link>
              <Link
                href="/faq"
                className="inline-flex rounded-lg border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t('faqCta')}
              </Link>
            </div>
            <p className="mt-8 text-sm text-green-100">
              {CONTACT_INFO.addressLine1}, {CONTACT_INFO.city} ·{' '}
              <a href={CONTACT_INFO.phoneHref} className="underline hover:text-white">
                {CONTACT_INFO.phone}
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
