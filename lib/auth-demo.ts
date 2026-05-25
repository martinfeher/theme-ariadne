export type DemoUser = {
  name: string;
  email: string;
  password: string;
};

export type AuthSession = {
  email: string;
  name: string;
};

const USERS_KEY = 'ariadne-auth-users';
const SESSION_KEY = 'ariadne-auth-session';
const RESET_KEY = 'ariadne-auth-reset';

function readUsers(): DemoUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as DemoUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: DemoUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function setSession(session: AuthSession | null) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): { ok: true } | { ok: false; error: 'emailTaken' } {
  const email = input.email.trim().toLowerCase();
  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: 'emailTaken' };
  }
  users.push({
    name: input.name.trim(),
    email,
    password: input.password,
  });
  writeUsers(users);
  setSession({ email, name: input.name.trim() });
  return { ok: true };
}

export function loginUser(input: {
  email: string;
  password: string;
}): { ok: true; user: AuthSession } | { ok: false; error: 'invalid' } {
  const email = input.email.trim().toLowerCase();
  const user = readUsers().find((u) => u.email === email);
  if (!user || user.password !== input.password) {
    return { ok: false, error: 'invalid' };
  }
  const session = { email: user.email, name: user.name };
  setSession(session);
  return { ok: true, user: session };
}

export function requestPasswordReset(email: string): { ok: true } {
  const normalized = email.trim().toLowerCase();
  const tokens = readResetTokens();
  tokens[normalized] = `demo-${Date.now()}`;
  localStorage.setItem(RESET_KEY, JSON.stringify(tokens));
  return { ok: true };
}

function readResetTokens(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(RESET_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function resetPassword(input: {
  email: string;
  password: string;
}): { ok: true } | { ok: false; error: 'notFound' } {
  const email = input.email.trim().toLowerCase();
  const users = readUsers();
  const index = users.findIndex((u) => u.email === email);
  if (index === -1) return { ok: false, error: 'notFound' };

  users[index] = { ...users[index], password: input.password };
  writeUsers(users);
  const tokens = readResetTokens();
  delete tokens[email];
  localStorage.setItem(RESET_KEY, JSON.stringify(tokens));
  return { ok: true };
}

export function hasResetToken(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return Boolean(readResetTokens()[normalized]);
}
