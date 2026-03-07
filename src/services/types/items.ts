import { ISODateString, PaginatedQuery, UUID } from './common';
import { Category } from './categories';

export type ItemType = 'WARRANTY' | 'DOCUMENT' | 'SUBSCRIPTION';
export type ItemStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED';

export type Item = {
  id: UUID;
  categoryId?: UUID | null;
  type: ItemType;
  title: string;
  description?: string | null;
  startDate?: ISODateString | null;
  expiryDate: ISODateString;
  amount?: number | null;
  currency?: string | null;
  providerName?: string | null;
  notes?: string | null;
  metadata?: Record<string, unknown> | null;
  status?: ItemStatus;
  category?: Category | null;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
  deletedAt?: ISODateString | null;
};

export type CreateItemRequest = {
  categoryId?: UUID;
  type: ItemType;
  title: string;
  description?: string;
  startDate?: ISODateString;
  expiryDate: ISODateString;
  amount?: number;
  currency?: string;
  providerName?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
};

export type UpdateItemRequest = Partial<CreateItemRequest>;

export type ItemSortBy = 'createdAt' | 'updatedAt' | 'expiryDate' | 'title' | 'amount';
export type ItemSortOrder = 'asc' | 'desc';

export type ListItemsQuery = PaginatedQuery & {
  type?: ItemType;
  status?: ItemStatus;
  categoryId?: UUID;
  search?: string;
  expiryFrom?: ISODateString;
  expiryTo?: ISODateString;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: ItemSortBy;
  sortOrder?: ItemSortOrder;
};
