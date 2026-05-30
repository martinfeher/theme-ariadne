'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FileText, Mail, Shield } from 'lucide-react';
import Header from '@/app/components/Header';
import { PRIVACY_SECTIONS, PRIVACY_SECTIONS_WITH_LIST } from '@/lib/privacy-content';
import { CONTACT_INFO } from '@/lib/contact-info';

export default function PrivacyView() {
  const t = useTranslations('Privacy');
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
            <li className="font-medium text-gray-800">{t('breadcrumb')}</li>
          </ol>
        </nav>

        <div className="mt-6 max-w-3xl">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <Shield className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">{t('subtitle')}</p>
              <p className="mt-2 text-xs text-gray-500">{t('lastUpdated')}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
          <article className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            {PRIVACY_SECTIONS.map((sectionId, index) => (
              <section
                key={sectionId}
                id={sectionId}
                className={index > 0 ? 'mt-10 border-t border-gray-100 pt-10' : ''}
              >
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {t(`sections.${sectionId}.title`)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
                  {t(`sections.${sectionId}.body`)}
                </p>
                {PRIVACY_SECTIONS_WITH_LIST.includes(sectionId) && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
                    {(t.raw(`sections.${sectionId}.list`) as string[]).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-900">
                <FileText className="h-4 w-4 text-green-600" aria-hidden />
                {t('tocTitle')}
              </h2>
              <nav className="mt-3" aria-label={t('tocTitle')}>
                <ul className="space-y-1.5">
                  {PRIVACY_SECTIONS.map((sectionId) => (
                    <li key={sectionId}>
                      <a
                        href={`#${sectionId}`}
                        className="block text-sm text-gray-600 transition-colors hover:text-green-600"
                      >
                        {t(`sections.${sectionId}.title`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 p-5">
              <h2 className="text-sm font-bold text-gray-900">{t('relatedTitle')}</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm font-medium text-green-700 hover:text-green-800"
                  >
                    {t('termsLink')} →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund-policy"
                    className="text-sm font-medium text-green-700 hover:text-green-800"
                  >
                    {t('refundPolicyLink')} →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm font-medium text-green-700 hover:text-green-800"
                  >
                    {t('faqLink')} →
                  </Link>
                </li>
              </ul>
              <div className="mt-4 border-t border-green-200/80 pt-4">
                <p className="text-sm text-gray-600">{t('helpDesc')}</p>
                <Link
                  href="/contact"
                  className="mt-2 flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {t('contactCta')}
                </Link>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="mt-1 block text-sm text-gray-600 hover:text-green-700"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
