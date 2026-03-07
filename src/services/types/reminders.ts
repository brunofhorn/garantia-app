import { ISODateString, UUID } from './common';

export type ReminderChannel = 'IN_APP' | 'PUSH' | 'EMAIL';

export type Reminder = {
  id: UUID;
  itemId: UUID;
  channel: ReminderChannel;
  daysBefore: number;
  isEnabled: boolean;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
  deletedAt?: ISODateString | null;
};

export type CreateReminderRequest = {
  channel: ReminderChannel;
  daysBefore: number;
  isEnabled?: boolean;
};

export type UpdateReminderRequest = Partial<CreateReminderRequest>;
