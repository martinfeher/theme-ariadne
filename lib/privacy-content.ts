/** Privacy policy section ids — copy under `Privacy.sections` in messages. */
export const PRIVACY_SECTIONS = [
  'overview',
  'controller',
  'dataWeCollect',
  'howWeUse',
  'legalBasis',
  'cookies',
  'sharing',
  'retention',
  'security',
  'yourRights',
  'internationalTransfers',
  'children',
  'changes',
  'contact',
] as const;

export type PrivacySectionId = (typeof PRIVACY_SECTIONS)[number];

export const PRIVACY_SECTIONS_WITH_LIST: readonly PrivacySectionId[] = [
  'dataWeCollect',
  'howWeUse',
  'legalBasis',
  'cookies',
  'sharing',
  'yourRights',
];
