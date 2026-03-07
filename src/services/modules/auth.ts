import { apiClient, HttpRequestOptions } from '../http';
import {
  AuthMeResponse,
  AuthRefreshRequest,
  AuthRefreshResponse,
  AuthSession,
  AuthSigninRequest,
  AuthSignupRequest,
} from '../types';

export const authApi = {
  signup(payload: AuthSignupRequest, options?: HttpRequestOptions<AuthSignupRequest>) {
    return apiClient.post<AuthSession, AuthSignupRequest>('/auth/signup', payload, {
      requiresAuth: false,
      ...options,
    });
  },

  signin(payload: AuthSigninRequest, options?: HttpRequestOptions<AuthSigninRequest>) {
    return apiClient.post<AuthSession, AuthSigninRequest>('/auth/signin', payload, {
      requiresAuth: false,
      ...options,
    });
  },

  refresh(payload: AuthRefreshRequest, options?: HttpRequestOptions<AuthRefreshRequest>) {
    return apiClient.post<AuthRefreshResponse, AuthRefreshRequest>('/auth/refresh', payload, {
      requiresAuth: false,
      ...options,
    });
  },

  me(options?: HttpRequestOptions<never>) {
    return apiClient.get<AuthMeResponse>('/auth/me', options);
  },
};
