export const CONTACT_INFO = {
  addressLine1: 'Hlavná 123',
  city: '811 01 Bratislava',
  countryKey: 'SK' as const,
  phone: '+421 900 123 456',
  phoneHref: 'tel:+421900123456',
  email: 'hello@webariadne.com',
  emailHref: 'mailto:hello@webariadne.com',
  /** Bratislava city centre — used for map embed & external link */
  latitude: 48.148598,
  longitude: 17.107748,
} as const;

export function contactMapEmbedUrl() {
  const { latitude, longitude } = CONTACT_INFO;
  return `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&output=embed`;
}

export function contactMapExternalUrl() {
  const { latitude, longitude } = CONTACT_INFO;
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}
