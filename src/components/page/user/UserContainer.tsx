import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Paper, Typography } from '@mui/material';
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import usePaginationHook from 'utils/usePaginationHook';
import { useForm } from 'react-hook-form';
import BaseTable from 'components/basecomponents/basetable/BaseTable';
import BasePagination from 'components/basecomponents/baspagination/BasePagination';
import userServices from 'services/user.services';
import { IUser } from 'models/user.model';

interface IProps {}

const tableSize = 10;

const UserContainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();

  const { page, setPage, total, setTotal, loading, setLoading, data, setData } =
    usePaginationHook();

  const { watch } = useForm({
    defaultValues: {
      searchText: '',
    },
  });

  const { data: userData } = userServices.useQueryGetUsers({
    searchText: watch('searchText'),
    page,
    take: tableSize,
  });

  useEffect(() => {
    if (userData) {
      const addedIndex = userData.data.map((item, index) => {
        return { index, ...item };
      });
      setData(addedIndex);
      setTotal(userData.meta.total);
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  }, [userData]);

  const columns: GridColDef<IUser>[] = [
    {
      field: 'index',
      headerName: t('common:table.index'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<IUser>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography>
            {params.row.index
              ? (page - 1) * tableSize + params.row.index + 1
              : 1}
          </Typography>
        </Box>
      ),
      width: 60,
    },
    {
      field: 'profileImageUrl',
      headerName: t('common:table.image'),
      sortable: false,
      disableColumnMenu: true,
      width: 100,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <img
              src={params.row.profileImageUrl}
              alt={params.row.displayName}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
          </Box>
        );
      },
    },
    {
      field: 'name',
      headerName: t('common:table.name'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUser>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {`${params.row?.rank} ${params.row?.firstName} ${params.row?.lastName}`}
          </Typography>
        </Box>
      ),
      width: 180,
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        // <GridActionsCellItem
        //   icon={<EditIcon />}
        //   onClick={() => {
        //     _HandleProductModalOpen();
        //   }}
        //   label="Edit"
        // />,
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
        <Typography variant="h2">{t('common:customers.customer')}</Typography>
        <Box sx={{ flex: 1 }} />
      </Box>
      <Box sx={{ height: 110 + 52 * tableSize }}>
        <BaseTable
          rows={data}
          columns={columns}
          loading={loading}
          slots={{
            pagination: (props) => (
              <BasePagination
                page={page}
                count={Math.ceil(total / tableSize)}
                onChange={(e, page) => {
                  setLoading(true);
                  setPage(page);
                }}
              />
            ),
          }}
        />
      </Box>
    </Paper>
  );
};

export default UserContainer;
