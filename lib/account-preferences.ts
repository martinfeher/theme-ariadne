export type AccountPreferences = {
  marketingEmails: boolean;
  orderUpdates: boolean;
};

const PREFS_KEY = 'ariadne-account-preferences';

const DEFAULT_PREFERENCES: AccountPreferences = {
  marketingEmails: true,
  orderUpdates: true,
};

function readAll(): Record<string, AccountPreferences> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, AccountPreferences>) : {};
  } catch {
    return {};
  }
}

function writeAll(prefs: Record<string, AccountPreferences>) {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export function getAccountPreferences(email: string): AccountPreferences {
  const normalized = email.trim().toLowerCase();
  return readAll()[normalized] ?? DEFAULT_PREFERENCES;
}

export function saveAccountPreferences(email: string, preferences: AccountPreferences) {
  const normalized = email.trim().toLowerCase();
  const all = readAll();
  all[normalized] = preferences;
  writeAll(all);
}
