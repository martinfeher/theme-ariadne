'use client';

import { getDiscountPercent } from '@/lib/product-discount';

type DiscountBadgeProps = {
  percent: number;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
};

export default function DiscountBadge({
  percent,
  className = '',
  size = 'md',
}: DiscountBadgeProps) {
  if (percent <= 0) return null;

  const sizeClass =
    size === 'xs'
      ? 'min-w-[2rem] px-1.5 py-[3px] text-[12px]'
      : size === 'sm'
        ? 'min-w-[2rem] px-1.5 py-0.5 text-[11px]'
        : 'min-w-[2.5rem] px-2.5 py-[5px] text-xs';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#E8B923] font-bold leading-none text-white shadow-sm ${sizeClass} ${className}`}
    >
      {percent}%
    </span>
  );
}

export { getDiscountPercent };
