import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  AuthSigninRequest,
  AuthSignupRequest,
  AuthUser,
  ApiError,
  apiClient,
  authApi,
  clearTokens,
  extractAuthUser,
  extractTokenPair,
  getAccessTokenSync,
  hydrateTokens,
  saveTokens,
} from '../services';

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (payload: AuthSigninRequest) => Promise<void>;
  signUp: (payload: AuthSignupRequest) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function makeTemporaryUser(email: string, explicitName?: string): AuthUser {
  const localPart = email.split('@')[0] ?? 'usuario';
  const normalizedName = explicitName?.trim() || localPart.replace(/[._-]/g, ' ');

  return {
    id: `temp-${Date.now()}`,
    email,
    name: normalizedName,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const resetSession = useCallback(async () => {
    setUser(null);
    await clearTokens();
  }, []);

  const refreshProfile = useCallback(async () => {
    const profile = (await authApi.me()) as unknown;
    const parsedUser = extractAuthUser(profile);

    if (!parsedUser) {
      throw new ApiError({
        message: 'Resposta inválida ao carregar perfil do usuário.',
        code: 'AUTH_ME_INVALID_RESPONSE',
        details: profile,
      });
    }

    setUser(parsedUser);
  }, []);

  const signIn = useCallback(async (payload: AuthSigninRequest) => {
    const response = (await authApi.signin(payload, { retry: false })) as unknown;
    const tokens = extractTokenPair(response);

    if (!tokens) {
      throw new ApiError({
        message: 'Resposta inválida no login. Tokens não encontrados.',
        code: 'AUTH_SIGNIN_INVALID_RESPONSE',
        details: response,
      });
    }

    await saveTokens(tokens);

    const userFromLogin = extractAuthUser(response) ?? makeTemporaryUser(payload.email);
    setUser(userFromLogin);
  }, []);

  const signUp = useCallback(async (payload: AuthSignupRequest) => {
    const response = (await authApi.signup(payload, { retry: false })) as unknown;
    const tokens = extractTokenPair(response);

    if (!tokens) {
      throw new ApiError({
        message: 'Resposta inválida no cadastro. Tokens não encontrados.',
        code: 'AUTH_SIGNUP_INVALID_RESPONSE',
        details: response,
      });
    }

    await saveTokens(tokens);

    const userFromSignup = extractAuthUser(response) ?? makeTemporaryUser(payload.email, payload.name);
    setUser(userFromSignup);
  }, []);

  const signOut = useCallback(async () => {
    await resetSession();
  }, [resetSession]);

  useEffect(() => {
    apiClient.setAuthFailureHandler(() => {
      void resetSession();
    });

    return () => {
      apiClient.setAuthFailureHandler(null);
    };
  }, [resetSession]);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await hydrateTokens();
        const accessToken = getAccessTokenSync();

        if (!accessToken) {
          return;
        }

        await refreshProfile();
      } catch {
        await resetSession();
      } finally {
        setIsLoading(false);
      }
    };

    void bootstrap();
  }, [refreshProfile, resetSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      signIn,
      signUp,
      signOut,
      refreshProfile,
    }),
    [user, isLoading, signIn, signUp, signOut, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
