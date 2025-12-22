import { IProductOption } from './product.model';

export enum EShippingFeeType {
  'COD' = 'COD',
  'normal' = 'normal',
}

export interface IOrder {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  orderNo: string;
  amount: number;
  discount: number;
  total: number;
  shippingFee: number;
  creditAmount: number;
  status: EOrderStatus;
  trackingNo: string;
  trackingCompanyName: string;
  transferSlipImageUrl: string;
  orderItems: IOrderItem[];
  name: string;
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  telephone: string;
  zipcode: string;
  shippingFeeType: EShippingFeeType;
}

export enum EOrderStatus {
  'waiting_payment' = 'waiting_payment',
  'waiting_checking' = 'waiting_checking',
  'waiting_send' = 'waiting_send',
  'sent' = 'sent',
  'canceled' = 'canceled',
  'invalid_slip' = 'invalid_slip',
}

export enum EOrderStatus2 {
  // 'waiting_payment' = 'waiting_payment',
  'waiting_checking' = 'waiting_checking',
  'waiting_send' = 'waiting_send',
  'invalid_slip' = 'invalid_slip',
}

export interface IOrderItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  productOption: IProductOption;
  discount: number;
  total: number;
}

export enum ETrackingCompanyName {
  'Flash' = 'Flash',
  'J&T' = 'J&T',
  'Thailand-post' = 'Thailand-post',
  'DHL' = 'DHL',
  'KERRY' = 'KERRY',
}
