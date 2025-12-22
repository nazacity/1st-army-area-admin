import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import utilServices from 'services/util.services';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import { COLORS } from 'theme';
import { FaUpload } from 'react-icons/fa6';

interface IProps {
  value: string;
  onChange: (url: string) => void;
  width: number;
  aspectRatio: string;
}

const UploadImage: React.FC<IProps> = ({
  value,
  onChange,
  width,
  aspectRatio,
}) => {
  const { t } = useTranslation();
  const { mutate: uploadImagel } = utilServices.useMutationUploadImage(
    (data) => {
      onChange(data.data.resourceUrl);
    },
    () => {}
  );

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      uploadImagel({
        file: acceptedFiles[0],
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <Box
      sx={{
        border: `1px dashed ${COLORS.grey[1]}`,
        borderRadius: 1,
        width: width,
        aspectRatio: aspectRatio,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mb: 2,
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {value ? (
        <img
          src={value}
          style={{
            width: width,
            aspectRatio: aspectRatio,
          }}
          alt={value}
        />
      ) : (
        <>
          <FaUpload style={{ color: COLORS.grey[1] }} />
          <Typography
            sx={{
              color: COLORS.grey[1],
              fontSize: 10,
              textAlign: 'center',
            }}
          >
            {t('common:banners.upload_banner')}
          </Typography>
          <Typography
            sx={{
              color: COLORS.grey[1],
              fontSize: 10,
              textAlign: 'center',
            }}
          >
            {t('common:common.size')}
            {` ${width}x`}
            {(width * Number(aspectRatio.split('/')[1])) /
              Number(aspectRatio.split('/')[0])}{' '}
            px
          </Typography>
        </>
      )}
    </Box>
  );
};

export default UploadImage;
