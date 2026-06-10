import { findOrder, MOCK_ORDERS, type MockOrder } from '@/lib/mock-orders';
import { findPlacedOrder, getPlacedOrders } from '@/lib/placed-orders';

/** Demo accounts share the same sample order history. */
const ORDER_HISTORY_ALIASES: Record<string, string[]> = {
  'admin@example.com': ['admin@example.com', 'demo@example.com'],
  'demo@example.com': ['demo@example.com', 'admin@example.com'],
};

function orderEmailsForAccount(email: string): string[] {
  const normalized = email.trim().toLowerCase();
  return ORDER_HISTORY_ALIASES[normalized] ?? [normalized];
}

/** Mock catalogue orders plus checkout orders saved in localStorage for this email. */
export function getOrdersForEmail(email: string): MockOrder[] {
  const emails = new Set(orderEmailsForAccount(email));
  const byId = new Map<string, MockOrder>();

  for (const order of MOCK_ORDERS) {
    if (emails.has(order.email.toLowerCase())) {
      byId.set(order.id, order);
    }
  }

  for (const order of getPlacedOrders()) {
    if (emails.has(order.email.toLowerCase())) {
      byId.set(order.id, order);
    }
  }

  return [...byId.values()].sort(
    (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
  );
}

/** Resolve mock or checkout orders for tracking (supports demo account aliases). */
export function findTrackedOrder(orderId: string, email: string): MockOrder | undefined {
  for (const em of orderEmailsForAccount(email)) {
    const order = findOrder(orderId, em) ?? findPlacedOrder(orderId, em);
    if (order) return order;
  }
  return undefined;
}
