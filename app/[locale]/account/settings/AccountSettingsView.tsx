'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { Bell, Lock, Settings, User } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import AccountSidebar from '@/app/components/AccountSidebar';
import AuthField from '@/app/components/auth/AuthField';
import { useAuth } from '@/app/context/AuthContext';
import {
  getAccountPreferences,
  saveAccountPreferences,
  type AccountPreferences,
} from '@/lib/account-preferences';

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function AccountSettingsView() {
  const t = useTranslations('AccountSettings');
  const tAuth = useTranslations('Auth');
  const tHeader = useTranslations('Header');
  const router = useRouter();
  const { user, isReady, logout, updateProfile, changePassword } = useAuth();

  const [name, setName] = useState('');
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSubmitting, setProfileSubmitting] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);

  const [preferences, setPreferences] = useState<AccountPreferences>({
    marketingEmails: true,
    orderUpdates: true,
  });
  const [prefsMessage, setPrefsMessage] = useState<string | null>(null);
  const [prefsSubmitting, setPrefsSubmitting] = useState(false);

  useEffect(() => {
    if (isReady && !user) {
      router.replace('/login');
    }
  }, [isReady, user, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPreferences(getAccountPreferences(user.email));
    }
  }, [user]);

  const handleSignOut = () => {
    logout();
    router.push('/login');
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileMessage(null);

    const trimmed = name.trim();
    if (!trimmed) {
      setProfileError(t('nameRequired'));
      return;
    }

    setProfileSubmitting(true);
    const result = await updateProfile(trimmed);
    setProfileSubmitting(false);

    if (result === 'notFound') {
      setProfileError(tAuth('accountNotFound'));
      return;
    }

    setProfileMessage(t('profileSaved'));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordMessage(null);

    if (newPassword.length < 8) {
      setPasswordError(tAuth('passwordTooShort'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(tAuth('passwordMismatch'));
      return;
    }

    setPasswordSubmitting(true);
    const result = await changePassword(currentPassword, newPassword);
    setPasswordSubmitting(false);

    if (result === 'invalid') {
      setPasswordError(t('currentPasswordInvalid'));
      return;
    }
    if (result === 'notFound') {
      setPasswordError(tAuth('accountNotFound'));
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordMessage(t('passwordSaved'));
  };

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setPrefsSubmitting(true);
    saveAccountPreferences(user.email, preferences);
    setPrefsSubmitting(false);
    setPrefsMessage(t('preferencesSaved'));
  };

  if (!isReady || !user) {
    return (
      <PageShell>
        <main className="container mx-auto px-4 py-16 text-center text-gray-500">
          {tAuth('loading')}
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-gray-500" aria-label={t('breadcrumbNav')}>
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-600">
                {tHeader('home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/account" className="hover:text-green-600">
                {t('accountBreadcrumb')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-gray-800">{t('breadcrumb')}</li>
          </ol>
        </nav>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
          <AccountSidebar
            user={user}
            activeHref="/account/settings"
            onSignOut={handleSignOut}
          />

          <div className="min-w-0 flex-1 space-y-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <Settings className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>
                <p className="mt-2 text-gray-600">{t('subtitle')}</p>
              </div>
            </div>

            <SettingsSection
              icon={User}
              title={t('profileTitle')}
              description={t('profileDesc')}
            >
              <form className="space-y-4" onSubmit={handleProfileSubmit} noValidate>
                <AuthField
                  id="settings-name"
                  label={tAuth('fullName')}
                  value={name}
                  onChange={setName}
                  autoComplete="name"
                  placeholder={tAuth('fullNamePlaceholder')}
                  error={profileError ?? undefined}
                />
                <div>
                  <label htmlFor="settings-email" className="mb-1.5 block text-sm font-medium text-gray-700">
                    {tAuth('email')}
                  </label>
                  <input
                    id="settings-email"
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">{t('emailReadonlyHint')}</p>
                </div>
                {profileMessage && (
                  <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800" role="status">
                    {profileMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={profileSubmitting}
                  className="rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  {profileSubmitting ? t('saving') : t('saveProfile')}
                </button>
              </form>
            </SettingsSection>

            <SettingsSection
              icon={Lock}
              title={t('passwordTitle')}
              description={t('passwordDesc')}
            >
              <form className="space-y-4" onSubmit={handlePasswordSubmit} noValidate>
                <AuthField
                  id="settings-current-password"
                  label={t('currentPassword')}
                  type="password"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  autoComplete="current-password"
                />
                <AuthField
                  id="settings-new-password"
                  label={tAuth('newPassword')}
                  type="password"
                  value={newPassword}
                  onChange={setNewPassword}
                  autoComplete="new-password"
                  placeholder={tAuth('passwordHint')}
                />
                <AuthField
                  id="settings-confirm-password"
                  label={tAuth('confirmPassword')}
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  autoComplete="new-password"
                  error={passwordError ?? undefined}
                />
                {passwordMessage && (
                  <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800" role="status">
                    {passwordMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={passwordSubmitting}
                  className="rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  {passwordSubmitting ? tAuth('updatingPassword') : t('updatePassword')}
                </button>
              </form>
            </SettingsSection>

            <SettingsSection
              icon={Bell}
              title={t('preferencesTitle')}
              description={t('preferencesDesc')}
            >
              <form className="space-y-4" onSubmit={handlePreferencesSubmit} noValidate>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={preferences.orderUpdates}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, orderUpdates: e.target.checked }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span>
                    <span className="block text-sm font-medium text-gray-900">{t('orderUpdatesLabel')}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">{t('orderUpdatesHint')}</span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={preferences.marketingEmails}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, marketingEmails: e.target.checked }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span>
                    <span className="block text-sm font-medium text-gray-900">{t('marketingLabel')}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">{t('marketingHint')}</span>
                  </span>
                </label>
                {prefsMessage && (
                  <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800" role="status">
                    {prefsMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={prefsSubmitting}
                  className="rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  {prefsSubmitting ? t('saving') : t('savePreferences')}
                </button>
              </form>
            </SettingsSection>

            <p className="text-xs text-gray-500">{tAuth('demoHint')}</p>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
