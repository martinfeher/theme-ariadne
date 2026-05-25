'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  AlertTriangle,
  FileQuestion,
  Rocket,
  Wrench,
} from 'lucide-react';
import Header from '@/app/components/Header';

const PAGES = [
  { href: '/404', key: 'page404', icon: FileQuestion, tone: 'text-green-600 bg-green-50' },
  { href: '/500', key: 'page500', icon: AlertTriangle, tone: 'text-red-600 bg-red-50' },
  { href: '/maintenance', key: 'pageMaintenance', icon: Wrench, tone: 'text-amber-600 bg-amber-50' },
  { href: '/coming-soon', key: 'pageComingSoon', icon: Rocket, tone: 'text-blue-600 bg-blue-50' },
] as const;

export default function PagesView() {
  const t = useTranslations('StatusPages');
  const tHeader = useTranslations('Header');

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
            <li className="font-medium text-gray-800">{t('pagesHubBreadcrumb')}</li>
          </ol>
        </nav>

        <div className="mt-6 max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('pagesHubTitle')}</h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">{t('pagesHubSubtitle')}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
          {PAGES.map(({ href, key, icon: Icon, tone }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${tone}`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-semibold text-gray-900 group-hover:text-green-600">
                  {t(`${key}Title`)}
                </span>
                <span className="mt-1 block text-sm text-gray-500">{t(`${key}Desc`)}</span>
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
