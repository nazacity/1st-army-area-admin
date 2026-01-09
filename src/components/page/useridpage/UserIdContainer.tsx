import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import userServices from 'services/user.services';
import { useRouter } from 'next/router';
import usePaginationHook from 'utils/usePaginationHook';
import { useForm } from 'react-hook-form';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import BaseTable from 'components/basecomponents/basetable/BaseTable';
import BasePagination from 'components/basecomponents/baspagination/BasePagination';
import { EUserScoreHistoryStatus, IUserScoreHistory } from 'models/user.model';
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { RiFilePaper2Fill } from 'react-icons/ri';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { AlertConfirm } from 'utils/Alert';
import { useQueryClient } from '@tanstack/react-query';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import historyServices from 'services/history.services';

interface IProps {}

const tableSize = 30;

const UserIdContainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { page, setPage, total, setTotal, loading, setLoading, data, setData } =
    usePaginationHook<IUserScoreHistory>();

  const { watch } = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
    },
  });

  const { data: historyData } =
    userServices.useQueryGetUserScoreHistoriesByUserId({
      userId: router.query.userId as string,
      page,
      take: tableSize,
      startDate: watch('startDate'),
      endDate: watch('endDate'),
    });

  useEffect(() => {
    if (historyData) {
      const addedIndex = historyData.data.map((item, index) => {
        return { ...item, index };
      });
      setData(addedIndex);
      setTotal(historyData.meta.total);
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  }, [historyData]);

  const { mutate: updateUserScoreHistoryById } =
    historyServices.useMutationUpdateUserScoreHistoryById(
      () => {
        queryClient.invalidateQueries({
          queryKey: ['get-user-score-histories-by-user-id'],
          refetchType: 'all',
        });
      },
      () => {}
    );

  const columns: GridColDef<IUserScoreHistory>[] = [
    {
      field: 'index',
      headerName: t('common:table.index'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
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
      field: 'createdAt2',
      headerName: t('common:table.createdAt2'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {dayjs(params.row.createdAt).format('DD MMM BB เวลา HH:mm น.')}
          </Typography>
        </Box>
      ),
      width: 180,
    },
    {
      field: 'image',
      headerName: t('common:table.record_image'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <PhotoProvider>
            <PhotoView src={params.row.imageUrl}>
              <Avatar
                src={params.row.imageUrl}
                style={{ width: 40, height: 40, borderRadius: 0 }}
              >
                <RiFilePaper2Fill />
              </Avatar>
            </PhotoView>
          </PhotoProvider>
        </Box>
      ),
      width: 100,
    },
    {
      field: 'distance',
      headerName: t('common:table.distance'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {numeral(params.row.distance).format('0,0.0')}
          </Typography>
        </Box>
      ),
      width: 140,
    },
    {
      field: 'time',
      headerName: t('common:table.time'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {numeral(Math.floor(params.row.time / 60)).format('0,0') + ' ชม. '}
            {numeral(params.row.time % 60).format('0') + ' นาที'}
          </Typography>
        </Box>
      ),
      width: 100,
    },
    {
      field: 'stauts',
      headerName: t('common:table.status'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {t(`common:history.status.${params.row.status}`)}
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
          icon={<CheckIcon />}
          onClick={async () => {
            const confirm = await AlertConfirm('อนุมัติรายการ');
            if (confirm)
              updateUserScoreHistoryById({
                id: params.row.id,
                status: EUserScoreHistoryStatus.approved,
              });
          }}
          label="อนุมัติ"
        />,
        <GridActionsCellItem
          icon={<CloseIcon />}
          onClick={async () => {
            const confirm = await AlertConfirm('ไม่อนุมัติรายการ');
            if (confirm)
              updateUserScoreHistoryById({
                id: params.row.id,
                status: EUserScoreHistoryStatus.rejected,
              });
          }}
          label="ปฏิเสธ"
        />,
      ],
    },
  ];

  return (
    <Paper sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Typography variant="h2">{t('common:user.history')}</Typography>
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
          onRowClick={(params) => {}}
        />
      </Box>
    </Paper>
  );
};

export default UserIdContainer;
