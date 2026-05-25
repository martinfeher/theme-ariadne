'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import AuthPageLayout from '@/app/components/auth/AuthPageLayout';
import AuthField from '@/app/components/auth/AuthField';
import SocialLoginButtons from '@/app/components/auth/SocialLoginButtons';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginView() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result === 'invalid') {
      setError(t('invalidCredentials'));
      return;
    }
    router.push('/account');
  };

  return (
    <AuthPageLayout
      title={t('loginTitle')}
      subtitle={t('loginSubtitle')}
      breadcrumbLabel={t('loginBreadcrumb')}
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AuthField
          id="login-email"
          label={t('email')}
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
        />
        <AuthField
          id="login-password"
          label={t('password')}
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          error={error ?? undefined}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            {t('rememberMe')}
          </label>
          <Link href="/forgot-password" className="font-medium text-green-600 hover:text-green-700">
            {t('forgotPassword')}
          </Link>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-green-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {submitting ? t('signingIn') : t('signIn')}
        </button>
      </form>

      <div className="mt-8">
        <SocialLoginButtons disabled={submitting} />
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        {t('noAccount')}{' '}
        <Link href="/register" className="font-semibold text-green-600 hover:text-green-700">
          {t('createAccount')}
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-gray-400">{t('demoHint')}</p>
    </AuthPageLayout>
  );
}
