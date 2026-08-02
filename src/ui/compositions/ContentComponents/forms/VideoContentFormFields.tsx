import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import { VideoContent } from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { ToasterContext } from '@/ui/context';
import FileDropzone from '@/ui/compositions/FileDropzone';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { FormFieldsProps } from '../types';
import { VideoPreview } from '../views/VideoContentView.style';

export const VideoContentFormFields = ({ value, onChange }: FormFieldsProps) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const videoData = value as Partial<VideoContent> | null;
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoSelection = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('destinationFolder', 'course-components');

      const uploadedVideo = await api.post<FileResponseType>('/api/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploadedVideo.success) {
        onChange({ url: uploadedVideo.filePath });
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
        onFilesSelected={handleVideoSelection}
        accept={{ 'video/*': ['.mp4'] }}
        isUploading={isUploading}
      />
      {videoData?.url && (
        <div style={{ marginTop: '16px' }}>
          <span>{t('contentComponent.preview')}:</span>
          <div>
            <VideoPreview key={getMediaUrl(videoData.url)} controls>
              <source
                src={getMediaUrl(videoData.url)}
                type={`video/${videoData.url.split('.').pop()}`}
              />
              Your browser does not support videos.
            </VideoPreview>
          </div>
        </div>
      )}
    </>
  );
};
