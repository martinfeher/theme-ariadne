'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import AuthPageLayout from '@/app/components/auth/AuthPageLayout';
import AuthField from '@/app/components/auth/AuthField';
import { useAuth } from '@/app/context/AuthContext';

export default function ForgotPasswordView() {
  const t = useTranslations('Auth');
  const { sendPasswordReset } = useAuth();

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await sendPasswordReset(email);
    setSubmitting(false);
    setSent(true);
  };

  return (
    <AuthPageLayout
      title={t('forgotTitle')}
      subtitle={t('forgotSubtitle')}
      breadcrumbLabel={t('forgotBreadcrumb')}
    >
      {sent ? (
        <div className="space-y-6">
          <div
            className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
            role="status"
          >
            {t('resetEmailSent', { email })}
          </div>
          <p className="text-sm text-gray-600">{t('resetEmailHint')}</p>
          <Link
            href={`/reset-password?email=${encodeURIComponent(email.trim().toLowerCase())}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-green-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            {t('continueToReset')}
          </Link>
          <Link
            href="/login"
            className="block text-center text-sm font-medium text-green-600 hover:text-green-700"
          >
            {t('backToLogin')}
          </Link>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <AuthField
            id="forgot-email"
            label={t('email')}
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-green-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {submitting ? t('sending') : t('sendResetLink')}
          </button>

          <Link
            href="/login"
            className="block text-center text-sm font-medium text-green-600 hover:text-green-700"
          >
            {t('backToLogin')}
          </Link>
        </form>
      )}
    </AuthPageLayout>
  );
}
