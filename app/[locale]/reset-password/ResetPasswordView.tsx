'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import AuthPageLayout from '@/app/components/auth/AuthPageLayout';
import AuthField from '@/app/components/auth/AuthField';
import { useAuth } from '@/app/context/AuthContext';

export default function ResetPasswordView() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updatePassword } = useAuth();

  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError(t('passwordTooShort'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    setSubmitting(true);
    const result = await updatePassword(email, password);
    setSubmitting(false);

    if (result === 'notFound') {
      setError(t('accountNotFound'));
      return;
    }

    setDone(true);
    setTimeout(() => router.push('/login'), 2000);
  };

  return (
    <AuthPageLayout
      title={t('resetTitle')}
      subtitle={t('resetSubtitle')}
      breadcrumbLabel={t('resetBreadcrumb')}
    >
      {done ? (
        <div
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
          role="status"
        >
          {t('resetSuccess')}
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <AuthField
            id="reset-email"
            label={t('email')}
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
          />
          <AuthField
            id="reset-password"
            label={t('newPassword')}
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            placeholder={t('passwordHint')}
          />
          <AuthField
            id="reset-confirm"
            label={t('confirmPassword')}
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            autoComplete="new-password"
            error={error ?? undefined}
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-green-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {submitting ? t('updatingPassword') : t('updatePassword')}
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
