import React from 'react';
import { Box } from '@mui/system';
import SideBar from '../navbar/SideBar';
import { useAppSelector } from 'store';

interface IProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<IProps> = ({ children }) => {
  const sideBarOpen = useAppSelector((state) => state.layout.sideBarOpen);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <SideBar />
      <Box
        sx={{
          width: sideBarOpen ? 'calc(100vw - 240px)' : 'calc(100vw - 56px)',
          position: 'relative',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageContainer;
