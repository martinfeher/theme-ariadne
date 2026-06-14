'use client';

import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

type PageShellProps = {
  children: React.ReactNode;
};

/** Standard storefront chrome: header, page content, global footer. */
export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}
