import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { AuthGuardRedirect } from 'utils/authGuard';
import { GetServerSideProps } from 'next';
import { IUser } from 'models/admin.model';
import { setUser } from 'store/slices/userSlice';
import HistoryCotainer from 'components/page/history/HistoryCotainer';
import { useAppDispatch } from 'store';

interface IProps {
  user: IUser;
}

const HistoryPage: React.FC<IProps> = ({ user }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      <HistoryCotainer />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return AuthGuardRedirect(ctx);
};

export default HistoryPage;
