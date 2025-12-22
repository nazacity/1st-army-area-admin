import BaseSnackbar from 'components/basecomponents/basesnackbar/BaseSnackbar';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { handleCloseSnackbar } from 'store/slices/layoutSlice';

const LayoutSnackbar = () => {
  const snackbar = useAppSelector((state) => state.layout.snackbar);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(handleCloseSnackbar());
  };
  return <BaseSnackbar {...snackbar} handleClose={handleClose} />;
};

export default LayoutSnackbar;
