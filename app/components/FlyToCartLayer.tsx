'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export type FlyToCartItem = {
  id: number;
  image: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const THUMB_SIZE = 56;
const DURATION_MS = 1100;

function FlyingThumbnail({
  item,
  onComplete,
}: {
  item: FlyToCartItem;
  onComplete: (id: number) => void;
}) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimating(true));
    const timer = window.setTimeout(() => onComplete(item.id), DURATION_MS);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [item.id, onComplete]);

  const deltaX = item.endX - item.startX - THUMB_SIZE / 2;
  const deltaY = item.endY - item.startY - THUMB_SIZE / 2;

  return (
    <div
      className="pointer-events-none fixed z-[300] overflow-hidden rounded-lg shadow-lg"
      // className="pointer-events-none fixed z-[300] overflow-hidden rounded-lg border-2 border-white shadow-lg"
      style={{
        left: item.startX,
        top: item.startY,
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        transition: animating
          ? `transform ${DURATION_MS}ms cubic-bezier(0.45, 0, 0.55, 1), opacity ${DURATION_MS}ms ease`
          : 'none',
        transform: animating
          ? `translate(${deltaX}px, ${deltaY}px) scale(0.35)`
          : 'translate(0, 0) scale(1)',
        opacity: animating ? 0.35 : 1,
      }}
      aria-hidden
    >
      <Image src={item.image} alt="" fill className="object-cover" sizes="56px" />
    </div>
  );
}

type FlyToCartLayerProps = {
  items: FlyToCartItem[];
  onComplete: (id: number) => void;
};

export default function FlyToCartLayer({ items, onComplete }: FlyToCartLayerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) return null;

  return createPortal(
    <>
      {items.map((item) => (
        <FlyingThumbnail key={item.id} item={item} onComplete={onComplete} />
      ))}
    </>,
    document.body
  );
}

export function getCartSideBlockTarget(): { endX: number; endY: number } | null {
  const cartEl = document.getElementById('cart-side-block');
  if (!cartEl) return null;
  const rect = cartEl.getBoundingClientRect();
  return {
    endX: rect.left + rect.width / 2,
    endY: rect.top + rect.height / 2,
  };
}
