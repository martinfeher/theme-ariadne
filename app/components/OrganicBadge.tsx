'use client';

import { Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';

type OrganicBadgeProps = {
  className?: string;
  size?: 'xs' | 'sm' | 'md';
};

export default function OrganicBadge({ className = '', size = 'md' }: OrganicBadgeProps) {
  const t = useTranslations('ProductCard');
  const sizeClass =
    size === 'xs'
      ? 'gap-0.5 px-1.5 py-0.5 text-[12px] leading-tight'
      : size === 'sm'
        ? 'gap-1 px-2 py-0.5 text-[11px] leading-tight'
        : 'gap-1.5 px-3 py-1 text-sm';
  const iconClass =
    size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5';

  return (
    <span
      className={`inline-flex items-center rounded-full bg-green-500/70 backdrop-blur-[7px] font-medium text-white ${sizeClass} ${className}`}
 
 
    >
      <Leaf className={`${iconClass} shrink-0 stroke-[2.25]`} aria-hidden />
      {t('organic')}
    </span>
  );
}
