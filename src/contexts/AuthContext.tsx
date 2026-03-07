import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  AuthSession,
  AuthSigninRequest,
  AuthSignupRequest,
  AuthUser,
  apiClient,
  authApi,
  clearTokens,
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

function mapSessionToUser(session: AuthSession): AuthUser {
  return session.user;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const resetSession = useCallback(async () => {
    setUser(null);
    await clearTokens();
  }, []);

  const refreshProfile = useCallback(async () => {
    const profile = await authApi.me();
    setUser(profile.user);
  }, []);

  const signIn = useCallback(async (payload: AuthSigninRequest) => {
    const session = await authApi.signin(payload, { retry: false });
    await saveTokens({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    });
    setUser(mapSessionToUser(session));
  }, []);

  const signUp = useCallback(async (payload: AuthSignupRequest) => {
    const session = await authApi.signup(payload, { retry: false });
    await saveTokens({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    });
    setUser(mapSessionToUser(session));
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
