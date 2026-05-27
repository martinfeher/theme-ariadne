/** FAQ section and item ids — copy lives under `FAQ.sections` / `FAQ.items` in messages. */
export const FAQ_SECTIONS = [
  {
    id: 'orders',
    itemIds: ['trackOrder', 'modifyOrder', 'cancelOrder', 'orderConfirmation'],
  },
  {
    id: 'delivery',
    itemIds: ['deliveryAreas', 'deliveryTimes', 'deliveryFees', 'missedDelivery'],
  },
  {
    id: 'products',
    itemIds: ['organicProducts', 'freshness', 'outOfStock', 'substitutions'],
  },
  {
    id: 'account',
    itemIds: ['createAccount', 'paymentMethods', 'vouchers', 'returns'],
  },
] as const;

export type FaqSectionId = (typeof FAQ_SECTIONS)[number]['id'];
export type FaqItemId = (typeof FAQ_SECTIONS)[number]['itemIds'][number];
