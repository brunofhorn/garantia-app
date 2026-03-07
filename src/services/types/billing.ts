import { ISODateString } from './common';

export type BillingPlan = 'FREE' | 'PRO';

export type BillingSubscription = {
  plan: BillingPlan;
  status?: string;
  startedAt?: ISODateString;
  renewsAt?: ISODateString | null;
  updatedAt?: ISODateString;
};

export type UpdateBillingPlanRequest = {
  plan: BillingPlan;
};
