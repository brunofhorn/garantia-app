import { ApiResult } from '../http';
import { ApiListResponse, ApiMeta } from '../types';

export type ListResult<TData> = {
  items: TData[];
  meta?: ApiMeta;
};

export function normalizeListResult<TData>(
  result: ApiResult<TData[] | ApiListResponse<TData> | { data: TData[] }>
): ListResult<TData> {
  if (Array.isArray(result.data)) {
    return { items: result.data, meta: result.meta };
  }

  if ('items' in result.data && Array.isArray(result.data.items)) {
    return { items: result.data.items, meta: result.meta };
  }

  if ('data' in result.data && Array.isArray(result.data.data)) {
    return { items: result.data.data, meta: result.meta };
  }

  return { items: [], meta: result.meta };
}
