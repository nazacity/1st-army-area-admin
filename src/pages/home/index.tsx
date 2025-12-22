import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box } from '@mui/material';
import { AuthGuardRedirect } from 'utils/authGuard';
import { GetServerSideProps } from 'next';
import { IUser } from 'models/admin.model';
import { setUser } from 'store/slices/userSlice';
import { useAppDispatch } from 'store';

interface IProps {
  user: IUser;
}

const HomePage: React.FC<IProps> = ({ user }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
      }}
    ></Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return AuthGuardRedirect(ctx);
};

export default HomePage;
