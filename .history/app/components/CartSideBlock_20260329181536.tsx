'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartSideBlock: React.FC = () => {
  const { itemCount, subtotal, openCart } = useCart();

  const itemsLabel = itemCount === 1 ? '1 Item' : `${itemCount} Items`;
  const formattedTotal = subtotal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Shopping cart, ${itemsLabel}, total ${formattedTotal}`}
      className="fixed right-0 top-1/2 z-[220] flex w-[4.75rem] -translate-y-1/2 flex-col overflow-hidden rounded-l-xl border border-r-0 border-gray-200 bg-white text-center shadow-md transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 cu"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-2 py-4">
        <ShoppingBag
          className="h-7 w-7 text-green-500"
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="text-xs font-medium leading-tight text-gray-700">
          {itemsLabel}
        </span>
      </div>
      <div className="bg-green-500 px-2 py-3">
        <span className="block text-sm font-bold leading-tight text-white tabular-nums">
          {formattedTotal}
        </span>
      </div>
    </button>
  );
};

export default CartSideBlock;
