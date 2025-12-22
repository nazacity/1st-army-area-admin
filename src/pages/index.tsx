import * as React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Box from '@mui/material/Box';
import LoginForm from 'components/form/LoginForm';
import { AuthGuardRedirectToDashboard } from 'utils/authGuard';

const AuthorizePage: NextPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <img src="/logo/logo.png" style={{ width: 'auto', height: 150 }} />
      <LoginForm />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return AuthGuardRedirectToDashboard(ctx);
};

export default AuthorizePage;
