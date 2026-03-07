import { apiClient, HttpRequestOptions } from '../http';
import { BillingSubscription, UpdateBillingPlanRequest } from '../types';

export const billingApi = {
  me(options?: HttpRequestOptions<never>) {
    return apiClient.get<BillingSubscription>('/billing/me', options);
  },

  updatePlan(payload: UpdateBillingPlanRequest, options?: HttpRequestOptions<UpdateBillingPlanRequest>) {
    return apiClient.patch<BillingSubscription, UpdateBillingPlanRequest>('/billing/plan', payload, options);
  },
};
