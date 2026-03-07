export type ApiErrorParams = {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
  isNetworkError?: boolean;
  isTimeout?: boolean;
  originalError?: unknown;
};

export class ApiError extends Error {
  readonly code?: string;
  readonly status?: number;
  readonly details?: unknown;
  readonly isNetworkError: boolean;
  readonly isTimeout: boolean;
  readonly originalError?: unknown;

  constructor(params: ApiErrorParams) {
    super(params.message);
    this.name = 'ApiError';
    this.code = params.code;
    this.status = params.status;
    this.details = params.details;
    this.isNetworkError = Boolean(params.isNetworkError);
    this.isTimeout = Boolean(params.isTimeout);
    this.originalError = params.originalError;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
