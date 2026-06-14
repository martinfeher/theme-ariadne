export type ShopInvoiceLine = {
  id: string;
  nameKey: string;
  sku: string;
  unitPrice: number;
  quantity: number;
};

export const DEMO_SHOP_INVOICE_LINES: ShopInvoiceLine[] = [
  {
    id: '1',
    nameKey: 'item1',
    sku: 'FWM15VKT',
    unitPrice: 10.99,
    quantity: 1,
  },
  {
    id: '2',
    nameKey: 'item2',
    sku: 'FWM15VKT',
    unitPrice: 20,
    quantity: 3,
  },
  {
    id: '3',
    nameKey: 'item3',
    sku: 'KVM15VK',
    unitPrice: 640,
    quantity: 1,
  },
  {
    id: '4',
    nameKey: 'item4',
    sku: '98HFG',
    unitPrice: 240,
    quantity: 1,
  },
];

export const DEMO_SHOP_INVOICE_TAX = 85.99;

export function getLineAmount(line: ShopInvoiceLine): number {
  return line.unitPrice * line.quantity;
}

export function getShopInvoiceSubtotal(lines: ShopInvoiceLine[]): number {
  return lines.reduce((sum, line) => sum + getLineAmount(line), 0);
}

export function getShopInvoiceGrandTotal(
  lines: ShopInvoiceLine[],
  tax: number = DEMO_SHOP_INVOICE_TAX
): number {
  return getShopInvoiceSubtotal(lines) + tax;
}
