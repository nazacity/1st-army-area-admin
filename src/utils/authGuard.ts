import { ClinicAdministorPermissionSectionName } from 'models/permission.model';
import { IUser } from 'models/admin.model';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import request from './request';

const verifyUser = async (accessToken: string) => {
  try {
    const res = await request.get('/admin/info', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const revokeToken = async (ctx: any) => {
  try {
    return true;
  } catch (error) {
    return false;
  }
};

export const AuthGuardRedirect = async (ctx: GetServerSidePropsContext) => {
  const accessToken = ctx.req.cookies.accessToken;

  if (accessToken) {
    try {
      const user: IUser = await verifyUser(accessToken);

      if (user) {
        return {
          props: { user },
        };
      }

      return {
        redirect: {
          permanent: false,
          destination: '/home',
        },
        props: {},
      };
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
        props: {},
      };
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
    props: {},
  };
};

export const AuthGuardRedirectToDashboard: GetServerSideProps = async (ctx) => {
  const accessToken = ctx.req.cookies.accessToken;

  if (accessToken) {
    try {
      const user = await verifyUser(accessToken);

      if (user) {
        return {
          redirect: {
            permanent: false,
            destination: '/home',
          },
          props: {},
        };
      }
    } catch (error) {
      return {
        props: {},
      };
    }
  }

  return {
    props: {},
  };
};
