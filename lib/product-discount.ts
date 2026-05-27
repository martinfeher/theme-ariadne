export function getDiscountPercent(
  price: number,
  oldPrice: number | undefined
): number | null {
  if (oldPrice == null || oldPrice <= price) return null;
  return Math.round((1 - price / oldPrice) * 100);
}
