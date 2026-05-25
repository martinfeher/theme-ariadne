'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import Header from '@/app/components/Header';

type StatusPageShellProps = {
  children: React.ReactNode;
  /** Minimal layout: logo only, no full site header */
  minimal?: boolean;
};

export default function StatusPageShell({ children, minimal = false }: StatusPageShellProps) {
  if (minimal) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="container mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="WebAriadne"
              width={120}
              height={40}
              className="h-9 w-auto"
            />
            <span className="sr-only">WebAriadne</span>
          </Link>
        </header>
        <main className="flex flex-1 items-center justify-center px-4 pb-16">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12 lg:py-16">
        {children}
      </main>
    </div>
  );
}

type StatusHeroProps = {
  code: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export function StatusHero({ code, title, description, icon, children }: StatusHeroProps) {
  return (
    <div className="mx-auto w-full max-w-xl text-center">
      {icon ?? (
        <p
          className="select-none text-[7rem] font-black leading-none tracking-tighter text-green-500/15 sm:text-[9rem]"
          aria-hidden
        >
          {code}
        </p>
      )}
      <h1 className="-mt-4 text-2xl font-bold text-gray-900 sm:-mt-6 sm:text-3xl">{title}</h1>
      <p className="mt-3 text-sm text-gray-600 sm:text-base">{description}</p>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}

type StatusActionsProps = {
  primaryHref?: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  primaryType?: 'button' | 'link';
};

export function StatusActions({
  primaryHref = '/',
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  onPrimaryClick,
  primaryType = 'link',
}: StatusActionsProps) {
  const primaryClass =
    'inline-flex items-center justify-center rounded-lg bg-green-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 cursor-pointer';

  const secondaryClass =
    'inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-700';

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      {primaryType === 'button' ? (
        <button type="button" onClick={onPrimaryClick} className={primaryClass}>
          {primaryLabel}
        </button>
      ) : (
        <Link href={primaryHref} className={primaryClass}>
          {primaryLabel}
        </Link>
      )}
      {secondaryHref && secondaryLabel && (
        <Link href={secondaryHref} className={secondaryClass}>
          {secondaryLabel}
        </Link>
      )}
    </div>
  );
}

const inputClass =
  'w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20';

export function NotifyForm({
  emailLabel,
  emailPlaceholder,
  submitLabel,
  sendingLabel,
  successMessage,
}: {
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
}) {
  const [email, setEmail] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    setSubmitted(true);
    setEmail('');
  };

  if (submitted) {
    return (
      <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
        {successMessage}
      </p>
    );
  }

  return (
    <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <label htmlFor="notify-email" className="sr-only">
        {emailLabel}
      </label>
      <input
        id="notify-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={emailPlaceholder}
        className={inputClass}
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="shrink-0 rounded-lg bg-green-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:opacity-60 cursor-pointer"
      >
        {submitting ? sendingLabel : submitLabel}
      </button>
    </form>
  );
}
