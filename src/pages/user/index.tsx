import React from 'react';
import { GetServerSideProps } from 'next';
import { AuthGuardRedirect } from 'utils/authGuard';
import { Box } from '@mui/material';
import { IUser } from 'models/admin.model';
import UserContainer from 'components/page/user/UserContainer';

interface IProps {
  user: IUser;
}

const UserPage: React.FC<IProps> = ({ user }) => {
  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      <UserContainer />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return AuthGuardRedirect(ctx);
};

export default UserPage;
