export type UUID = string;
export type ISODateString = string;

export type ApiMeta = {
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
  [key: string]: unknown;
};

export type ApiErrorPayload = {
  code: string;
  message: string;
  details?: unknown;
};

export type ApiSuccessEnvelope<TData> = {
  success: true;
  data: TData;
  meta?: ApiMeta;
};

export type ApiFailureEnvelope = {
  success: false;
  error: ApiErrorPayload;
};

export type ApiEnvelope<TData> = ApiSuccessEnvelope<TData> | ApiFailureEnvelope;

export type ApiListResponse<TData> = {
  items: TData[];
};

export type PaginatedQuery = {
  page?: number;
  pageSize?: number;
};
