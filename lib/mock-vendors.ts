import { MOCK_PRODUCTS } from '@/lib/mock-products';

export type Vendor = {
  slug: string;
  /** Must match `product.vendor` on catalog items */
  name: string;
  logo: string;
  banner: string;
  rating: number;
  reviewCount: number;
  since: number;
  featured?: boolean;
};

const IMAGE_BASE = '/images/products/mock';

export const MOCK_VENDORS: Vendor[] = [
  {
    slug: 'ariadne-foods',
    name: 'Ariadne Foods',
    logo: `${IMAGE_BASE}/organic_quinoa.jpeg`,
    banner: `${IMAGE_BASE}/fresh_broccoli.jpg`,
    rating: 4.8,
    reviewCount: 1240,
    since: 2018,
    featured: true,
  },
  {
    slug: 'ariadne-roasters',
    name: 'Ariadne Roasters',
    logo: `${IMAGE_BASE}/roast_ground_cofee.jpeg`,
    banner: `${IMAGE_BASE}/dark_roast_espresso.jpeg`,
    rating: 4.7,
    reviewCount: 386,
    since: 2020,
    featured: true,
  },

  {
    slug: 'starbucks',
    name: 'Starbucks',
    logo: `${IMAGE_BASE}/whole_bean_coffee.jpeg`,
    banner: `${IMAGE_BASE}/roast_ground_cofee.jpeg`,
    rating: 4.5,
    reviewCount: 892,
    since: 2015,
  },
  {
    slug: 'stouffer',
    name: 'Stouffer',
    logo: `${IMAGE_BASE}/vanilla_greek_yogurt.jpeg`,
    banner: `${IMAGE_BASE}/white_bread.jpeg`,
    rating: 4.4,
    reviewCount: 178,
    since: 2017,
  },
  {
    slug: 'wonder',
    name: 'Wonder',
    logo: `${IMAGE_BASE}/white_bread.jpeg`,
    banner: `${IMAGE_BASE}/white_bread.jpeg`,
    rating: 4.3,
    reviewCount: 96,
    since: 2022,
  },
];

export function vendorSlugFromName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export function vendorHref(nameOrSlug: string): string {
  const slug = nameOrSlug.includes(' ')
    ? vendorSlugFromName(nameOrSlug)
    : nameOrSlug;
  return `/vendor/${slug}`;
}

export function getVendorBySlug(slug: string): Vendor | undefined {
  return MOCK_VENDORS.find((vendor) => vendor.slug === slug);
}

export function getVendorByName(name: string): Vendor | undefined {
  return MOCK_VENDORS.find((vendor) => vendor.name === name);
}

export function getProductsByVendor(vendor: Vendor) {
  return MOCK_PRODUCTS.filter((product) => product.vendor === vendor.name);
}

export function countProductsByVendor(vendor: Vendor): number {
  return getProductsByVendor(vendor).length;
}

export function getAllVendorProductCounts(): Record<string, number> {
  return MOCK_VENDORS.reduce<Record<string, number>>((acc, vendor) => {
    acc[vendor.slug] = countProductsByVendor(vendor);
    return acc;
  }, {});
}
