export type ShippingMethod = {
  id: string;
  labelKey: string;
  price: number;
  days: string;
};

export type PaymentMethod = {
  id: string;
  labelKey: string;
  descriptionKey: string;
};

export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: 'standard', labelKey: 'shippingStandard', price: 4.99, days: '3–5' },
  { id: 'express', labelKey: 'shippingExpress', price: 9.99, days: '1–2' },
  { id: 'pickup', labelKey: 'shippingPickup', price: 0, days: '1' },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'card', labelKey: 'paymentCard', descriptionKey: 'paymentCardDesc' },
  { id: 'cod', labelKey: 'paymentCod', descriptionKey: 'paymentCodDesc' },
  { id: 'bank', labelKey: 'paymentBank', descriptionKey: 'paymentBankDesc' },
];

export const FREE_SHIPPING_THRESHOLD = 50;

export function shippingCost(subtotal: number, methodId: string): number {
  const method = SHIPPING_METHODS.find((m) => m.id === methodId);
  if (!method) return 0;
  if (subtotal >= FREE_SHIPPING_THRESHOLD && method.id === 'standard') return 0;
  return method.price;
}

export function generateOrderId(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `ORD-2026-${n}`;
}
