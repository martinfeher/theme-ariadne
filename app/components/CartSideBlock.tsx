'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { useCart } from '../context/CartContext';

const CartSideBlock: React.FC = () => {
  const { itemCount, subtotal, openCart } = useCart();
  const t = useTranslations('CartSide');
  const formatPrice = useFormatCurrency();

  const itemsLabel =
    itemCount === 1 ? t('itemsOne') : t('itemsMany', { count: itemCount });

  const formattedTotal = formatPrice(subtotal);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={t('cartAria', { itemsLabel, total: formattedTotal })}
      className="fixed right-0 top-1/2 z-[220] flex min-w-[83px] w-19 -translate-y-1/2 flex-col overflow-hidden rounded-l-xl border border-b-0 border-r-0 border-gray-200 bg-white text-center shadow-md transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 cursor-pointer"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-2 py-4" id="cart-side-block">
        <ShoppingBag
          className="h-7 w-7 text-green-500"
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="text-xs font-medium leading-tight text-gray-700">
          {itemsLabel}
        </span>
      </div>
      <div className="rounded-bl-xl bg-green-500 px-[9px] py-3">
        <span className="block text-sm font-bold leading-tight text-white ">
          {formattedTotal}
        </span>
      </div>
    </button>
  );
};

export default CartSideBlock;
