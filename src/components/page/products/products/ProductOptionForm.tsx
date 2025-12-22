import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Button, Typography } from '@mui/material';
import { Controller, useFieldArray } from 'react-hook-form';
import BaseTextInput from 'components/basecomponents/baseinput/BaseTextInput';

interface IProps {
  item: any;
  index: number;
  control: any;
}

const ProductOptionForm: React.FC<IProps> = ({ item, index, control }) => {
  const { t } = useTranslation();
  const { fields, append } = useFieldArray({
    control,
    name: `productOptions.${index}.discounts`,
  });

  return (
    <Box key={item.id}>
      <Controller
        name={`productOptions.${index}.label`}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography
                sx={{
                  flex: 0.5,
                }}
              >
                {t('common:products.product_label')}
              </Typography>
              <BaseTextInput
                value={value}
                onChange={onChange}
                placeholder={t('common:products.product_label')}
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
          );
        }}
      />
      <Controller
        name={`productOptions.${index}.price`}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography
                sx={{
                  flex: 0.5,
                }}
              >
                {t('common:products.price')}
              </Typography>
              <BaseTextInput
                value={value}
                onChange={onChange}
                placeholder={t('common:products.price')}
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
          );
        }}
      />
      <Controller
        name={`productOptions.${index}.cost`}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography
                sx={{
                  flex: 0.5,
                }}
              >
                {t('common:products.cost')}
              </Typography>
              <BaseTextInput
                value={value}
                onChange={onChange}
                placeholder={t('common:products.cost')}
                size="small"
                sx={{ flex: 1 }}
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
              quantity: 1,
              discount: 0,
            });
          }}
        >
          {t('common:products.add_product_discount')}
        </Button>
      </Box>
      {fields.map((item, index2) => {
        return (
          <Box key={item.id}>
            <Controller
              name={`productOptions.${index}.discounts.${index2}.quantity`}
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        flex: 0.5,
                      }}
                    >
                      {t('common:products.quantity')}
                    </Typography>
                    <BaseTextInput
                      value={value}
                      onChange={onChange}
                      placeholder={t('common:products.quantity')}
                      size="small"
                      sx={{ flex: 1 }}
                    />
                  </Box>
                );
              }}
            />
            <Controller
              name={`productOptions.${index}.discounts.${index2}.discount`}
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        flex: 0.5,
                      }}
                    >
                      {t('common:products.discount')}
                    </Typography>
                    <BaseTextInput
                      value={value}
                      onChange={onChange}
                      placeholder={t('common:products.discount')}
                      size="small"
                      sx={{ flex: 1 }}
                    />
                  </Box>
                );
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ProductOptionForm;
