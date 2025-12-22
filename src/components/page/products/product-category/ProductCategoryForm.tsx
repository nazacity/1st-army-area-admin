import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { ProductCategoryFormDto } from 'dto/product-category.dto';
import BaseTextInput from 'components/basecomponents/baseinput/BaseTextInput';
import { COLORS } from 'theme';
import UploadImage from 'components/basecomponents/baseuploadimage/UploadImage';

interface IProps {}

const ProductCategoryForm: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
  } = useFormContext<ProductCategoryFormDto>();

  return (
    <Box>
      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography
                sx={{
                  flex: 0.5,
                  color: errors.name ? COLORS.red[5] : COLORS.text.primary,
                }}
              >
                {t('common:products.category_name')}
              </Typography>
              <BaseTextInput
                value={value}
                onChange={onChange}
                placeholder={t('common:products.category_name')}
                size="small"
                error={!!errors.name}
                sx={{ flex: 1 }}
              />
            </Box>
          );
        }}
      />
      <Controller
        name="thumbnailImageUrl"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography
                sx={{
                  flex: 0.5,
                  color: errors.name ? COLORS.red[5] : COLORS.text.primary,
                }}
              >
                {t('common:products.product_thumbnail_image_url')}
              </Typography>
              <Box sx={{ flex: 1 }}>
                <UploadImage
                  value={value}
                  onChange={onChange}
                  width={300}
                  aspectRatio="1/1"
                />
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default ProductCategoryForm;
