import { apiClient, HttpRequestOptions } from '../http';
import {
  ApiListResponse,
  Category,
  CreateCategoryRequest,
  ListCategoriesQuery,
  UpdateCategoryRequest,
  UUID,
} from '../types';
import { ListResult, normalizeListResult } from './utils';

export const categoriesApi = {
  create(payload: CreateCategoryRequest, options?: HttpRequestOptions<CreateCategoryRequest>) {
    return apiClient.post<Category, CreateCategoryRequest>('/categories', payload, options);
  },

  async list(query?: ListCategoriesQuery, options?: HttpRequestOptions<never>): Promise<ListResult<Category>> {
    const result = await apiClient.getWithMeta<Category[] | ApiListResponse<Category> | { data: Category[] }>('/categories', {
      params: query,
      ...options,
    });

    return normalizeListResult(result);
  },

  update(id: UUID, payload: UpdateCategoryRequest, options?: HttpRequestOptions<UpdateCategoryRequest>) {
    return apiClient.patch<Category, UpdateCategoryRequest>(`/categories/${id}`, payload, options);
  },

  remove(id: UUID, options?: HttpRequestOptions<never>) {
    return apiClient.delete<void>(`/categories/${id}`, options);
  },
};
