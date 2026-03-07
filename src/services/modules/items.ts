import { apiClient, HttpRequestOptions } from '../http';
import {
  ApiListResponse,
  CreateItemRequest,
  Item,
  ListItemsQuery,
  UUID,
  UpdateItemRequest,
} from '../types';
import { ListResult, normalizeListResult } from './utils';

export const itemsApi = {
  create(payload: CreateItemRequest, options?: HttpRequestOptions<CreateItemRequest>) {
    return apiClient.post<Item, CreateItemRequest>('/items', payload, options);
  },

  async list(query?: ListItemsQuery, options?: HttpRequestOptions<never>): Promise<ListResult<Item>> {
    const result = await apiClient.getWithMeta<Item[] | ApiListResponse<Item> | { data: Item[] }>('/items', {
      params: query,
      ...options,
    });

    return normalizeListResult(result);
  },

  getById(id: UUID, options?: HttpRequestOptions<never>) {
    return apiClient.get<Item>(`/items/${id}`, options);
  },

  update(id: UUID, payload: UpdateItemRequest, options?: HttpRequestOptions<UpdateItemRequest>) {
    return apiClient.patch<Item, UpdateItemRequest>(`/items/${id}`, payload, options);
  },

  remove(id: UUID, options?: HttpRequestOptions<never>) {
    return apiClient.delete<void>(`/items/${id}`, options);
  },
};
