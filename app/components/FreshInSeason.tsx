'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';
import { fetchProducts } from '@/lib/fetch-products';
import { getFreshInSeasonProducts } from '@/lib/fresh-in-season';

const SCROLL_ARROW_BASE =
  'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white bg-black/40 text-white shadow-md backdrop-blur-[1px] transition-opacity duration-200 hover:bg-black/55 disabled:pointer-events-none disabled:opacity-0 sm:h-11 sm:w-11';

const SCROLL_ARROW_VISIBLE =
  'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100';

const FreshInSeason: React.FC = () => {
  const t = useTranslations('FreshInSeason');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoadState('loading');
    fetchProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data.products);
          setLoadState('ok');
        }
      })
      .catch(() => {
        if (!cancelled) setLoadState('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const seasonalProducts = useMemo(() => getFreshInSeasonProducts(products), [products]);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons, seasonalProducts.length, loadState]);

  const scrollRow = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  if (loadState === 'ok' && seasonalProducts.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-white py-6 lg:py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-2 sm:mb-6">
          <h2 className="flex shrink-0 items-center gap-2 text-2xl font-bold tracking-tight text-[#253D4E] sm:text-3xl lg:text-[32px]">
            <Leaf className="h-6 w-6 text-[#17A34B]" aria-hidden />
            {t('title')}
          </h2>
          <p className="mt-1 max-w-md text-sm text-gray-500">{t('subtitle')}</p>
        </div>
        <hr className="mb-8 border-gray-100" />

        {loadState === 'loading' && (
          <p className="py-12 text-center text-gray-500">{t('loading')}</p>
        )}
        {loadState === 'error' && (
          <p className="py-12 text-center text-red-600">{t('error')}</p>
        )}
        {loadState === 'ok' && seasonalProducts.length > 0 && (
          <div className="group relative">
            <button
              type="button"
              onClick={() => scrollRow(-1)}
              disabled={!canScrollLeft}
              aria-label={t('scrollPrev')}
              className={`left-1 sm:left-2 ${SCROLL_ARROW_BASE} ${SCROLL_ARROW_VISIBLE}`}
            >
              <ChevronLeft className="h-5 w-5 stroke-[2.5]" aria-hidden />
            </button>

            <div
              ref={scrollRef}
              className="overflow-x-auto scroll-smooth px-1 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex gap-4">
                {seasonalProducts.map((product) => (
                  <div
                    key={product.id}
                    className="w-[168px] shrink-0 snap-start sm:w-[200px] md:w-[220px] lg:w-[232px] xl:w-[240px]"
                  >
                    <ProductCard
                      product={product}
                      allProducts={products}
                      size="medium"
                      flyToCartOnAdd
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollRow(1)}
              disabled={!canScrollRight}
              aria-label={t('scrollNext')}
              className={`right-1 sm:right-2 ${SCROLL_ARROW_BASE} ${SCROLL_ARROW_VISIBLE}`}
            >
              <ChevronRight className="h-5 w-5 stroke-[2.5]" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FreshInSeason;
