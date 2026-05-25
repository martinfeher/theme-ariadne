type VendorTextTranslator = (key: string) => string;

export function getVendorTagline(slug: string, t: VendorTextTranslator): string {
  return t(`items.${slug}.tagline`);
}

export function getVendorDescription(slug: string, t: VendorTextTranslator): string {
  return t(`items.${slug}.description`);
}
