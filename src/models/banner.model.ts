export enum EBannerType {
  'home' = 'home',
}

export interface IBanner {
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  id: string;
  imageUrl: string;
  title: string;
  type: EBannerType;
  active: boolean;
}
