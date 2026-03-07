import { ISODateString } from './common';

export type SyncEntity = 'CATEGORY' | 'ITEM' | 'REMINDER' | 'FILE' | 'USER_SUBSCRIPTION';
export type SyncOperation = 'UPSERT' | 'DELETE';

export type SyncChange = {
  entity: SyncEntity;
  operation: SyncOperation;
  record: Record<string, unknown>;
  baseUpdatedAt?: ISODateString;
};

export type SyncPushRequest = {
  deviceId: string;
  changes: SyncChange[];
};

export type SyncPushResponse = {
  accepted: SyncChange[];
  conflicts: SyncChange[];
  serverTime: ISODateString;
};

export type SyncPullQuery = {
  lastSyncAt: ISODateString;
  limit?: number;
  deviceId?: string;
};

export type SyncPullResponse = {
  changes: SyncChange[];
  nextSyncAt: ISODateString;
  hasMore: boolean;
};
