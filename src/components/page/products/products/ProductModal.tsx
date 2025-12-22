import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { EFormType } from 'dto/form.dto';
import { useFormContext } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { handleShowSnackbar } from 'store/slices/layoutSlice';
import { useAppDispatch } from 'store';
import ProductForm from './ProductForm';
import prouctServices from 'services/product.services';
import { ProductFormDefaultValues, ProductFormDto } from 'dto/product.dto';
import LoadingButton from '@mui/lab/LoadingButton';

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const ProductModal: React.FC<IProps> = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const { watch, handleSubmit, reset } = useFormContext<ProductFormDto>();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const _HandleClose = () => {
    queryClient.invalidateQueries({
      queryKey: ['get-products'],
      refetchType: 'all',
    });
    reset(ProductFormDefaultValues);
    handleClose();
    setLoading(false);
  };

  const { mutate: createProduct } = prouctServices.useMutationCreateProduct(
    (data) => {
      _HandleClose();
    },
    (error) => {
      dispatch(
        handleShowSnackbar({
          open: true,
          severity: 'error',
          message: t(`errors:please_try_again`),
        })
      );
      setLoading(false);
    }
  );

  const { mutate: updateProduct } = prouctServices.useMutationUpdateProduct(
    (data) => {
      _HandleClose();
    },
    (error) => {
      dispatch(
        handleShowSnackbar({
          open: true,
          severity: 'error',
          message: t(`errors:please_try_again`),
        })
      );
      setLoading(false);
    }
  );

  const _OnSave = handleSubmit((data) => {
    setLoading(true);
    const productOptions = data.productOptions.map((item, index) => {
      return { ...item, index };
    });
    if (watch('type') === EFormType.add) {
      createProduct({ ...data, productOptions });
    } else if (watch('type') === EFormType.edit) {
      updateProduct({
        id: watch('id'),
        data: { ...data, productOptions },
      });
    }
  });

  return (
    <Dialog onClose={_HandleClose} open={open} fullWidth maxWidth="md">
      <DialogTitle variant="h2">
        {watch('type') === EFormType.add && t('common:common.add')}
        {watch('type') === EFormType.edit && t('common:common.edit')}
        {t('common:products.product')}
      </DialogTitle>
      <DialogContent>
        <ProductForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={_HandleClose}>{t('common:common.cancel')}</Button>
        <LoadingButton variant="contained" onClick={_OnSave} loading={loading}>
          {t('common:common.save')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
