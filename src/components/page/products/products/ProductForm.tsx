import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { ProductFormDto } from 'dto/product.dto';
import BaseTextInput from 'components/basecomponents/baseinput/BaseTextInput';
import { COLORS } from 'theme';
import prouctCategoryServices from 'services/product-category.services';
import ProductOptionForm from './ProductOptionForm';
import UploadImage from 'components/basecomponents/baseuploadimage/UploadImage';
import UploadArrayImage from 'components/basecomponents/baseuploadimage/UploadArrayImage';
import { EProductSize } from 'models/product.model';

interface IProps {}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProductForm: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const [categoryOptions, setCategoryOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormDto>();

  const { fields, append } = useFieldArray({ control, name: 'productOptions' });

  const { data: categoryData } =
    prouctCategoryServices.useQueryGetProductCategories({
      page: 1,
      take: -1,
    });

  useEffect(() => {
    if (categoryData) {
      setCategoryOptions(
        categoryData.data.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      );
    }
  }, [categoryData]);

  return (
    <Box>
      <Controller
        name="categoriesId"
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
                {t('common:products.category')}
              </Typography>
              <FormControl sx={{ flex: 1 }}>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={value}
                  onChange={(event: SelectChangeEvent<string[]>) => {
                    const {
                      target: { value },
                    } = event;
                    onChange(
                      typeof value === 'string' ? value.split(',') : value
                    );
                  }}
                  size="small"
                  renderValue={(selected) => {
                    const selectedCategory = selected.map((item) => {
                      return categoryData?.data.find((i) => i.id === item);
                    });
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedCategory.map((value) => (
                          <Chip
                            key={value?.id}
                            label={value?.name}
                            sx={{
                              bgcolor: `${value?.color}aa`,
                              border: `1px solid ${value?.color}`,
                            }}
                          />
                        ))}
                      </Box>
                    );
                  }}
                  MenuProps={MenuProps}
                >
                  {categoryOptions.map((item) => (
                    <MenuItem key={item.label} value={item.value}>
                      <Checkbox checked={value.indexOf(item.value) > -1} />
                      <ListItemText primary={item.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
      <Controller
        name="images"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  color: errors.name ? COLORS.red[5] : COLORS.text.primary,
                }}
              >
                {t('common:products.image')}
              </Typography>
              <UploadArrayImage
                value={value}
                onChange={(url) => {
                  onChange([...value, url]);
                }}
                width={300}
                aspectRatio="1/1"
              />
            </Box>
          );
        }}
      />
      <Controller
        name="SKU"
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
                {t('common:products.SKU')}
              </Typography>
              <BaseTextInput
                value={value}
                onChange={onChange}
                placeholder={t('common:products.SKU')}
                size="small"
                error={!!errors.name}
                sx={{ flex: 1 }}
              />
            </Box>
          );
        }}
      />
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
                {t('common:products.product_name')}
              </Typography>
              <BaseTextInput
                value={value}
                onChange={onChange}
                placeholder={t('common:products.product_name')}
                size="small"
                error={!!errors.name}
                sx={{ flex: 1 }}
              />
            </Box>
          );
        }}
      />
      <Controller
        name="from"
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
                {t('common:products.from')}
              </Typography>
              <BaseTextInput
                value={value}
                onChange={onChange}
                placeholder={t('common:products.from')}
                size="small"
                error={!!errors.name}
                sx={{ flex: 1 }}
              />
            </Box>
          );
        }}
      />
      <Controller
        name="size"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography
                sx={{
                  flex: 0.5,
                  color: errors.size ? COLORS.red[5] : COLORS.text.primary,
                }}
              >
                {t('common:products.size')}
              </Typography>
              <FormControl sx={{ flex: 1 }} fullWidth size="small">
                <Select value={value} onChange={onChange}>
                  {Object.values(EProductSize).map((item) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          );
        }}
      />
      <Controller
        name="description"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <Typography
                sx={{
                  flex: 0.5,
                  color: errors.name ? COLORS.red[5] : COLORS.text.primary,
                }}
              >
                {t('common:products.description')}
              </Typography>
              <BaseTextInput
                value={value}
                onChange={onChange}
                placeholder={t('common:products.description')}
                size="small"
                error={!!errors.name}
                sx={{ flex: 1 }}
                multiline
                rows={3}
              />
            </Box>
          );
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button
          variant="outlined"
          onClick={() => {
            append({
              label: '',
              price: 0,
              cost: 0,
              discounts: [
                {
                  quantity: 1,
                  discount: 0,
                },
              ],
            });
          }}
        >
          {t('common:products.add_product_label')}
        </Button>
      </Box>
      {fields.map((item, index) => {
        return (
          <ProductOptionForm
            key={item.id}
            item={item}
            index={index}
            control={control}
          />
        );
      })}
    </Box>
  );
};

export default ProductForm;
