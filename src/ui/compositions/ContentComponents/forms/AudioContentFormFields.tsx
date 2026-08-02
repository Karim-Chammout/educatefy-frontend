import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import { AudioContent } from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { ToasterContext } from '@/ui/context';
import FileDropzone from '@/ui/compositions/FileDropzone';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { FormFieldsProps } from '../types';
import { AudioPreview } from '../views/AudioContentView.style';

export const AudioContentFormFields = ({ value, onChange }: FormFieldsProps) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const audioData = value as Partial<AudioContent> | null;
  const [isUploading, setIsUploading] = useState(false);

  const handleAudioSelection = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('destinationFolder', 'course-components');

      const uploadedAudio = await api.post<FileResponseType>('/api/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploadedAudio.success) {
        onChange({
          url: uploadedAudio.filePath,
          original_name: uploadedAudio.originalFileName,
          mime_type: uploadedAudio.mimeType,
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
    <>
      <FileDropzone
        onFilesSelected={handleAudioSelection}
        accept={{ 'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'] }}
        isUploading={isUploading}
      />
      {audioData?.url && (
        <div style={{ marginTop: '16px' }}>
          <span>{t('contentComponent.preview')}:</span>
          <div>
            <AudioPreview key={getMediaUrl(audioData.url)} controls>
              <source src={getMediaUrl(audioData.url)} type={audioData.mime_type || 'audio/mpeg'} />
              Your browser does not support audio.
            </AudioPreview>
          </div>
        </div>
      )}
    </>
  );
};
