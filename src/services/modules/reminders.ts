import { apiClient, HttpRequestOptions } from '../http';
import {
  ApiListResponse,
  CreateReminderRequest,
  Reminder,
  UUID,
  UpdateReminderRequest,
} from '../types';
import { ListResult, normalizeListResult } from './utils';

export const remindersApi = {
  create(itemId: UUID, payload: CreateReminderRequest, options?: HttpRequestOptions<CreateReminderRequest>) {
    return apiClient.post<Reminder, CreateReminderRequest>(`/items/${itemId}/reminders`, payload, options);
  },

  async listByItem(itemId: UUID, options?: HttpRequestOptions<never>): Promise<ListResult<Reminder>> {
    const result = await apiClient.getWithMeta<Reminder[] | ApiListResponse<Reminder> | { data: Reminder[] }>(
      `/items/${itemId}/reminders`,
      options
    );

    return normalizeListResult(result);
  },

  update(id: UUID, payload: UpdateReminderRequest, options?: HttpRequestOptions<UpdateReminderRequest>) {
    return apiClient.patch<Reminder, UpdateReminderRequest>(`/reminders/${id}`, payload, options);
  },

  remove(id: UUID, options?: HttpRequestOptions<never>) {
    return apiClient.delete<void>(`/reminders/${id}`, options);
  },
};
