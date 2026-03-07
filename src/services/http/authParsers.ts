import { AuthUser } from '../types';

type UnknownObject = Record<string, unknown>;

function asObject(value: unknown): UnknownObject | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as UnknownObject;
}

function looksLikeJwt(value: string): boolean {
  const parts = value.split('.');
  return parts.length === 3 && parts.every((part) => part.length > 0);
}

function readString(obj: UnknownObject | null, keys: string[]): string | null {
  if (!obj) {
    return null;
  }

  for (const key of keys) {
    const value = obj[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return null;
}

function collectTokenCandidates(payload: unknown): UnknownObject[] {
  const root = asObject(payload);
  if (!root) {
    return [];
  }

  const data = asObject(root.data);
  const tokens = asObject(root.tokens);
  const dataTokens = asObject(data?.tokens);

  return [root, data, tokens, dataTokens].filter(Boolean) as UnknownObject[];
}

export function extractTokenPair(payload: unknown): { accessToken: string; refreshToken: string } | null {
  const candidates = collectTokenCandidates(payload);

  for (const candidate of candidates) {
    const accessToken =
      readString(candidate, ['accessToken', 'access_token']) ??
      readString(asObject(candidate.auth), ['accessToken', 'access_token']);
    const refreshToken =
      readString(candidate, ['refreshToken', 'refresh_token']) ??
      readString(asObject(candidate.auth), ['refreshToken', 'refresh_token']);

    if (accessToken && refreshToken && looksLikeJwt(accessToken)) {
      return { accessToken, refreshToken };
    }

    const legacyToken = readString(candidate, ['token']) ?? readString(asObject(candidate.auth), ['token']);
    if (legacyToken && refreshToken && looksLikeJwt(legacyToken)) {
      return { accessToken: legacyToken, refreshToken };
    }
  }

  return null;
}

function normalizeAuthUser(candidate: unknown): AuthUser | null {
  const obj = asObject(candidate);
  if (!obj) {
    return null;
  }

  const id = readString(obj, ['id']);
  const email = readString(obj, ['email']);
  const name = readString(obj, ['name', 'fullName']) ?? 'Usuário';

  if (!id || !email) {
    return null;
  }

  return {
    id,
    email,
    name,
  };
}

export function extractAuthUser(payload: unknown): AuthUser | null {
  const root = asObject(payload);
  if (!root) {
    return null;
  }

  const data = asObject(root.data);
  const candidates = [
    root.user,
    root.profile,
    data?.user,
    data?.profile,
    data,
    root,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeAuthUser(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return null;
}
