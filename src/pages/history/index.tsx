import React from 'react';
import { Box } from '@mui/material';
import { AuthGuardRedirect } from 'utils/authGuard';
import { GetServerSideProps } from 'next';
import HistoryContainer from 'components/page/history/HistoryContainer';

interface IProps {}

const HistoryPage: React.FC<IProps> = () => {
  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      <HistoryContainer />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return AuthGuardRedirect(ctx);
};

export default HistoryPage;
