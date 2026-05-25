'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import AuthPageLayout from '@/app/components/auth/AuthPageLayout';
import AuthField from '@/app/components/auth/AuthField';
import SocialLoginButtons from '@/app/components/auth/SocialLoginButtons';
import { useAuth } from '@/app/context/AuthContext';

export default function RegisterView() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
    if (!acceptTerms) {
      setError(t('acceptTermsRequired'));
      return;
    }

    setSubmitting(true);
    const result = await register(name, email, password);
    setSubmitting(false);

    if (result === 'emailTaken') {
      setError(t('emailTaken'));
      return;
    }
    router.push('/account');
  };

  return (
    <AuthPageLayout
      title={t('registerTitle')}
      subtitle={t('registerSubtitle')}
      breadcrumbLabel={t('registerBreadcrumb')}
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AuthField
          id="register-name"
          label={t('fullName')}
          value={name}
          onChange={setName}
          autoComplete="name"
          placeholder={t('fullNamePlaceholder')}
        />
        <AuthField
          id="register-email"
          label={t('email')}
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
        />
        <AuthField
          id="register-password"
          label={t('password')}
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          placeholder={t('passwordHint')}
        />
        <AuthField
          id="register-confirm"
          label={t('confirmPassword')}
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          error={error ?? undefined}
        />

        <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span>
            {t('acceptTerms')}{' '}
            <Link href="/contact" className="text-green-600 hover:text-green-700">
              {t('termsLink')}
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-green-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {submitting ? t('creatingAccount') : t('signUp')}
        </button>
      </form>

      <div className="mt-8">
        <SocialLoginButtons disabled={submitting} />
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        {t('haveAccount')}{' '}
        <Link href="/login" className="font-semibold text-green-600 hover:text-green-700">
          {t('signIn')}
        </Link>
      </p>
    </AuthPageLayout>
  );
}
