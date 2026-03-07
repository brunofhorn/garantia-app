import { Item } from './items';

export type DashboardSummary = {
  total?: number;
  active?: number;
  expiringSoon?: number;
  expired?: number;
  byType?: Partial<Record<'WARRANTY' | 'DOCUMENT' | 'SUBSCRIPTION', number>>;
  upcoming?: Item[];
  monthlySubscriptionsEstimate?: number;
  annualSubscriptionsEstimate?: number;
  currency?: string;
  totals?: {
    total?: number;
    active?: number;
    expiringSoon?: number;
    expired?: number;
    byType?: Partial<Record<'WARRANTY' | 'DOCUMENT' | 'SUBSCRIPTION', number>>;
  };
  subscriptions?: {
    monthlyEstimate?: number;
    annualEstimate?: number;
    currency?: string;
  };
};

export type DashboardUpcomingQuery = {
  limit?: number;
};
