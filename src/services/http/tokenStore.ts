import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = '@garantia_facil/access_token';
const REFRESH_TOKEN_KEY = '@garantia_facil/refresh_token';

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

let accessTokenMemory: string | null = null;
let refreshTokenMemory: string | null = null;
let warnedStorageFailure = false;

function warnStorageFailure(error: unknown): void {
  if (warnedStorageFailure) {
    return;
  }

  warnedStorageFailure = true;
  console.warn('AsyncStorage indisponível. Usando fallback em memória para sessão.', error);
}

async function safeGetItem(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    warnStorageFailure(error);
    return null;
  }
}

async function safeSetItem(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    warnStorageFailure(error);
  }
}

async function safeRemoveItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    warnStorageFailure(error);
  }
}

export async function hydrateTokens(): Promise<TokenPair | null> {
  const [accessToken, refreshToken] = await Promise.all([
    safeGetItem(ACCESS_TOKEN_KEY),
    safeGetItem(REFRESH_TOKEN_KEY),
  ]);

  accessTokenMemory = accessToken;
  refreshTokenMemory = refreshToken;

  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

export async function saveTokens(tokens: TokenPair): Promise<void> {
  accessTokenMemory = tokens.accessToken;
  refreshTokenMemory = tokens.refreshToken;

  await Promise.all([
    safeSetItem(ACCESS_TOKEN_KEY, tokens.accessToken),
    safeSetItem(REFRESH_TOKEN_KEY, tokens.refreshToken),
  ]);
}

export async function clearTokens(): Promise<void> {
  accessTokenMemory = null;
  refreshTokenMemory = null;

  await Promise.all([safeRemoveItem(ACCESS_TOKEN_KEY), safeRemoveItem(REFRESH_TOKEN_KEY)]);
}

export function getAccessTokenSync(): string | null {
  return accessTokenMemory;
}

export function getRefreshTokenSync(): string | null {
  return refreshTokenMemory;
}

export function getTokensSync(): TokenPair | null {
  if (!accessTokenMemory || !refreshTokenMemory) {
    return null;
  }

  return {
    accessToken: accessTokenMemory,
    refreshToken: refreshTokenMemory,
  };
}
