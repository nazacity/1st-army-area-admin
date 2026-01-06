import { useMutation, useQuery } from '@tanstack/react-query';
import { ResponseModel } from 'models/respone.model';
import {
  EUserBase,
  EUserScoreHistoryStatus,
  IUserScoreHistory,
} from 'models/user.model';

import authenticatedRequest from 'utils/authenticatedRequest';

const historyServices = {
  useQueryGetUserScoreHistories({
    searchText,
    startDate,
    endDate,
    page,
    take,
    base,
  }: {
    searchText: string;
    startDate: string;
    endDate: string;
    page: number;
    take: number;
    base: EUserBase;
  }) {
    return useQuery<
      ResponseModel<IUserScoreHistory[]>,
      Error,
      ResponseModel<IUserScoreHistory[]>,
      [
        string,
        {
          searchText: string;
          startDate: string;
          endDate: string;
          page: number;
          take: number;
          base: EUserBase;
        },
      ]
    >({
      queryKey: [
        'get-user-score-histories',
        { searchText, startDate, endDate, page, take, base },
      ],
      queryFn: async ({ queryKey }) => {
        try {
          const res = await authenticatedRequest.get(`/user-score-history`, {
            params: {
              page: queryKey[1].page,
              take: queryKey[1].take,
              ...(queryKey[1].searchText && {
                searchText: queryKey[1].searchText,
              }),
              ...(queryKey[1].base && {
                base: queryKey[1].base,
              }),
              ...(queryKey[1].startDate &&
                queryKey[1].endDate && {
                  startDate: queryKey[1].startDate,
                  endDate: queryKey[1].endDate,
                }),
            },
          });
          if (res?.data) {
            return res?.data;
          } else {
            return {
              data: [],
            };
          }
        } catch (error) {
          throw error;
        }
      },
    });
  },
  useMutationUpdateUserScoreHistoryById(
    onSuccess: (data: IUserScoreHistory) => void,
    onError: (error: any) => void
  ) {
    return useMutation<
      IUserScoreHistory,
      Error,
      {
        id: string;
        status: EUserScoreHistoryStatus;
      }
    >({
      mutationFn: async (data) => {
        try {
          const res = await authenticatedRequest.patch(
            `/user-score-history/${data.id}`,
            data
          );

          return res.data.data;
        } catch (error) {
          throw error.response.data.message;
        }
      },
      onSuccess,
      onError,
    });
  },
};

export default historyServices;
