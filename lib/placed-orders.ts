import type { MockOrder, OrderLine } from '@/lib/mock-orders';

const STORAGE_KEY = 'ariadne-placed-orders';

export type PlacedOrderInput = {
  id: string;
  email: string;
  lines: OrderLine[];
  shipping: number;
};

export function savePlacedOrder(input: PlacedOrderInput) {
  if (typeof window === 'undefined') return;
  const order: MockOrder = {
    id: input.id,
    email: input.email.toLowerCase(),
    placedAt: new Date().toISOString(),
    status: 'processing',
    lines: input.lines,
    shipping: input.shipping,
    estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10),
  };
  try {
    const prev = getPlacedOrders();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([order, ...prev.filter((o) => o.id !== order.id)].slice(0, 10))
    );
  } catch {
    /* ignore quota errors in demo */
  }
}

export function getPlacedOrders(): MockOrder[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MockOrder[]) : [];
  } catch {
    return [];
  }
}

export function findPlacedOrder(orderId: string, email: string): MockOrder | undefined {
  const id = orderId.trim().toUpperCase();
  const normalizedEmail = email.trim().toLowerCase();
  return getPlacedOrders().find(
    (o) => o.id === id && o.email.toLowerCase() === normalizedEmail
  );
}
