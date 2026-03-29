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

export const MAX_COMPARE_PRODUCTS = 4;

const STORAGE_KEY = 'nest-compare';

interface CompareContextValue {
  items: Product[];
  count: number;
  isInCompare: (productId: number) => boolean;
  canAdd: (productId: number) => boolean;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error('useCompare must be used within a CompareProvider');
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
    ).slice(0, MAX_COMPARE_PRODUCTS);
  } catch {
    return [];
  }
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
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

  const isInCompare = useCallback(
    (productId: number) => items.some((p) => p.id === productId),
    [items]
  );

  const canAdd = useCallback(
    (productId: number) =>
      isInCompare(productId) || items.length < MAX_COMPARE_PRODUCTS,
    [items.length, isInCompare]
  );

  const addToCompare = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      if (prev.length >= MAX_COMPARE_PRODUCTS) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromCompare = useCallback((productId: number) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const toggleCompare = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= MAX_COMPARE_PRODUCTS) return prev;
      return [...prev, product];
    });
  }, []);

  const clearCompare = useCallback(() => setItems([]), []);

  const count = items.length;

  const value = useMemo<CompareContextValue>(
    () => ({
      items,
      count,
      isInCompare,
      canAdd,
      addToCompare,
      removeFromCompare,
      toggleCompare,
      clearCompare,
    }),
    [
      items,
      count,
      isInCompare,
      canAdd,
      addToCompare,
      removeFromCompare,
      toggleCompare,
      clearCompare,
    ]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}
