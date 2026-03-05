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
  GuaranteesTab: undefined;
  DocumentsTab: undefined;
  AddTab: undefined;
  SubscriptionsTab: undefined;
  SettingsTab: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  MyWarranties: undefined;
  Settings: undefined;
  WarrantyDetails: { warrantyId: string };
  AddWarranty: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
};
