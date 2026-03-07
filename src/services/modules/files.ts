import { apiClient, HttpRequestOptions } from '../http';
import { ApiListResponse, CreateItemFileRequest, ItemFile, UUID } from '../types';
import { ListResult, normalizeListResult } from './utils';

export const filesApi = {
  create(itemId: UUID, payload: CreateItemFileRequest, options?: HttpRequestOptions<CreateItemFileRequest>) {
    return apiClient.post<ItemFile, CreateItemFileRequest>(`/items/${itemId}/files`, payload, options);
  },

  async listByItem(itemId: UUID, options?: HttpRequestOptions<never>): Promise<ListResult<ItemFile>> {
    const result = await apiClient.getWithMeta<ItemFile[] | ApiListResponse<ItemFile> | { data: ItemFile[] }>(
      `/items/${itemId}/files`,
      options
    );

    return normalizeListResult(result);
  },

  remove(id: UUID, options?: HttpRequestOptions<never>) {
    return apiClient.delete<void>(`/files/${id}`, options);
  },
};
