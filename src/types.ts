export type WarrantyStatus = 'valid' | 'expiring' | 'expired';

export type WarrantyItem = {
  id: string;
  productName: string;
  store: string;
  storeLogoColor: string;
  productImage: string;
  warrantyStart: string;
  warrantyEnd: string;
  daysLeft: number;
  status: WarrantyStatus;
  documentImage: string;
};

export type MainTabParamList = {
  HomeTab: undefined;
  GuaranteesTab: undefined;
  AddTab: undefined;
  DocumentsTab: undefined;
  SubscriptionsTab: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Dashboard: undefined;
  Home: undefined;
  MyWarranties: undefined;
  Settings: undefined;
  UserProfile: undefined;
  WarrantyDetails: { warrantyId: string };
  AddWarranty: undefined;
  AddDocument: undefined;
  AddSubscription: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
};
