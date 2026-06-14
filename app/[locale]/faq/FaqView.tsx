'use client';

import React, { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import { FAQ_SECTIONS, type FaqItemId, type FaqSectionId } from '@/lib/faq-content';

function FaqAccordionItem({
  itemId,
  isOpen,
  onToggle,
}: {
  itemId: FaqItemId;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations('FAQ');
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-gray-900 transition-colors hover:text-green-700 sm:text-base"
        >
          <span>{t(`items.${itemId}.question`)}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-green-600' : ''
            }`}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="pb-4 pr-8"
      >
        <p className="text-sm leading-relaxed text-gray-600 sm:text-[15px]">
          {t(`items.${itemId}.answer`)}
        </p>
      </div>
    </div>
  );
}

export default function FaqView() {
  const t = useTranslations('FAQ');
  const tHeader = useTranslations('Header');
  const [openItem, setOpenItem] = useState<FaqItemId | null>('trackOrder');

  const toggleItem = (itemId: FaqItemId) => {
    setOpenItem((current) => (current === itemId ? null : itemId));
  };

  return (
    <PageShell>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-green-600" aria-label={t('breadcrumbNav')}>
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                {tHeader('home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-gray-800">{t('breadcrumbFaq')}</li>
          </ol>
        </nav>

        <div className="mt-6 max-w-3xl">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <HelpCircle className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-8 lg:max-w-3xl">
          {FAQ_SECTIONS.map((section) => (
            <section key={section.id} aria-labelledby={`faq-section-${section.id}`}>
              <h2
                id={`faq-section-${section.id}`}
                className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500"
              >
                {t(`sections.${section.id as FaqSectionId}`)}
              </h2>
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white px-5 shadow-sm sm:px-6">
                {section.itemIds.map((itemId) => (
                  <FaqAccordionItem
                    key={itemId}
                    itemId={itemId}
                    isOpen={openItem === itemId}
                    onToggle={() => toggleItem(itemId)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-green-100 bg-green-50 p-6 lg:max-w-3xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden />
              <div>
                <p className="font-semibold text-gray-900">{t('contactCta')}</p>
                <p className="mt-1 text-sm text-gray-600">{t('contactHint')}</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              {t('contactLink')}
            </Link>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
