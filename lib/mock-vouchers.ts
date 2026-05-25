export type VoucherStatus = 'active' | 'used' | 'expired';

export type Voucher = {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrder?: number;
  expiresAt: string;
  status: VoucherStatus;
};

export const MOCK_VOUCHERS: Voucher[] = [
  {
    id: '1',
    code: 'WELCOME10',
    title: 'Welcome discount',
    description: '10% off your first order',
    discountType: 'percent',
    discountValue: 10,
    expiresAt: '2026-12-31',
    status: 'active',
  },
  {
    id: '2',
    code: 'SAVE15',
    title: 'Cart saver',
    description: '€15 off when you spend €50 or more',
    discountType: 'fixed',
    discountValue: 15,
    minOrder: 50,
    expiresAt: '2026-09-30',
    status: 'active',
  },
  {
    id: '3',
    code: 'FREESHIP',
    title: 'Free shipping',
    description: 'Free delivery on any order this month',
    discountType: 'fixed',
    discountValue: 0,
    expiresAt: '2026-06-30',
    status: 'active',
  },
  {
    id: '4',
    code: 'SUMMER25',
    title: 'Summer sale',
    description: '25% off fresh fruit & vegetables',
    discountType: 'percent',
    discountValue: 25,
    expiresAt: '2025-08-31',
    status: 'expired',
  },
  {
    id: '5',
    code: 'LOYAL5',
    title: 'Loyalty reward',
    description: '5% off as a thank-you for your last purchase',
    discountType: 'percent',
    discountValue: 5,
    expiresAt: '2026-03-01',
    status: 'used',
  },
];

export function findVoucherByCode(code: string): Voucher | undefined {
  const normalized = code.trim().toUpperCase();
  return MOCK_VOUCHERS.find((v) => v.code === normalized);
}
