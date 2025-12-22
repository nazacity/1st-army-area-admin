import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useTranslation from 'next-translate/useTranslation';
import { EBannerType } from 'models/banner.model';
import { EFormType } from './form.dto';

export interface BannerFormDto {
  id: string;
  imageUrl: string;
  title: string;
  type: EBannerType;
  active: boolean;
  formType: EFormType;
}

export const BannerFormDefaultValues: BannerFormDto = {
  id: '',
  imageUrl: '',
  title: '',
  type: EBannerType.home,
  active: true,
  formType: EFormType.add,
};

export const BannerFormSchema = () => {
  const { t } = useTranslation();
  return yupResolver(
    yup.object().shape({
      id: yup.string().defined(),
      imageUrl: yup.string().required(),
      title: yup.string().defined(),
      type: yup
        .mixed<EBannerType>()
        .oneOf(Object.values(EBannerType))
        .required(),
      active: yup.boolean().defined(),
      formType: yup
        .mixed<EFormType>()
        .oneOf(Object.values(EFormType))
        .defined(),
    })
  );
};
