import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '@/ui/components';
import { FileDropzone } from '@/ui/compositions';

type ProgramImageSectionType = {
  currentImage: string | null;
  isImageLoading: boolean;
  onFileSelect: (files: File[]) => void;
  onRemoveImage: () => void;
};

const ProgramImageSection = ({
  currentImage,
  isImageLoading,
  onFileSelect,
  onRemoveImage,
}: ProgramImageSectionType) => {
  const { t } = useTranslation();

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('program.image')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('program.imageSubtitle')}
      </Typography>

      {currentImage ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 2 }}>
          <img
            src={currentImage}
            alt={t('program.imageAlt')}
            style={{
              maxWidth: '300px',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <Button size="small" color="error" variant="outlined" onClick={onRemoveImage}>
            {t('common.remove')}
          </Button>
        </Box>
      ) : (
        <FileDropzone onFilesSelected={onFileSelect} disabled={isImageLoading} />
      )}
    </Paper>
  );
};

export default ProgramImageSection;
