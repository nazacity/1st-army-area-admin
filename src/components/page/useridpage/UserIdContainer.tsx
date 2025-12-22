import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import userServices from 'services/user.services';
import { useRouter } from 'next/router';
import usePaginationHook from 'utils/usePaginationHook';
import { useForm } from 'react-hook-form';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import BaseTable from 'components/basecomponents/basetable/BaseTable';
import BasePagination from 'components/basecomponents/baspagination/BasePagination';
import { IUserScoreHistory } from 'models/user.model';
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import numeral from 'numeral';
import { RiFilePaper2Fill } from 'react-icons/ri';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

interface IProps {}

const tableSize = 10;

const UserIdContainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { page, setPage, total, setTotal, loading, setLoading, data, setData } =
    usePaginationHook();

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
      field: 'actions',
      type: 'actions',
      flex: 1,
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
