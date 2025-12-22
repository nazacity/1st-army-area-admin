import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useTranslation from 'next-translate/useTranslation';

export interface SignInDto {
  username: string;
  password: string;
}

export const SignInDefaultValues: SignInDto = {
  username: '',
  password: '',
};

export const SigInSchema = () => {
  const { t } = useTranslation();
  return yupResolver(
    yup.object().shape({
      username: yup.string(),
      password: yup.string(),
    })
  );
};
