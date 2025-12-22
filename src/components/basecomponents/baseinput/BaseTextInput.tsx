import React from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  Theme,
} from '@mui/material';
import BaseToolTip from '../basetooltip/BaseToolTip';
import { SxProps } from '@mui/system';
import { COLORS } from 'theme';

interface IProps extends OutlinedInputProps {
  label?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string | number;
  error?: boolean;
  message?: string;
  sx?: SxProps<Theme>;
  outlinedInputSx?: SxProps<Theme>;
  size?: 'medium' | 'small';
  fullWidth?: boolean;
}

const BaseTextInput: React.FC<IProps> = ({
  label,
  onChange,
  value,
  error,
  message,
  sx,
  size,
  fullWidth,
  outlinedInputSx,
  ...props
}) => {
  return (
    <BaseToolTip open={error} title={message ? message : ''} arrow>
      <FormControl variant="outlined" sx={sx} size={size} fullWidth={fullWidth}>
        <InputLabel htmlFor="outlined" color="primary" error={error} shrink>
          {label}
        </InputLabel>
        <OutlinedInput
          onChange={onChange}
          value={value}
          label={label}
          color="primary"
          error={error}
          sx={{
            backgroundColor: COLORS.white,
            ...outlinedInputSx,
          }}
          fullWidth={fullWidth}
          {...props}
          autoComplete="new-password"
        />
      </FormControl>
    </BaseToolTip>
  );
};

export default BaseTextInput;
