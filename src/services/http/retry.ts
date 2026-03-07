import { Method } from 'axios';
import { ApiError } from './errors';

export type RetryOptions = {
  enabled: boolean;
  retries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  retryableStatusCodes: number[];
  retryableMethods: Method[];
};

export type RetryOptionsInput = boolean | Partial<RetryOptions>;

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  enabled: false,
  retries: 0,
  baseDelayMs: 350,
  maxDelayMs: 1500,
  retryableStatusCodes: [408, 409, 425, 429, 500, 502, 503, 504],
  retryableMethods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE'],
};

export function resolveRetryOptions(retry?: RetryOptionsInput): RetryOptions {
  if (typeof retry === 'boolean') {
    if (!retry) {
      return { ...DEFAULT_RETRY_OPTIONS, enabled: false };
    }

    return { ...DEFAULT_RETRY_OPTIONS, enabled: true, retries: 2 };
  }

  return {
    ...DEFAULT_RETRY_OPTIONS,
    ...(retry ?? {}),
  };
}

export function shouldRetryRequest(error: ApiError, attempt: number, method: Method, options: RetryOptions): boolean {
  if (!options.enabled) {
    return false;
  }

  if (attempt >= options.retries) {
    return false;
  }

  const normalizedMethod = method.toUpperCase() as Method;
  const methodAllowed = options.retryableMethods.map((item) => item.toUpperCase()).includes(normalizedMethod);

  if (!methodAllowed) {
    return false;
  }

  if (error.isNetworkError || error.isTimeout) {
    return true;
  }

  return typeof error.status === 'number' && options.retryableStatusCodes.includes(error.status);
}

export function getRetryDelayMs(attempt: number, options: RetryOptions): number {
  const exponential = options.baseDelayMs * Math.pow(2, attempt);
  const jitter = Math.floor(Math.random() * 100);
  return Math.min(options.maxDelayMs, exponential + jitter);
}
