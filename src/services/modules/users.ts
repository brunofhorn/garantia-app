import { apiClient, HttpRequestOptions } from '../http';
import { UserMeResponse } from '../types';

export const usersApi = {
  me(options?: HttpRequestOptions<never>) {
    return apiClient.get<UserMeResponse>('/users/me', options);
  },
};
