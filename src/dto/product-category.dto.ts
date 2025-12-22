import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useTranslation from 'next-translate/useTranslation';
import { EFormType } from './form.dto';

export interface ProductCategoryFormDto {
  id: string;
  name: string;
  color: string;
  thumbnailImageUrl: string;
  type: EFormType;
}

export const ProductCategoryFormDefaultValues = {
  id: '',
  name: '',
  color: '',
  thumbnailImageUrl: '',
  type: EFormType.add,
};

export const ProductCategoryFormSchema = () => {
  const { t } = useTranslation();
  return yupResolver(
    yup.object().shape({
      id: yup.string().defined(),
      name: yup.string().required(),
      color: yup.string().defined(),
      thumbnailImageUrl: yup.string().defined(),
      type: yup.mixed<EFormType>().oneOf(Object.values(EFormType)).defined(),
    })
  );
};
