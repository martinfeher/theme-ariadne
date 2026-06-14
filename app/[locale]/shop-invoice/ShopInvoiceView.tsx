'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Home as HomeIcon } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import {
  DEMO_SHOP_INVOICE_LINES,
  DEMO_SHOP_INVOICE_TAX,
  getLineAmount,
  getShopInvoiceGrandTotal,
  getShopInvoiceSubtotal,
} from '@/lib/shop-invoice';

const thClass =
  'border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900';
const tdClass = 'px-4 py-4 text-sm text-slate-700 align-top';

export default function ShopInvoiceView() {
  const t = useTranslations('ShopInvoice');
  const tHeader = useTranslations('Header');
  const formatPrice = useFormatCurrency();

  const subtotal = getShopInvoiceSubtotal(DEMO_SHOP_INVOICE_LINES);
  const grandTotal = getShopInvoiceGrandTotal(DEMO_SHOP_INVOICE_LINES, DEMO_SHOP_INVOICE_TAX);

  return (
    <PageShell>
      <main className="container mx-auto max-w-5xl px-4 py-8 lg:py-12">
        <nav
          className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600"
          aria-label={t('breadcrumbNav')}
        >
          <Link href="/" className="inline-flex items-center gap-1 hover:text-green-600">
            <HomeIcon className="h-4 w-4" aria-hidden />
            {tHeader('home')}
          </Link>
          <span className="text-slate-400" aria-hidden>
            /
          </span>
          <span className="font-medium text-slate-900">{t('breadcrumb')}</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-2 text-slate-600">{t('subtitle')}</p>
        </header>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="bg-white">
                  <th scope="col" className={thClass}>
                    {t('colItem')}
                  </th>
                  <th scope="col" className={`${thClass} text-right`}>
                    {t('colUnitPrice')}
                  </th>
                  <th scope="col" className={`${thClass} text-right`}>
                    {t('colQuantity')}
                  </th>
                  <th scope="col" className={`${thClass} text-right`}>
                    {t('colAmount')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {DEMO_SHOP_INVOICE_LINES.map((line, index) => (
                  <tr
                    key={line.id}
                    className={index % 2 === 1 ? 'bg-slate-50/80' : 'bg-white'}
                  >
                    <td className={tdClass}>
                      <p className="font-semibold text-slate-900">{t(`items.${line.nameKey}`)}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {t('skuLabel', { sku: line.sku })}
                      </p>
                    </td>
                    <td className={`${tdClass} text-right tabular-nums`}>
                      {formatPrice(line.unitPrice)}
                    </td>
                    <td className={`${tdClass} text-right tabular-nums`}>{line.quantity}</td>
                    <td className={`${tdClass} text-right font-medium tabular-nums text-slate-900`}>
                      {formatPrice(getLineAmount(line))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end border-t border-slate-100 bg-white px-4 py-5 sm:px-6">
            <dl className="w-full max-w-xs space-y-2 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600">{t('subtotal')}</dt>
                <dd className="font-medium tabular-nums text-slate-900">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600">{t('tax')}</dt>
                <dd className="font-medium tabular-nums text-slate-900">
                  {formatPrice(DEMO_SHOP_INVOICE_TAX)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-2">
                <dt className="font-semibold text-slate-900">{t('grandTotal')}</dt>
                <dd className="text-base font-bold tabular-nums text-slate-900">
                  {formatPrice(grandTotal)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
