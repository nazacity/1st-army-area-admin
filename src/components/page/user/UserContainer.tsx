import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from '@mui/material';
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridSearchIcon,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import usePaginationHook from 'utils/usePaginationHook';
import { Controller, useForm } from 'react-hook-form';
import BaseTable from 'components/basecomponents/basetable/BaseTable';
import BasePagination from 'components/basecomponents/baspagination/BasePagination';
import userServices from 'services/user.services';
import { IUser } from 'models/user.model';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { AlertConfirm } from 'utils/Alert';
import BaseTextInput from 'components/basecomponents/baseinput/BaseTextInput';
import CloseIcon from '@mui/icons-material/Close';
import { PhotoProvider, PhotoView } from 'react-photo-view';

interface IProps {}

const tableSize = 30;

const UserContainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { page, setPage, total, setTotal, loading, setLoading, data, setData } =
    usePaginationHook<IUser>();

  const { watch, control } = useForm({
    defaultValues: {
      searchText: '',
    },
  });

  const { data: userData, refetch: refetchUserData } =
    userServices.useQueryGetUsers({
      searchText: watch('searchText'),
      page,
      take: tableSize,
    });

  useEffect(() => {
    if (userData) {
      const addedIndex = userData.data.map((item, index) => {
        return { ...item, index };
      });
      setData(addedIndex);
      setTotal(userData.meta.total);
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  }, [userData]);

  const { mutate: deleteUser } = userServices.useMutationDeleteUser(() => {
    queryClient.invalidateQueries({
      queryKey: ['get-users'],
      refetchType: 'all',
    });
  });

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
            {(page - 1) * tableSize + params.row.index + 1}
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
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <PhotoProvider>
              <PhotoView src={params.row.profileImageUrl}>
                <Avatar
                  src={params.row.profileImageUrl}
                  alt={params.row.displayName}
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                />
              </PhotoView>
            </PhotoProvider>
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
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'createdAt',
      headerName: t('common:table.created_at'),
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
            {dayjs(params.row.createdAt).format('DD MMM BBBB')}
          </Typography>
        </Box>
      ),
      width: 180,
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={async () => {
            const confirm = await AlertConfirm('ลบผู้ใช้งาน');
            if (confirm) deleteUser({ userId: params.row.id });
          }}
          label="Delete"
        />,
      ],
    },
  ];

  return (
    <Paper sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Typography variant="h2">{t('common:user.user')}</Typography>
        <Box sx={{ flex: 1 }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: { xs: 0, md: 2 },
          py: 2,
        }}
      >
        <Controller
          name="searchText"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <BaseTextInput
                value={value}
                onChange={onChange}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton onClick={() => refetchUserData()}>
                      <GridSearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                {...(value.length > 0 && {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          onChange('');
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                })}
                sx={{ width: '100%' }}
                placeholder={t('common:user.search_user_placeholder')}
              />
            );
          }}
        />
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
          onRowClick={(params) => {
            router.push(`user/${params.row.id}`);
          }}
        />
      </Box>
    </Paper>
  );
};

export default UserContainer;
