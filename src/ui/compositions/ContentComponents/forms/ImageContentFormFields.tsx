import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import { ImageContent } from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { ToasterContext } from '@/ui/context';
import FileDropzone from '@/ui/compositions/FileDropzone';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { FormFieldsProps } from '../types';
import { ImagePreview } from '../views/ImageContentView.style';

export const ImageContentFormFields = ({ value, onChange }: FormFieldsProps) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const imageData = value as Partial<ImageContent> | null;
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelection = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('destinationFolder', 'course-components');

      const uploadedImage = await api.post<FileResponseType>('/api/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploadedImage.success) {
        onChange({
          url: uploadedImage.filePath,
          original_name: uploadedImage.originalFileName,
          mime_type: uploadedImage.mimeType,
        });
      }
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('error.message'),
        newType: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <FileDropzone
        onFilesSelected={handleImageSelection}
        accept={{
          'image/png': ['.png'],
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/webp': ['.webp'],
          'image/gif': ['.gif'],
          'image/svg+xml': ['.svg'],
        }}
        isUploading={isUploading}
      />
      <TextField
        label={t('contentComponent.imageAltText')}
        value={imageData?.alt_text || ''}
        onChange={(e) => onChange({ alt_text: e.target.value })}
        fullWidth
      />
      <TextField
        label={t('contentComponent.imageCaption')}
        value={imageData?.caption || ''}
        onChange={(e) => onChange({ caption: e.target.value })}
        fullWidth
        multiline
        minRows={2}
      />
      {imageData?.url && (
        <div>
          <span>{t('contentComponent.preview')}:</span>
          <div>
            <ImagePreview
              key={getMediaUrl(imageData.url)}
              src={getMediaUrl(imageData.url)}
              alt={imageData.alt_text || ''}
            />
          </div>
        </div>
      )}
    </Box>
  );
};
