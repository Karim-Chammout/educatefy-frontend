import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '@/ui/components';
import { FileDropzone } from '@/ui/compositions';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { FormHandlers, FormState } from './types';

export const CourseImageSection = ({
  formState,
  formHandlers,
}: {
  formState: FormState;
  formHandlers: FormHandlers;
}) => {
  const { t } = useTranslation();
  const { courseImage, uploadedImageDetails, isImageLoading } = formState;
  const { handleFileSelect, handleRemoveImage } = formHandlers;

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('course.image')}
      </Typography>
      {courseImage && uploadedImageDetails?.success ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <img
            src={getMediaUrl(uploadedImageDetails.filePath)}
            alt={t('course.imageAlt')}
            style={{
              maxWidth: '300px',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <Button size="small" color="error" variant="outlined" onClick={handleRemoveImage}>
            {t('common.remove')}
          </Button>
        </Box>
      ) : (
        <FileDropzone onFilesSelected={handleFileSelect} disabled={isImageLoading} />
      )}
    </Paper>
  );
};
