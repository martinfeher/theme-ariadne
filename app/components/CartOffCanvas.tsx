'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { Link } from '@/i18n/navigation';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartOffCanvas: React.FC = () => {
  const t = useTranslations('Cart');
  const tHeader = useTranslations('Header');
  const formatPrice = useFormatCurrency();
  const {
    lines,
    isOpen,
    closeCart,
    subtotal,
    removeLine,
    removeOne,
    addItem,
  } = useCart();

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    },
    [closeCart]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleEscape);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = prev;
    };
  }, [isOpen, handleEscape]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[250] bg-black/40 transition-opacity duration-300 lg:z-[250] ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
        onClick={closeCart}
      />

      <aside
        className={`fixed top-0 right-0 z-[260] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:z-[260] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
        aria-label={tHeader('openCart')}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{t('yourCart')}</h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
            aria-label={t('close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {lines.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-12">{t('empty')}</p>
          ) : (
            <ul className="space-y-4">
              {lines.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-3 border-b border-gray-100 pb-4 last:border-0"
                >
                  <Link
                    href={`/product/${product.id}`}
                    onClick={closeCart}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-50"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${product.id}`}
                      onClick={closeCart}
                      className="font-medium text-gray-900 line-clamp-2 hover:text-green-600"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-green-600 font-semibold">
                      {formatPrice(product.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-lg border border-gray-200">
                        <button
                          type="button"
                          className="p-1.5 text-gray-600 hover:bg-gray-50 cursor-pointer"
                          aria-label={t('decreaseQty')}
                          onClick={() =>
                            quantity <= 1
                              ? removeLine(product.id)
                              : removeOne(product.id)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-medium">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          className="p-1.5 text-gray-600 hover:bg-gray-50 cursor-pointer"
                          aria-label={t('increaseQty')}
                          onClick={() => addItem(product, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(product.id)}
                        className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        {t('removeLine')}
                      </button>
                    </div>
                  </div>
                  <div className="shrink-0 text-right text-sm font-semibold text-gray-900">
                    {formatPrice(product.price * quantity)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50 px-4 py-4 space-y-4">
            <div className="flex justify-between text-base font-semibold text-gray-900">
              <span>{t('subtotal')}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex-1 rounded-lg border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
              >
                {t('viewCart')}
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex-1 rounded-lg bg-green-500 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-green-600"
              >
                {t('checkout')}
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartOffCanvas;
