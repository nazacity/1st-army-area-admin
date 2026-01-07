import React, { useEffect } from 'react';
import historyServices from 'services/history.services';
import { Controller, useForm } from 'react-hook-form';
import usePaginationHook from 'utils/usePaginationHook';
import {
  EUserBase,
  EUserScoreHistoryStatus,
  IUserScoreHistory,
} from 'models/user.model';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import BaseTable from 'components/basecomponents/basetable/BaseTable';
import BasePagination from 'components/basecomponents/baspagination/BasePagination';
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridSearchIcon,
} from '@mui/x-data-grid';
import { AlertConfirm } from 'utils/Alert';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import useTranslation from 'next-translate/useTranslation';
import numeral from 'numeral';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { RiFilePaper2Fill } from 'react-icons/ri';
import { useQueryClient } from '@tanstack/react-query';
import BaseTextInput from 'components/basecomponents/baseinput/BaseTextInput';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { COLORS } from 'theme';

interface IProps {}

const tableSize = 10;

const HistoryContainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const { page, setPage, total, setTotal, loading, setLoading, data, setData } =
    usePaginationHook<IUserScoreHistory>();
  const queryClient = useQueryClient();

  const { watch, control } = useForm({
    defaultValues: {
      searchText: '',
      startDate: dayjs().startOf('month'),
      endDate: dayjs().endOf('month'),
      base: EUserBase[''],
    },
  });

  const { data: historyData, refetch: refetchHistoryData } =
    historyServices.useQueryGetUserScoreHistories({
      searchText: watch('searchText'),
      startDate: watch('startDate').toDate(),
      endDate: watch('endDate').toDate(),
      page,
      take: tableSize,
      base: watch('base'),
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
          queryKey: ['get-user-score-histories'],
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
          >
            <img
              src={params.row.scoreInfo.user?.profileImageUrl}
              alt={params.row.scoreInfo.user?.displayName}
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
            {`${params.row?.scoreInfo.user?.rank} ${params.row?.scoreInfo.user?.firstName} ${params.row?.scoreInfo.user?.lastName}`}
          </Typography>
        </Box>
      ),
      width: 180,
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
        <Typography variant="h2">
          {t('common:history.history_title')}
        </Typography>
        <Box sx={{ flex: 1 }} />
      </Box>
      <Box sx={{ m: { xs: 0, md: 2 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
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
                        <IconButton onClick={() => refetchHistoryData()}>
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
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Controller
                name="startDate"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="จากวันที่"
                        value={value}
                        onChange={onChange}
                        sx={{ mr: 2 }}
                      />
                    </LocalizationProvider>
                  );
                }}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="ถึงวันที่"
                        value={value}
                        onChange={onChange}
                      />
                    </LocalizationProvider>
                  );
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              control={control}
              name="base"
              render={({
                field: { value, onChange },
                formState: { errors },
              }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  displayEmpty
                  error={!!errors.base?.message}
                  sx={{ width: '100%', bgcolor: COLORS.white }}
                >
                  <MenuItem value="">เลือกสังกัด</MenuItem>
                  {Object.values(EUserBase)
                    .filter((a) => a)
                    .map((item) => {
                      return (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                </Select>
              )}
            />
          </Grid>
        </Grid>
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

export default HistoryContainer;
