import React from 'react';
import { styled } from '@mui/material/styles';
import { Tooltip, TooltipProps, tooltipClasses } from '@mui/material';

const BaseToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    arrow
    classes={{ popper: className }}
    placement="bottom-end"
    {...props}
  />
))(({ theme }) => {
  return {
    whiteSpace: 'pre-wrap',
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.primary.main,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 2,
    },
  };
});

export default BaseToolTip;
