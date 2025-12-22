import { useQuery } from '@tanstack/react-query';
import { ResponseModel } from 'models/respone.model';
import { IUser } from 'models/user.model';

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
};

export default userServices;
