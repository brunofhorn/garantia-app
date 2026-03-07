import { ISODateString, UUID } from './common';

export type UserPlan = 'FREE' | 'PRO';

export type AuthUser = {
  id: UUID;
  name: string;
  email: string;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
};

export type AuthSubscription = {
  plan: UserPlan;
  status?: string;
  renewsAt?: ISODateString | null;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export type AuthSignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthSigninRequest = {
  email: string;
  password: string;
};

export type AuthRefreshRequest = {
  refreshToken: string;
};

export type AuthRefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AuthMeResponse = {
  user: AuthUser;
  subscription?: AuthSubscription | null;
};
