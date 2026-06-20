'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { Product } from '../types/product';
import CartOffCanvas from '../components/CartOffCanvas';
import CartSideBlock from '../components/CartSideBlock';
import FlyToCartLayer, { getCartSideBlockTarget, type FlyToCartItem } from '../components/FlyToCartLayer';

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  flyToCart: (image: string, fromRect: DOMRect) => void;
  removeOne: (productId: number) => void;
  removeLine: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  getQuantity: (productId: number) => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [flyItems, setFlyItems] = useState<FlyToCartItem[]>([]);
  const flyIdRef = React.useRef(0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((o) => !o), []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (product.inStock === false) return;
    const q = Math.max(1, quantity);
    setLines((prev) => {
      const i = prev.findIndex((l) => l.product.id === product.id);
      if (i === -1) return [...prev, { product, quantity: q }];
      const next = [...prev];
      next[i] = {
        ...next[i],
        quantity: next[i].quantity + q,
      };
      return next;
    });
  }, []);

  const flyToCart = useCallback((image: string, fromRect: DOMRect) => {
    const target = getCartSideBlockTarget();
    if (!target) return;
    flyIdRef.current += 1;
    const id = flyIdRef.current;
    setFlyItems((prev) => [
      ...prev,
      {
        id,
        image,
        startX: fromRect.left,
        startY: fromRect.top,
        endX: target.endX,
        endY: target.endY,
      },
    ]);
  }, []);

  const completeFlyToCart = useCallback((id: number) => {
    setFlyItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const removeOne = useCallback((productId: number) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.product.id === productId);
      if (i === -1) return prev;
      const line = prev[i];
      if (line.quantity <= 1) {
        return prev.filter((l) => l.product.id !== productId);
      }
      const next = [...prev];
      next[i] = { ...line, quantity: line.quantity - 1 };
      return next;
    });
  }, []);

  const removeLine = useCallback((productId: number) => {
    setLines((prev) => prev.filter((l) => l.product.id !== productId));
  }, []);

  const setQuantity = useCallback((productId: number, quantity: number) => {
    const q = Math.floor(quantity);
    if (q < 1) {
      setLines((prev) => prev.filter((l) => l.product.id !== productId));
      return;
    }
    setLines((prev) => {
      const i = prev.findIndex((l) => l.product.id === productId);
      if (i === -1) return prev;
      const next = [...prev];
      next[i] = { ...next[i], quantity: q };
      return next;
    });
  }, []);

  const getQuantity = useCallback(
    (productId: number) =>
      lines.find((l) => l.product.id === productId)?.quantity ?? 0,
    [lines]
  );

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [lines]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      flyToCart,
      removeOne,
      removeLine,
      setQuantity,
      getQuantity,
      clearCart,
    }),
    [
      lines,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      flyToCart,
      removeOne,
      removeLine,
      setQuantity,
      getQuantity,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartSideBlock />
      <CartOffCanvas />
      <FlyToCartLayer items={flyItems} onComplete={completeFlyToCart} />
    </CartContext.Provider>
  );
}
