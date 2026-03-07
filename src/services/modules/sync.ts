import { apiClient, HttpRequestOptions } from '../http';
import { SyncPullQuery, SyncPullResponse, SyncPushRequest, SyncPushResponse } from '../types';

export const syncApi = {
  push(payload: SyncPushRequest, options?: HttpRequestOptions<SyncPushRequest>) {
    return apiClient.post<SyncPushResponse, SyncPushRequest>('/sync/push', payload, options);
  },

  pull(query: SyncPullQuery, options?: HttpRequestOptions<never>) {
    return apiClient.get<SyncPullResponse>('/sync/pull', {
      params: query,
      ...options,
    });
  },
};
