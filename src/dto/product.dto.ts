import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { EProductSize, EProductStatus } from 'models/product.model';
import useTranslation from 'next-translate/useTranslation';
import { EFormType } from './form.dto';

export interface ProductFormDto {
  id: string;
  thumbnailImageUrl: string;
  images: string[];
  SKU: string;
  from: string;
  size: EProductSize;
  name: string;
  description: string;
  productOptions: ProductOptionDto[];
  categoriesId: string[];
  status: EProductStatus;
  type: EFormType;
}

export interface ProductOptionDto {
  label: string;
  price: number;
  cost: number;
  discounts: ProductOptionDiscountDto[];
}

export interface ProductOptionDiscountDto {
  quantity: number;
  discount: number;
}

export const ProductFormDefaultValues: ProductFormDto = {
  id: '',
  thumbnailImageUrl: '',
  images: [],
  SKU: '',
  from: '',
  size: EProductSize.ขนาดปกติ,
  name: '',
  description: '',
  productOptions: [
    {
      label: '',
      price: 0,
      cost: 0,
      discounts: [],
    },
  ],
  categoriesId: [],
  status: EProductStatus.available,
  type: EFormType.add,
};

export const ProductFormSchema = () => {
  const { t } = useTranslation();
  return yupResolver(
    yup.object().shape({
      id: yup.string().defined(),
      thumbnailImageUrl: yup.string().required(),
      images: yup.array(yup.string().required()).defined(),
      SKU: yup.string().defined(),
      from: yup.string().defined(),
      size: yup
        .mixed<EProductSize>()
        .oneOf(Object.values(EProductSize))
        .defined(),
      name: yup.string().required(),
      description: yup.string().defined(),
      productOptions: yup
        .array(
          yup.object().shape({
            label: yup.string().required(),
            price: yup.number().required(),
            cost: yup.number().required(),
            discounts: yup
              .array(
                yup.object().shape({
                  quantity: yup.number().required(),
                  discount: yup.number().required(),
                })
              )
              .defined(),
          })
        )
        .defined(),
      categoriesId: yup.array(yup.string().required()).defined(),
      status: yup
        .mixed<EProductStatus>()
        .oneOf(Object.values(EProductStatus))
        .defined(),
      type: yup.mixed<EFormType>().oneOf(Object.values(EFormType)).defined(),
    })
  );
};
