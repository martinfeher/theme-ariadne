'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

type AuthPageLayoutProps = {
  title: string;
  subtitle?: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
};

export default function AuthPageLayout({
  title,
  subtitle,
  breadcrumbLabel,
  children,
}: AuthPageLayoutProps) {
  const tHeader = useTranslations('Header');

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8 lg:py-12">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            {tHeader('home')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{breadcrumbLabel}</span>
        </nav>

        <div className="mx-auto w-full max-w-xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600 sm:text-base">{subtitle}</p>
            )}
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
