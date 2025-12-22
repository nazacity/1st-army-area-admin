import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  Button,
  Chip,
  Pagination,
  Paper,
  Typography,
} from '@mui/material';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { IProduct } from 'models/product.model';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useModalHook from 'utils/useModalHook';
import usePaginationHook from 'utils/usePaginationHook';
import {
  ProductFormDefaultValues,
  ProductFormDto,
  ProductFormSchema,
} from 'dto/product.dto';
import prouctServices from 'services/product.services';
import { FormProvider, useForm } from 'react-hook-form';
import { EFormType } from 'dto/form.dto';
import ProductModal from './ProductModal';
import BaseTable from 'components/basecomponents/basetable/BaseTable';
import BasePagination from 'components/basecomponents/baspagination/BasePagination';

interface IProps {}

const take = 10;

const ProductContainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const {
    open: productModalOpen,
    handleOpen: _HandleProductModalOpen,
    handleClose: _HandleProductModalClose,
  } = useModalHook();
  const { page, setPage, total, setTotal, loading, setLoading, data, setData } =
    usePaginationHook();

  const productForm = useForm<ProductFormDto>({
    defaultValues: ProductFormDefaultValues,
    resolver: ProductFormSchema(),
  });

  const { data: productData } = prouctServices.useQueryGetProducts({
    page,
    take,
  });

  useEffect(() => {
    if (productData) {
      setData(productData.data);
      setTotal(productData.meta.total);
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  }, [productData]);

  const columns: GridColDef<IProduct>[] = [
    {
      field: 'image',
      headerName: t('common:table.image'),
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <img
              src={params.row.thumbnailImageUrl}
              alt={params.row.name}
              style={{ width: 52, height: 52, borderRadius: 10 }}
            />
          </Box>
        );
      },
    },
    {
      field: 'SKU',
      headerName: t('common:table.SKU'),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: 'name',
      headerName: t('common:table.name'),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: 'description',
      headerName: t('common:table.description'),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: 'category',
      headerName: t('common:table.category'),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            {params.row.categories.map((item) => {
              return (
                <Chip
                  key={item.id}
                  label={item.name}
                  sx={{
                    bgcolor: `${item.color}aa`,
                    border: `1px solid ${item.color}`,
                    mr: 1,
                  }}
                />
              );
            })}
          </Box>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            productForm.reset({
              ...params.row,
              images: params.row.images.map((item) => item.imageUrl),
              categoriesId: params.row.categories.map((item) => item.id),
              type: EFormType.edit,
            });
            _HandleProductModalOpen();
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
        <Typography variant="h2">{t('common:products.product')}</Typography>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="contained"
          onClick={() => {
            productForm.setValue('type', EFormType.add);
            _HandleProductModalOpen();
          }}
        >
          {t('common:products.add_product')}
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
      <FormProvider {...productForm}>
        <ProductModal
          open={productModalOpen}
          handleClose={_HandleProductModalClose}
        />
      </FormProvider>
    </Paper>
  );
};

export default ProductContainer;
