import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { FileDropzone, RichTextEditor } from '@/ui/compositions';

const ContentComponent = ({
  type,
  textContent,
  setTextContent,
  onVideoSelected,
  isUploadingVideo,
  videoUrl,
}: {
  type: string;
  textContent: string;
  setTextContent: Dispatch<SetStateAction<string>>;
  onVideoSelected: (files: File[]) => Promise<void>;
  isUploadingVideo: boolean;
  videoUrl: string | null;
}) => {
  const { t } = useTranslation();
  const S3_PATH_PREFIX = import.meta.env.VITE_S3_PATH_PREFIX;
  const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;
  const BUCKET_PATH_NAME_URL = `${S3_PATH_PREFIX}/${S3_BUCKET_NAME}`;

  switch (type) {
    case 'TextContent':
      return (
        <RichTextEditor
          onChange={setTextContent}
          initialValue={textContent}
          placeholder={t('course.descriptionPlaceholder')}
        />
      );
    case 'VideoContent':
      return (
        <>
          <FileDropzone
            onFilesSelected={onVideoSelected}
            accept={{ 'video/*': ['.mp4'] }}
            isUploading={isUploadingVideo}
          />
          {videoUrl && (
            <div style={{ marginTop: '16px' }}>
              <span>{t('contentComponent.preview')}:</span>
              <div>
                <video
                  width="100%"
                  height="250"
                  key={`${BUCKET_PATH_NAME_URL}/${videoUrl}`}
                  controls
                >
                  <source
                    src={`${BUCKET_PATH_NAME_URL}/${videoUrl}`}
                    type={`video/${videoUrl.split('.').pop()}`}
                  />
                  Your browser does not support videos.
                </video>
              </div>
            </div>
          )}
        </>
      );
    default:
      return null;
  }
};

export default ContentComponent;
