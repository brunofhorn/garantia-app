import { apiClient, HttpRequestOptions } from '../http';
import { ApiListResponse, DashboardSummary, DashboardUpcomingQuery, Item } from '../types';
import { ListResult, normalizeListResult } from './utils';

export const dashboardApi = {
  summary(options?: HttpRequestOptions<never>) {
    return apiClient.get<DashboardSummary>('/dashboard/summary', options);
  },

  async upcoming(query?: DashboardUpcomingQuery, options?: HttpRequestOptions<never>): Promise<ListResult<Item>> {
    const result = await apiClient.getWithMeta<Item[] | ApiListResponse<Item> | { data: Item[] }>('/dashboard/upcoming', {
      params: query,
      ...options,
    });

    return normalizeListResult(result);
  },
};
