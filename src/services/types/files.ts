import { ISODateString, UUID } from './common';

export type ItemFile = {
  id: UUID;
  itemId: UUID;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storageKey: string;
  storageProvider?: string | null;
  checksum?: string | null;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
  deletedAt?: ISODateString | null;
};

export type CreateItemFileRequest = {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storageKey: string;
  storageProvider?: string;
  checksum?: string;
};
