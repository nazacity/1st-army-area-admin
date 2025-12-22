import { useMutation } from '@tanstack/react-query';
import { SignInDto } from 'dto/auth.dto';
import { IAuth } from 'models/auth.model';
import { deleteCookie, setCookie } from 'cookies-next';
import request from 'utils/request';

const authServices = {
  useMutationSignin(
    onSuccess: (data: IAuth) => void,
    onError: (error: any) => void
  ) {
    return useMutation<IAuth, Error, SignInDto>({
      mutationFn: async ({ username, password }: SignInDto) => {
        try {
          const res = await request.post('/auth/admin/sign-in', {
            username,
            password,
          });

          signinHelper(res.data.data);

          return res.data.data;
        } catch (error) {
          throw error.response.data.message;
        }
      },
      onSuccess,
      onError,
    });
  },
  useMutationSignout(
    onSuccess: (data: boolean) => void,
    onError: (error: any) => void
  ) {
    return useMutation<boolean, Error>({
      mutationFn: async () => {
        try {
          //   const res = await request.post('/auth/clinic-administor/sign-in', {
          //     username,
          //     password,
          //   });

          await signoutHelper();

          return true;
        } catch (error) {
          throw error.response.data.message;
        }
      },
      onSuccess,
      onError,
    });
  },
};

export const signinHelper = async (data: IAuth) => {
  setCookie('accessToken', data.token.accessToken);
};

export const signoutHelper = async () => {
  deleteCookie('accessToken');
};

export default authServices;
