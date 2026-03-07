import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = '@garantia_facil/access_token';
const REFRESH_TOKEN_KEY = '@garantia_facil/refresh_token';

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

let accessTokenMemory: string | null = null;
let refreshTokenMemory: string | null = null;

export async function hydrateTokens(): Promise<TokenPair | null> {
  const [accessToken, refreshToken] = await Promise.all([
    AsyncStorage.getItem(ACCESS_TOKEN_KEY),
    AsyncStorage.getItem(REFRESH_TOKEN_KEY),
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
    AsyncStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken),
    AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken),
  ]);
}

export async function clearTokens(): Promise<void> {
  accessTokenMemory = null;
  refreshTokenMemory = null;

  await Promise.all([AsyncStorage.removeItem(ACCESS_TOKEN_KEY), AsyncStorage.removeItem(REFRESH_TOKEN_KEY)]);
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
