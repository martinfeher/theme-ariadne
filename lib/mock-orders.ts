import { MOCK_PRODUCTS } from '@/lib/mock-products';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type OrderLine = {
  productId: number;
  quantity: number;
};

export type MockOrder = {
  id: string;
  email: string;
  placedAt: string;
  status: OrderStatus;
  lines: OrderLine[];
  shipping: number;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
};

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  'pending',
  'processing',
  'shipped',
  'delivered',
];

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: 'ORD-2026-1042',
    email: 'demo@example.com',
    placedAt: '2026-05-18T10:30:00',
    status: 'shipped',
    lines: [
      { productId: 11, quantity: 2 },
      { productId: 13, quantity: 1 },
    ],
    shipping: 4.99,
    trackingNumber: 'SK123456789',
    carrier: 'DPD',
    estimatedDelivery: '2026-05-24',
  },
  {
    id: 'ORD-2026-0987',
    email: 'demo@example.com',
    placedAt: '2026-05-02T14:15:00',
    status: 'delivered',
    lines: [
      { productId: 16, quantity: 1 },
      { productId: 19, quantity: 3 },
    ],
    shipping: 0,
    trackingNumber: 'SK987654321',
    carrier: 'Slovak Post',
    estimatedDelivery: '2026-05-06',
  },
  {
    id: 'ORD-2026-1105',
    email: 'customer@example.com',
    placedAt: '2026-05-22T09:00:00',
    status: 'processing',
    lines: [{ productId: 22, quantity: 1 }],
    shipping: 5.99,
    estimatedDelivery: '2026-05-28',
  },
];

export function findOrder(orderId: string, email: string): MockOrder | undefined {
  const id = orderId.trim().toUpperCase();
  const normalizedEmail = email.trim().toLowerCase();
  return MOCK_ORDERS.find(
    (o) => o.id === id && o.email.toLowerCase() === normalizedEmail
  );
}

export function orderSubtotal(order: MockOrder): number {
  return order.lines.reduce((sum, line) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === line.productId);
    return sum + (product?.price ?? 0) * line.quantity;
  }, 0);
}

export function orderTotal(order: MockOrder): number {
  return orderSubtotal(order) + order.shipping;
}

export function statusStepIndex(status: OrderStatus): number {
  if (status === 'cancelled') return -1;
  return ORDER_STATUS_FLOW.indexOf(status);
}
