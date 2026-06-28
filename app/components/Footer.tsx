'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CreditCard, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import CurrencySwitcher from '@/app/components/CurrencySwitcher';
import { useHydrated } from '@/app/hooks/useHydrated';
import { CONTACT_INFO } from '@/lib/contact-info';

const PAYMENT_ICONS = [
  { src: '/images/theme/icons/payment-visa.svg', label: 'Visa', boxClass: 'h-7 w-11' },
  { src: '/images/theme/icons/payment-master.svg', label: 'Mastercard', boxClass: 'h-7 w-11' },
  { src: '/images/theme/icons/payment-paypal.svg', label: 'PayPal', boxClass: 'h-7 w-[6.875rem]' },
] as const;

const SOCIAL_LINKS = [
  { href: 'https://facebook.com', icon: '/images/theme/icons/social-fb.svg', label: 'Facebook' },
  { href: 'https://twitter.com', icon: '/images/theme/icons/social-tw.svg', label: 'Twitter' },
  { href: 'https://instagram.com', icon: '/images/theme/icons/social-insta.svg', label: 'Instagram' },
  { href: 'https://pinterest.com', icon: '/images/theme/icons/social-pin.svg', label: 'Pinterest' },
] as const;

type LinkColumn = {
  titleKey: 'columnShop' | 'columnHelp' | 'columnCompany';
  links: { href: string; labelKey: string }[];
};

const LINK_COLUMNS: LinkColumn[] = [
  {
    titleKey: 'columnShop',
    links: [
      { href: '/category/all', labelKey: 'linkNewArrivals' },
      { href: '/category/popular-products', labelKey: 'linkBestSellers' },
      { href: '/deals', labelKey: 'linkSale' },
      { href: '/pages', labelKey: 'linkCollections' },
      { href: '/vouchers', labelKey: 'linkGiftCards' },
    ],
  },
  {
    titleKey: 'columnHelp',
    links: [
      { href: '/contact', labelKey: 'linkShippingDelivery' },
      { href: '/refund-policy', labelKey: 'linkReturnsExchanges' },
      { href: '/faq', labelKey: 'linkFaq' },
      { href: '/order-tracking', labelKey: 'linkTrackOrder' },
      { href: '/faq', labelKey: 'linkSizeGuide' },
    ],
  },
  {
    titleKey: 'columnCompany',
    links: [
      { href: '/about', labelKey: 'linkAbout' },
      { href: '/about-2', labelKey: 'linkCareers' },
      { href: '/blog', labelKey: 'linkPress' },
      { href: '/blog/category/sustainability', labelKey: 'linkSustainability' },
      { href: '/contact', labelKey: 'linkAffiliates' },
    ],
  },
];

function FooterLinkColumn({ column }: { column: LinkColumn }) {
  const t = useTranslations('Footer');

  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
        {t(column.titleKey)}
      </h3>
      <ul className="mt-4 space-y-2">
        {column.links.map(({ href, labelKey }) => (
          <li key={`${href}-${labelKey}`}>
            <Link
              href={href}
              className="text-sm text-gray-600 transition-colors hover:text-[#3BB77E]"
            >
              {t(labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterNewsletter() {
  const t = useTranslations('Footer');
  const hydrated = useHydrated();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  if (subscribed) {
    return <p className="mt-3 text-sm font-medium text-green-800">{t('newsletterSuccess')}</p>;
  }

  if (!hydrated) {
    return (
      <div
        className="mt-3 flex flex-col gap-2 sm:flex-row"
        aria-hidden
      >
        <div className="h-[38px] min-w-0 flex-1 rounded-md border border-gray-200 bg-gray-50" />
        <div className="h-[38px] w-24 shrink-0 rounded-md bg-gray-200" />
      </div>
    );
  }

  return (
    <form onSubmit={handleNewsletter} className="mt-2 flex flex-col gap-2 sm:flex-row w-[340px]">
      <label htmlFor="footer-newsletter-email" className="sr-only">
        {t('newsletterEmailLabel')}
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        name="newsletter-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('newsletterPlaceholder')}
        required
        autoComplete="off"
        data-lpignore="true"
        data-1p-ignore
        data-form-type="other"
        className="min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
      />
      <button
        type="submit"
        className="shrink-0 cursor-pointer rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
      >
        {t('newsletterSubmit')}
      </button>
    </form>
  );
}

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white" aria-label={t('ariaLabel')}>
      <section className="container mx-auto px-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div>
            <Link href="/" className="text-lg font-bold text-gray-900">
              WebAriadne
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-[23px] text-gray-600">
              {t('aboutBlurb')}
            </p>
            <ul className="mt-5 space-y-1 text-sm text-gray-600">
              <li className="flex items-start gap-1">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden />
                <span>
                  {CONTACT_INFO.addressLine1}, {CONTACT_INFO.city}
                </span>
              </li>
              <li className="flex items-center gap-1">
                <Phone className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="transition-colors hover:text-[#3BB77E]"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-1">
                <Mail className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
                <a
                  href={CONTACT_INFO.emailHref}
                  className="transition-colors hover:text-[#3BB77E]"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-[15px] font-bold text-gray-900">{t('newsletterHeading')}</h3>
              <p className="mt-1 text-[13px] text-gray-600">{t('newsletterSubtitle')}</p>
              <FooterNewsletter />
            </div>
          </div>

          {LINK_COLUMNS.map((column) => (
            <FooterLinkColumn key={column.titleKey} column={column} />
          ))}

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              {t('followUs')}
            </h3>
            <nav className="mt-2 flex items-center gap-2.5" aria-label={t('socialLabel')}>
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                >
                  <Image src={icon} alt="" width={28} height={28} aria-hidden />
                </a>
              ))}
            </nav>

            <div className="mt-6">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-[17px] w-[17px] text-gray-500" aria-hidden />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  {t('securedPayments')}
                </h3>
              </div>
              <ul
                className="mt-3 flex items-center gap-3"
                aria-label={t('securedPayments')}
              >
                {PAYMENT_ICONS.map(({ src, label, boxClass }) => (
                  <li key={label}>
                    <span className={`relative block shrink-0 ${boxClass}`}>
                      <Image
                        src={src}
                        alt={label}
                        fill
                        sizes="110px"
                        className="object-contain object-center opacity-80"
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-gray-600" suppressHydrationWarning>
              {t('copyright', { year: new Date().getFullYear() })}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <CreditCard className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {t('localeNote')}
              </span>
              <LanguageSwitcher variant="tabs" />
              <CurrencySwitcher className="text-gray-700 hover:text-green-700" />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
