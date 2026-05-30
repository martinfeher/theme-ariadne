'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Heart, LogOut, Package, Settings, ShoppingBag, Ticket } from 'lucide-react';
import type { AuthSession } from '@/lib/auth-demo';

const NAV_LINKS = [
  { href: '/order-history', labelKey: 'navOrders', icon: Package },
  { href: '/wishlist', labelKey: 'navWishlist', icon: Heart },
  { href: '/vouchers', labelKey: 'navVouchers', icon: Ticket },
  { href: '/cart', labelKey: 'navCart', icon: ShoppingBag },
  { href: '/account/settings', labelKey: 'navSettings', icon: Settings },
] as const;

type AccountSidebarProps = {
  user: AuthSession;
  activeHref: string;
  onSignOut: () => void;
};

export default function AccountSidebar({ user, activeHref, onSignOut }: AccountSidebarProps) {
  const t = useTranslations('Account');
  const tHeader = useTranslations('Header');

  const initials = user.name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-gray-900">{user.name}</p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
        <nav className="mt-5 space-y-1" aria-label={t('sidebarNav')}>
          {activeHref === '/account' ? (
            <span className="block rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
              {t('navOverview')}
            </span>
          ) : (
            <Link
              href="/account"
              className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-green-700"
            >
              {t('navOverview')}
            </Link>
          )}
          {NAV_LINKS.map(({ href, labelKey, icon: Icon }) =>
            activeHref === href ? (
              <span
                key={href}
                className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {t(labelKey)}
              </span>
            ) : (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-green-700"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {t(labelKey)}
              </Link>
            )
          )}
        </nav>
        <button
          type="button"
          onClick={onSignOut}
          className="mt-4 flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          {tHeader('signOut')}
        </button>
      </div>
    </aside>
  );
}
