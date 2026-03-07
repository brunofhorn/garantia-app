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
    return {
      "user": {
        "id": "1d632835-f740-4f60-8d0d-5e4224a716eb",
        "name": "Bruno Silva",
        "email": "bruno+demo@example.com",
        "timezone": "America/Sao_Paulo",
        "createdAt": "2026-03-06T23:49:04.910Z"
      },
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZDYzMjgzNS1mNzQwLTRmNjAtOGQwZC01ZTQyMjRhNzE2ZWIiLCJlbWFpbCI6ImJydW5vK2RlbW9AZXhhbXBsZS5jb20iLCJpYXQiOjE3NzI4NTA4MzUsImV4cCI6MTc3Mjg1MTczNX0.JIA7Mcm4zPIb9mVmZ3gwDv8gfuEHSYTOzGeu1xWRUpg",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZDYzMjgzNS1mNzQwLTRmNjAtOGQwZC01ZTQyMjRhNzE2ZWIiLCJqdGkiOiI5OWM1ZDliOS0yOWQ5LTRiNWMtODk4NC04YWUwZTg4YzhmNjEiLCJ0eXAiOiJyZWZyZXNoIiwiaWF0IjoxNzcyODUwODM1LCJleHAiOjE3NzU0NDI4MzV9.aFvUepWflGk2haHHezkOCExcjmZmAbvNUrrajOMvzl0"
    }
    // return apiClient.post<AuthSession, AuthSigninRequest>('/auth/signin', payload, {
    //   requiresAuth: false,
    //   ...options,
    // });
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
