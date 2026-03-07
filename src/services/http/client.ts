import axios, { AxiosError, AxiosHeaders, AxiosInstance } from 'axios';
import { AuthRefreshRequest, AuthRefreshResponse, ApiEnvelope, ApiFailureEnvelope, ApiMeta } from '../types';
import { API_BASE_URL, HTTP_TIMEOUT_MS } from './constants';
import { ApiError, isApiError } from './errors';
import { getRetryDelayMs, resolveRetryOptions, shouldRetryRequest } from './retry';
import { clearTokens, getAccessTokenSync, getRefreshTokenSync, saveTokens, TokenPair } from './tokenStore';
import { ApiResult, HttpRequestOptions, InternalRequestConfig, RequestMethod } from './types';

type AuthFailureHandler = () => void;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setAuthorizationHeader(
  headers: InternalRequestConfig['headers'],
  token: string
): AxiosHeaders {
  const normalized = AxiosHeaders.from((headers ?? {}) as any);
  normalized.set('Authorization', `Bearer ${token}`);
  return normalized;
}

function isApiEnvelope<TData>(payload: unknown): payload is ApiEnvelope<TData> {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  return 'success' in payload;
}

function unwrapApiPayload<TData>(payload: ApiEnvelope<TData> | TData): ApiResult<TData> {
  if (isApiEnvelope<TData>(payload)) {
    if (payload.success) {
      return {
        data: payload.data,
        meta: payload.meta,
      };
    }

    throw new ApiError({
      message: payload.error.message,
      code: payload.error.code,
      details: payload.error.details,
    });
  }

  return { data: payload as TData };
}

export class ApiClient {
  private readonly instance: AxiosInstance;
  private readonly refreshInstance: AxiosInstance;
  private refreshPromise: Promise<TokenPair> | null = null;
  private authFailureHandler: AuthFailureHandler | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: HTTP_TIMEOUT_MS,
      headers: {
        Accept: 'application/json',
      },
    });

    this.refreshInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: HTTP_TIMEOUT_MS,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  setAuthFailureHandler(handler: AuthFailureHandler | null): void {
    this.authFailureHandler = handler;
  }

  async request<TResponse, TBody = unknown>(
    method: RequestMethod,
    url: string,
    body?: TBody,
    options?: HttpRequestOptions<TBody>
  ): Promise<TResponse> {
    const result = await this.execute<TResponse, TBody>(method, url, body, options);
    return result.data;
  }

  async requestWithMeta<TResponse, TBody = unknown>(
    method: RequestMethod,
    url: string,
    body?: TBody,
    options?: HttpRequestOptions<TBody>
  ): Promise<ApiResult<TResponse>> {
    return this.execute<TResponse, TBody>(method, url, body, options);
  }

  async get<TResponse>(url: string, options?: HttpRequestOptions<never>): Promise<TResponse> {
    return this.request<TResponse, never>('GET', url, undefined, options);
  }

  async getWithMeta<TResponse>(url: string, options?: HttpRequestOptions<never>): Promise<ApiResult<TResponse>> {
    return this.requestWithMeta<TResponse, never>('GET', url, undefined, options);
  }

  async post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: HttpRequestOptions<TBody>
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>('POST', url, body, options);
  }

  async patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: HttpRequestOptions<TBody>
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>('PATCH', url, body, options);
  }

  async delete<TResponse = void>(url: string, options?: HttpRequestOptions<never>): Promise<TResponse> {
    return this.request<TResponse, never>('DELETE', url, undefined, options);
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        const requestConfig = config as InternalRequestConfig;
        const token = getAccessTokenSync();

        if (requestConfig._requiresAuth !== false && token) {
          config.headers = setAuthorizationHeader(config.headers, token);
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const requestConfig = error.config as InternalRequestConfig | undefined;
        const shouldRefresh =
          error.response?.status === 401 && requestConfig?._requiresAuth !== false && !requestConfig?._retryAuthAttempted;

        if (!shouldRefresh || !requestConfig) {
          return Promise.reject(error);
        }

        requestConfig._retryAuthAttempted = true;

        try {
          const tokens = await this.refreshTokens();

          requestConfig.headers = setAuthorizationHeader(requestConfig.headers, tokens.accessToken);

          return this.instance.request(requestConfig);
        } catch (refreshError) {
          await clearTokens();
          this.authFailureHandler?.();
          return Promise.reject(refreshError);
        }
      }
    );
  }

  private async refreshTokens(): Promise<TokenPair> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      const refreshToken = getRefreshTokenSync();

      if (!refreshToken) {
        throw new ApiError({
          message: 'Sessão expirada. Faça login novamente.',
          status: 401,
          code: 'AUTH_REFRESH_TOKEN_MISSING',
        });
      }

      const payload: AuthRefreshRequest = { refreshToken };
      const response = await this.refreshInstance.post<ApiEnvelope<AuthRefreshResponse> | AuthRefreshResponse>(
        '/auth/refresh',
        payload
      );

      const result = unwrapApiPayload<AuthRefreshResponse>(response.data);

      await saveTokens({
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      });

      return {
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      };
    })();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async execute<TResponse, TBody = unknown>(
    method: RequestMethod,
    url: string,
    body?: TBody,
    options?: HttpRequestOptions<TBody>
  ): Promise<ApiResult<TResponse>> {
    const { requiresAuth = true, retry, raw = false, headers, ...rest } = options ?? {};
    const retryOptions = resolveRetryOptions(retry);
    let attempt = 0;

    while (true) {
      try {
        const requestConfig: InternalRequestConfig<TBody> = {
          ...rest,
          headers: {
            ...(body ? { 'Content-Type': 'application/json' } : {}),
            ...(headers ?? {}),
          },
          method,
          url,
          data: body,
          _requiresAuth: requiresAuth,
        };

        const response = await this.instance.request<ApiEnvelope<TResponse> | TResponse>(requestConfig);

        if (raw) {
          return { data: response.data as TResponse };
        }

        return unwrapApiPayload<TResponse>(response.data);
      } catch (error) {
        const normalizedError = this.normalizeError(error);

        if (shouldRetryRequest(normalizedError, attempt, method, retryOptions)) {
          const delayMs = getRetryDelayMs(attempt, retryOptions);
          attempt += 1;
          await sleep(delayMs);
          continue;
        }

        throw normalizedError;
      }
    }
  }

  private normalizeError(error: unknown): ApiError {
    if (isApiError(error)) {
      return error;
    }

    if (axios.isAxiosError(error)) {
      const responseStatus = error.response?.status;
      const payload = error.response?.data as Partial<ApiFailureEnvelope> | undefined;
      const isEnvelopeError = payload?.success === false && payload.error?.message;
      const isTimeout = error.code === 'ECONNABORTED';
      const isNetworkError = !error.response;

      return new ApiError({
        message: isEnvelopeError ? String(payload.error?.message) : error.message || 'Erro inesperado de rede.',
        code: isEnvelopeError ? payload.error?.code : error.code,
        status: responseStatus,
        details: isEnvelopeError ? payload.error?.details : error.response?.data,
        isTimeout,
        isNetworkError,
        originalError: error,
      });
    }

    if (error instanceof Error) {
      return new ApiError({
        message: error.message,
        originalError: error,
      });
    }

    return new ApiError({
      message: 'Erro desconhecido na comunicação com a API.',
      details: error,
    });
  }
}

export const apiClient = new ApiClient();
