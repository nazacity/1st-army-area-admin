import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Button, Paper, Typography } from '@mui/material';
import useModalHook from 'utils/useModalHook';
import ProductCategoryModal from './ProductCategoryModal';
import { FormProvider, useForm } from 'react-hook-form';
import {
  ProductCategoryFormDefaultValues,
  ProductCategoryFormDto,
  ProductCategoryFormSchema,
} from 'dto/product-category.dto';
import { EFormType } from 'dto/form.dto';
import prouctCategoryServices from 'services/product-category.services';
import usePaginationHook from 'utils/usePaginationHook';
import BaseTable from 'components/basecomponents/basetable/BaseTable';
import BasePagination from 'components/basecomponents/baspagination/BasePagination';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { IProductCategory } from 'models/product.model';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {}

const take = 10;

const ProductCategoryContainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const {
    open: productCategoryModalOpen,
    handleOpen: _HandleProductCategoryModalOpen,
    handleClose: _HandleProductCategoryModalClose,
  } = useModalHook();
  const { page, setPage, total, setTotal, loading, setLoading, data, setData } =
    usePaginationHook();

  const productCategoryForm = useForm<ProductCategoryFormDto>({
    defaultValues: ProductCategoryFormDefaultValues,
    resolver: ProductCategoryFormSchema(),
  });

  const { data: categoryData } =
    prouctCategoryServices.useQueryGetProductCategories({
      page,
      take,
    });

  useEffect(() => {
    if (categoryData) {
      setData(categoryData.data);
      setTotal(categoryData.meta.total);
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  }, [categoryData]);

  const columns: GridColDef<IProductCategory>[] = [
    {
      field: 'name',
      headerName: t('common:table.name'),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: 'product.quanlity',
      headerName: t('common:table.product_amount'),
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <>{params.row.products.length}</>,
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            productCategoryForm.reset({
              ...params.row,
              type: EFormType.edit,
            });
            _HandleProductCategoryModalOpen();
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => {}}
          label="Delete"
        />,
      ],
    },
  ];

  return (
    <Paper sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Typography variant="h2">
          {t('common:products.product_category')}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="contained"
          onClick={() => {
            productCategoryForm.setValue('type', EFormType.add);
            _HandleProductCategoryModalOpen();
          }}
        >
          {t('common:products.add_category')}
        </Button>
      </Box>
      <Box sx={{ height: 110 + 52 * take }}>
        <BaseTable
          rows={data}
          columns={columns}
          loading={loading}
          slots={{
            pagination: (props) => (
              <BasePagination
                page={page}
                count={Math.ceil(total / take)}
                onChange={(e, page) => {
                  setLoading(true);
                  setPage(page);
                }}
              />
            ),
          }}
        />
      </Box>
      <FormProvider {...productCategoryForm}>
        <ProductCategoryModal
          open={productCategoryModalOpen}
          handleClose={_HandleProductCategoryModalClose}
        />
      </FormProvider>
    </Paper>
  );
};

export default ProductCategoryContainer;
