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

export type RootStackParamList = {
  Home: undefined;
  MyWarranties: undefined;
  WarrantyDetails: { warrantyId: string };
  AddWarranty: undefined;
  Settings: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
};
