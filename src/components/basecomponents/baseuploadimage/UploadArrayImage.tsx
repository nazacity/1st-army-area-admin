import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import utilServices from 'services/util.services';
import { useDropzone } from 'react-dropzone';
import { Box, Grid, Typography } from '@mui/material';
import { COLORS } from 'theme';
import { FaUpload } from 'react-icons/fa6';

interface IProps {
  value: string[];
  onChange: (url: string) => void;
  width: number;
  aspectRatio: string;
}

const UploadArrayImage: React.FC<IProps> = ({
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
    <Grid
      container
      spacing={2}
      sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
    >
      {value &&
        value.length > 0 &&
        value.map((item) => {
          return (
            <Grid item xs={4} key={item}>
              <Box
                sx={{
                  border: `1px dashed ${COLORS.grey[1]}`,
                  borderRadius: 1,
                  width: '100%',
                  aspectRatio: aspectRatio,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <img
                  src={item}
                  style={{
                    width: '100%',
                    aspectRatio: aspectRatio,
                  }}
                  alt={item}
                />
              </Box>
            </Grid>
          );
        })}
      <Grid item xs={4} {...getRootProps()}>
        <Box
          sx={{
            border: `1px dashed ${COLORS.grey[1]}`,
            borderRadius: 1,
            width: '100%',
            aspectRatio: aspectRatio,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <input {...getInputProps()} />
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
        </Box>
      </Grid>
    </Grid>
  );
};

export default UploadArrayImage;
