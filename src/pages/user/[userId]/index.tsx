import React from 'react';
import UserIdContainer from 'components/page/useridpage/UserIdContainer';
import { Box } from '@mui/material';

interface IProps {}

const UserIdPage: React.FC<IProps> = ({}) => {
  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      <UserIdContainer />
    </Box>
  );
};

export default UserIdPage;
