import { MOCK_ORDERS, type MockOrder } from '@/lib/mock-orders';
import { getPlacedOrders } from '@/lib/placed-orders';

/** Mock catalogue orders plus checkout orders saved in localStorage for this email. */
export function getOrdersForEmail(email: string): MockOrder[] {
  const normalized = email.trim().toLowerCase();
  const byId = new Map<string, MockOrder>();

  for (const order of MOCK_ORDERS) {
    if (order.email.toLowerCase() === normalized) {
      byId.set(order.id, order);
    }
  }

  for (const order of getPlacedOrders()) {
    if (order.email.toLowerCase() === normalized) {
      byId.set(order.id, order);
    }
  }

  return [...byId.values()].sort(
    (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
  );
}
