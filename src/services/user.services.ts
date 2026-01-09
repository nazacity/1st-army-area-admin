import { useMutation, useQuery } from '@tanstack/react-query';
import { ResponseModel } from 'models/respone.model';
import { IUser, IUserScoreHistory } from 'models/user.model';

import authenticatedRequest from 'utils/authenticatedRequest';

const userServices = {
  useQueryGetUsers({
    searchText,
    page,
    take,
  }: {
    searchText: string;
    page: number;
    take: number;
  }) {
    return useQuery<
      ResponseModel<IUser[]>,
      Error,
      ResponseModel<IUser[]>,
      [
        string,
        {
          searchText: string;
          page: number;
          take: number;
        },
      ]
    >({
      queryKey: ['get-users', { page, take, searchText }],
      queryFn: async ({ queryKey }) => {
        try {
          const res = await authenticatedRequest.get('/user', {
            params: {
              searchText: queryKey[1].searchText,
              page: queryKey[1].page,
              take: queryKey[1].take,
            },
          });
          if (res?.data) {
            return res?.data;
          } else {
            return [];
          }
        } catch (error) {
          throw error;
        }
      },
    });
  },
  useQueryGetUserScoreHistoriesByUserId({
    userId,
    startDate,
    endDate,
    page,
    take,
  }: {
    userId: string;
    startDate: Date;
    endDate: Date;
    page: number;
    take: number;
  }) {
    return useQuery<
      ResponseModel<IUserScoreHistory[]>,
      Error,
      ResponseModel<IUserScoreHistory[]>,
      [
        string,
        {
          userId: string;
          startDate: Date;
          endDate: Date;
          page: number;
          take: number;
        },
      ]
    >({
      queryKey: [
        'get-user-score-histories-by-user-id',
        { userId, startDate, endDate, page, take },
      ],
      queryFn: async ({ queryKey }) => {
        try {
          const res = await authenticatedRequest.get(
            `/user-score-history/${queryKey[1].userId}/user`,
            {
              params: {
                page: queryKey[1].page,
                take: queryKey[1].take,
                ...(queryKey[1].startDate &&
                  queryKey[1].endDate && {
                    startDate: queryKey[1].startDate,
                    endDate: queryKey[1].endDate,
                  }),
              },
            }
          );
          if (res?.data) {
            return res?.data;
          } else {
            return [];
          }
        } catch (error) {
          throw error;
        }
      },
    });
  },
  useMutationDeleteUser(onSuccess: (data: string) => void) {
    return useMutation<
      string,
      Error,
      {
        userId: string;
      }
    >({
      mutationFn: async ({ userId }) => {
        try {
          const res = await authenticatedRequest.delete(`/user/${userId}`);

          return res.data.data;
        } catch (error) {
          throw error.response.data.message;
        }
      },
      onSuccess,
    });
  },
  useMutationDeleteUserScoreHistory(onSuccess: (data: string) => void) {
    return useMutation<
      string,
      Error,
      {
        userScoreHistoryId: string;
      }
    >({
      mutationFn: async ({ userScoreHistoryId }) => {
        try {
          const res = await authenticatedRequest.delete(
            `/user-score-history/${userScoreHistoryId}`
          );

          return res.data.data;
        } catch (error) {
          throw error.response.data.message;
        }
      },
      onSuccess,
    });
  },
};

export default userServices;
