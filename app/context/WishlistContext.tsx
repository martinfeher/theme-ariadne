'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Product } from '../types/product';

const STORAGE_KEY = 'nest-wishlist';

interface WishlistContextValue {
  items: Product[];
  count: number;
  isInWishlist: (productId: number) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return ctx;
}

function parseStored(raw: string | null): Product[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (p): p is Product =>
        typeof p === 'object' &&
        p !== null &&
        typeof (p as Product).id === 'number' &&
        typeof (p as Product).name === 'string' &&
        typeof (p as Product).price === 'number'
    );
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(parseStored(localStorage.getItem(STORAGE_KEY)));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const isInWishlist = useCallback(
    (productId: number) => items.some((p) => p.id === productId),
    [items]
  );

  const addToWishlist = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const count = items.length;

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      count,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
    }),
    [items, count, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}
