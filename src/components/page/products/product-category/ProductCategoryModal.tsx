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
import ProductCategoryForm from './ProductCategoryForm';
import { useFormContext } from 'react-hook-form';
import {
  ProductCategoryFormDefaultValues,
  ProductCategoryFormDto,
} from 'dto/product-category.dto';
import prouctCategoryServices from 'services/product-category.services';
import { useQueryClient } from '@tanstack/react-query';
import { handleShowSnackbar } from 'store/slices/layoutSlice';
import { useAppDispatch } from 'store';
import LoadingButton from '@mui/lab/LoadingButton';

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const ProductCategoryModal: React.FC<IProps> = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const { watch, handleSubmit, reset } =
    useFormContext<ProductCategoryFormDto>();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const _HandleClose = () => {
    queryClient.invalidateQueries({
      queryKey: ['get-product-categories'],
      refetchType: 'all',
    });
    reset(ProductCategoryFormDefaultValues);
    handleClose();
    setLoading(false);
  };

  const { mutate: createProductCategory } =
    prouctCategoryServices.useMutationCreateProductCategory(
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

  const { mutate: updateProductCategory } =
    prouctCategoryServices.useMutationUpdateProductCategory(
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
    if (watch('type') === EFormType.add) {
      createProductCategory(data);
    } else if (watch('type') === EFormType.edit) {
      updateProductCategory({
        id: watch('id'),
        data,
      });
    }
  });

  return (
    <Dialog onClose={_HandleClose} open={open} fullWidth maxWidth="md">
      <DialogTitle variant="h2">
        {watch('type') === EFormType.add && t('common:common.add')}
        {watch('type') === EFormType.edit && t('common:common.edit')}
        {t('common:products.category')}
      </DialogTitle>
      <DialogContent>
        <ProductCategoryForm />
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

export default ProductCategoryModal;
