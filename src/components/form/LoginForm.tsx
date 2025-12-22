import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box } from '@mui/system';
import { COLORS } from 'theme';
import { Controller, useForm } from 'react-hook-form';
import BaseTextInput from 'components/basecomponents/baseinput/BaseTextInput';
import { IconButton, InputAdornment, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import authServices from 'services/auth.services';
import { SigInSchema, SignInDefaultValues } from 'dto/auth.dto';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate: signin, isPending: signinLoading } =
    authServices.useMutationSignin(
      (data) => {
        dispatch(setUser(data.user));
        router.push('/home');
      },
      (error) => {}
    );

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: SignInDefaultValues,
    resolver: SigInSchema(),
  });

  const _HandleSubmit = handleSubmit((data) => {
    signin(data);
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Controller
        name="username"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                color: errors.username ? COLORS.red[5] : COLORS.text.primary,
              }}
            >
              {t('common:auth.username')}
            </Typography>
            <BaseTextInput
              value={value}
              onChange={onChange}
              fullWidth
              size="small"
              error={errors.username ? true : false}
            />
          </Box>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                color: errors.password ? COLORS.red[5] : COLORS.text.primary,
              }}
            >
              {t('common:auth.password')}
            </Typography>
            <BaseTextInput
              value={value}
              onChange={onChange}
              fullWidth
              size="small"
              error={errors.password ? true : false}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        )}
      />
      <LoadingButton
        variant="contained"
        sx={{
          borderRadius: 1,
          width: '100%',
          color: COLORS.white,
        }}
        onClick={_HandleSubmit}
        loading={signinLoading}
      >
        {t('common:auth.sign_in')}
      </LoadingButton>
    </Box>
  );
};

export default LoginForm;
