'use client';

import { useTranslations } from 'next-intl';
import { getVendorDescription, getVendorTagline } from '@/lib/vendor-i18n';

export function useVendorI18n() {
  const t = useTranslations('Vendors');

  return {
    getVendorTagline: (slug: string) => getVendorTagline(slug, t),
    getVendorDescription: (slug: string) => getVendorDescription(slug, t),
  };
}
