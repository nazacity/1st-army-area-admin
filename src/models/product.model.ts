export interface IProductCategory {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  id: string;
  color: string;
  products: IProduct[];
}

export enum EProductStatus {
  'available' = 'available',
  'unavailable' = 'unavailable',
}

export enum EProductSize {
  'ขนาดปกติ' = 'ขนาดปกติ',
  'มวนสลิม' = 'มวนสลิม',
  'มวนเล็ก 7.1' = 'มวนเล็ก 7.1',
  'มวนใหญ่กว่าปกติ' = 'มวนใหญ่กว่าปกติ',
  'มวนใหญ่' = 'มวนใหญ่',
}

export interface IProduct {
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  id: string;
  thumbnailImageUrl: string;
  images: IProductImage[];
  name: string;
  from: string;
  size: EProductSize;
  cost: number;
  description: string;
  productOptions: IProductOption[];
  categories: IProductCategory[];
  status: EProductStatus;
}

export interface IProductImage {
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  id: string;
  imageUrl: string;
}

export interface IProductOption {
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  label: string;
  price: number;
  discounts: IProductOptionDiscount[];
  product: IProduct;
}

export interface IProductOptionDiscount {
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  id: string;
  quantity: number;
  discount: number;
}
