'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import {
  Heart,
  MapPin,
  Package,
  ShoppingBag,
  Ticket,
  User,
} from 'lucide-react';
import Header from '@/app/components/Header';
import AccountSidebar from '@/app/components/AccountSidebar';
import { useAuth } from '@/app/context/AuthContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { useCart } from '@/app/context/CartContext';
import { getOrdersForEmail } from '@/lib/order-history';

const QUICK_LINKS = [
  { href: '/order-history', labelKey: 'navOrders', actionKey: 'actionOrders', icon: Package },
  { href: '/wishlist', labelKey: 'navWishlist', actionKey: 'actionWishlist', icon: Heart },
  { href: '/vouchers', labelKey: 'navVouchers', actionKey: 'actionVouchers', icon: Ticket },
  { href: '/cart', labelKey: 'navCart', actionKey: 'actionCart', icon: ShoppingBag },
] as const;

export default function AccountView() {
  const t = useTranslations('Account');
  const tHeader = useTranslations('Header');
  const tAuth = useTranslations('Auth');
  const router = useRouter();
  const { user, isReady, logout } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const { itemCount } = useCart();
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (isReady && !user) {
      router.replace('/login');
    }
  }, [isReady, user, router]);

  useEffect(() => {
    if (user) {
      setOrderCount(getOrdersForEmail(user.email).length);
    }
  }, [user]);

  const handleSignOut = () => {
    logout();
    router.push('/login');
  };

  if (!isReady || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center text-gray-500">
          {tAuth('loading')}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-gray-500" aria-label={t('breadcrumbNav')}>
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-600">
                {tHeader('home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-gray-800">{t('breadcrumb')}</li>
          </ol>
        </nav>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
          <AccountSidebar user={user} activeHref="/account" onSignOut={handleSignOut} />

          <div className="min-w-0 flex-1 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {t('welcome', { name: user.name })}
              </h1>
              <p className="mt-2 text-gray-600">{t('subtitle')}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">{t('statOrders')}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{orderCount}</p>
                <Link
                  href="/order-history"
                  className="mt-2 inline-block text-sm font-medium text-green-600 hover:text-green-700"
                >
                  {t('viewOrders')} →
                </Link>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">{t('statWishlist')}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{wishlistCount}</p>
                <Link
                  href="/wishlist"
                  className="mt-2 inline-block text-sm font-medium text-green-600 hover:text-green-700"
                >
                  {t('viewWishlist')} →
                </Link>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">{t('statCart')}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{itemCount}</p>
                <Link
                  href="/cart"
                  className="mt-2 inline-block text-sm font-medium text-green-600 hover:text-green-700"
                >
                  {t('viewCart')} →
                </Link>
              </div>
            </div>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <User className="h-5 w-5 text-green-600" aria-hidden />
                {t('profileTitle')}
              </h2>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {tAuth('fullName')}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {tAuth('email')}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900">{user.email}</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-gray-500">{tAuth('demoHint')}</p>
              <Link
                href="/account/settings"
                className="mt-4 inline-flex text-sm font-medium text-green-600 hover:text-green-700"
              >
                {t('changePassword')} →
              </Link>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-bold text-gray-900">{t('quickActionsTitle')}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {QUICK_LINKS.map(({ href, actionKey, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    {t(actionKey)}
                  </Link>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                <div className="relative min-h-[160px] bg-gray-50 sm:min-h-[200px]">
                  <Image
                    src="/images/products/mock/organic_carrots.jpeg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 280px"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-gray-900">{t('promoTitle')}</h2>
                  <p className="mt-2 text-sm text-gray-600">{t('promoDesc')}</p>
                  <Link
                    href="/category/all"
                    className="mt-4 inline-flex w-fit rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                  >
                    {t('promoCta')}
                  </Link>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-green-600" aria-hidden />
                <div>
                  <h2 className="font-bold text-gray-900">{t('addressTitle')}</h2>
                  <p className="mt-1 text-sm text-gray-600">{t('addressDesc')}</p>
                  <Link
                    href="/contact"
                    className="mt-3 inline-flex text-sm font-medium text-green-600 hover:text-green-700"
                  >
                    {t('addressCta')} →
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
