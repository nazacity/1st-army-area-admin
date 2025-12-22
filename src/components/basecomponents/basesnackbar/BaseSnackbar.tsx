import { Alert, Snackbar } from '@mui/material';
import React from 'react';

export interface ISnackBarProps {
  open: boolean;
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export interface IProps extends ISnackBarProps {
  handleClose: () => void;
}

const BaseSnackbar: React.FC<IProps> = ({
  open,
  severity,
  message,
  handleClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default BaseSnackbar;
