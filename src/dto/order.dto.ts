import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useTranslation from 'next-translate/useTranslation';
import dayjs from 'dayjs';
import { EOrderStatus } from 'models/order.model';

export enum EOrderStatusSearch {
  'waiting_payment' = 'waiting_payment',
  'waiting_checking' = 'waiting_checking',
  'waiting_send' = 'waiting_send',
  'sent' = 'sent',
  'canceled' = 'canceled',
  'invalid_slip' = 'invalid_slip',
  'all' = '',
}

export interface OrderSearchFormDto {
  orderNo: string;
  status: EOrderStatusSearch;
  from: Date;
  to: Date;
}

export const OrderSearchFormDefaultValues: OrderSearchFormDto = {
  orderNo: '',
  status: EOrderStatusSearch.all,
  from: dayjs().startOf('M').toDate(),
  to: dayjs().endOf('M').toDate(),
};

export interface OrderUpdateShippingInfoFormDto {
  id: string;
  trackingNo: string;
  trackingCompanyName: string;
  shippingFee: number;
}

export const OrderUpdateShippingInfoFormDefaultValues: OrderUpdateShippingInfoFormDto =
  {
    id: '',
    trackingNo: '',
    trackingCompanyName: '',
    shippingFee: 0,
  };

export const OrderUpdateShippingInfoFormSchema = () => {
  const { t } = useTranslation();
  return yupResolver(
    yup.object().shape({
      id: yup.string().required(),
      trackingNo: yup.string().defined(),
      trackingCompanyName: yup.string().defined(),
      shippingFee: yup.number().defined(),
    })
  );
};

export interface OrderUpdateStatusFormDto {
  id: string;
  status: EOrderStatus;
}

export const OrderUpdateStatusFormDefaultValues: OrderUpdateStatusFormDto = {
  id: '',
  status: EOrderStatus.waiting_checking,
};

export const OrderUpdateStatusFormSchema = () => {
  const { t } = useTranslation();
  return yupResolver(
    yup.object().shape({
      id: yup.string().required(),
      status: yup
        .mixed<EOrderStatus>()
        .oneOf(Object.values(EOrderStatus))
        .required(),
    })
  );
};
