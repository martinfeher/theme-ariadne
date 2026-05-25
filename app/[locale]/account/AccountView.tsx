'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import Header from '@/app/components/Header';
import { useAuth } from '@/app/context/AuthContext';

export default function AccountView() {
  const t = useTranslations('Auth');
  const tHeader = useTranslations('Header');
  const router = useRouter();
  const { user, isReady, logout } = useAuth();

  useEffect(() => {
    if (isReady && !user) {
      router.replace('/login');
    }
  }, [isReady, user, router]);

  if (!isReady || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center text-gray-500">
          {t('loading')}
        </main>
      </div>
    );
  }

  const links = [
    { href: '/order-tracking', label: tHeader('orderTracking') },
    { href: '/wishlist', label: tHeader('myWishlist') },
    { href: '/vouchers', label: tHeader('myVoucher') },
    { href: '/settings', label: tHeader('settings') },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-8 lg:py-12">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            {tHeader('home')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{t('accountBreadcrumb')}</span>
        </nav>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-2xl font-bold text-gray-900">{t('accountWelcome', { name: user.name })}</h1>
          <p className="mt-2 text-sm text-gray-600">{user.email}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-700"
              >
                {label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="mt-8 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
          >
            {tHeader('signOut')}
          </button>
        </div>
      </main>
    </div>
  );
}
