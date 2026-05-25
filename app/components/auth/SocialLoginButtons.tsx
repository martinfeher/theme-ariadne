'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type SocialLoginButtonsProps = {
  disabled?: boolean;
};

export default function SocialLoginButtons({ disabled }: SocialLoginButtonsProps) {
  const t = useTranslations('Auth');

  const providers = [
    {
      id: 'google',
      label: t('continueGoogle'),
      className: 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
      icon: '/images/theme/icons/logo-google.svg',
    },
    {
      id: 'facebook',
      label: t('continueFacebook'),
      className: 'bg-[#1877F2] text-white hover:bg-[#166fe0]',
      icon: '/images/theme/icons/logo-facebook.svg',
    },
    {
      id: 'apple',
      label: t('continueApple'),
      className: 'bg-black text-white hover:bg-gray-900',
      icon: '/images/theme/icons/logo-apple.svg',
    },
  ] as const;

  return (
    <div className="space-y-3">
      <p className="relative text-center text-sm text-gray-500">
        <span className="relative z-10 bg-white px-3">{t('orContinueWith')}</span>
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-200" aria-hidden />
      </p>
      {providers.map((provider) => (
        <button
          key={provider.id}
          type="button"
          disabled={disabled}
          className={`flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${provider.className}`}
        >
          <Image src={provider.icon} alt="" width={22} height={22} className="shrink-0" />
          {provider.label}
        </button>
      ))}
    </div>
  );
}
