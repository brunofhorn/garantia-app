import { AxiosRequestConfig, Method } from 'axios';
import { ApiMeta } from '../types';
import { RetryOptionsInput } from './retry';

export type HttpRequestOptions<TBody = unknown> = Omit<AxiosRequestConfig<TBody>, 'url' | 'method' | 'data' | 'auth'> & {
  requiresAuth?: boolean;
  retry?: RetryOptionsInput;
  raw?: boolean;
};

export type InternalRequestConfig<TBody = unknown> = AxiosRequestConfig<TBody> & {
  _requiresAuth?: boolean;
  _retryAuthAttempted?: boolean;
};

export type RequestMethod = Method;

export type ApiResult<TData> = {
  data: TData;
  meta?: ApiMeta;
};
