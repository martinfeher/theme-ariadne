/** Refund policy section ids — copy under `RefundPolicy.sections` in messages. */
export const REFUND_POLICY_SECTIONS = [
  'overview',
  'eligibility',
  'freshProducts',
  'nonPerishable',
  'damagedItems',
  'substitutions',
  'cancellations',
  'refundMethods',
  'timelines',
  'exclusions',
  'howToClaim',
] as const;

export type RefundPolicySectionId = (typeof REFUND_POLICY_SECTIONS)[number];

export const REFUND_POLICY_SECTIONS_WITH_LIST: readonly RefundPolicySectionId[] = [
  'eligibility',
  'freshProducts',
  'nonPerishable',
  'refundMethods',
  'exclusions',
  'howToClaim',
];
