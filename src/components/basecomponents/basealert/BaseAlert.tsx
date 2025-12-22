import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { COLORS } from 'theme';

interface IProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  description?: string;
  icon: React.ReactNode;
  buttonLabel?: string;
}

const BaseAlert: React.FC<IProps> = ({
  open,
  handleClose,
  title,
  description,
  icon,
  buttonLabel,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} maxWidth="sm" fullWidth sx={{ zIndex: 1000000 }}>
      <Box
        sx={{
          bgcolor: COLORS.white,
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
        }}
      >
        {icon}
        <Box sx={{ my: 2 }}>
          <Typography variant="h3" align="center">
            {title}
          </Typography>
          {description && <Typography align="center">{description}</Typography>}
        </Box>
        <Button variant="contained" onClick={handleClose} sx={{ width: 200 }}>
          {buttonLabel ? t(`${buttonLabel}`) : t('common:common.close')}
        </Button>
      </Box>
    </Dialog>
  );
};

export default BaseAlert;
