import { useState } from 'react';

const useModalHook: (option?: {
  insideHandleOpen?: (data?: any) => void;
  insideHandleClose?: (data?: any) => void;
}) => {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
} = (option) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    if (option?.insideHandleOpen) {
      option.insideHandleOpen();
    }
    setOpen(true);
  };

  const handleClose = () => {
    if (option?.insideHandleClose) {
      option.insideHandleClose();
    }
    setOpen(false);
  };

  return { open, handleOpen, handleClose };
};

export default useModalHook;
