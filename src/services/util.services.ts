import { useMutation } from '@tanstack/react-query';
import { ResponseModel } from 'models/respone.model';
import { ResourceUrl } from 'models/util.model';
import authenticatedRequest from 'utils/authenticatedRequest';

const utilServices = {
  useMutationUploadImage(
    onSuccess: (data: ResponseModel<ResourceUrl>) => void,
    onError: (error: any) => void
  ) {
    return useMutation<ResponseModel<ResourceUrl>, Error, { file: File }>({
      mutationFn: async ({ file }) => {
        try {
          const formData = new FormData();
          formData.append('image', file);
          const res = await authenticatedRequest.post(`/r2/image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          return res.data;
        } catch (error) {
          throw error.response.data.message;
        }
      },
      onSuccess,
      onError,
    });
  },
};

export default utilServices;
