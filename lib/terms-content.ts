/** Terms section ids — copy under `Terms.sections` in messages. */
export const TERMS_SECTIONS = [
  'overview',
  'acceptance',
  'account',
  'orders',
  'pricing',
  'payment',
  'delivery',
  'returns',
  'conduct',
  'intellectualProperty',
  'liability',
  'privacy',
  'changes',
  'governingLaw',
  'contact',
] as const;

export type TermsSectionId = (typeof TERMS_SECTIONS)[number];

export const TERMS_SECTIONS_WITH_LIST: readonly TermsSectionId[] = [
  'account',
  'conduct',
  'liability',
];
