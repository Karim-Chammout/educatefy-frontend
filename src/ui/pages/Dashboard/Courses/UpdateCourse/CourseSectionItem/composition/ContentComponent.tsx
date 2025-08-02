import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { FileDropzone, RichTextEditor } from '@/ui/compositions';
import { getMediaUrl } from '@/utils/getMediaUrl';

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
                  key={getMediaUrl(videoUrl)}
                  controls
                  style={{ border: '2px solid #BDBDBD' }}
                >
                  <source src={getMediaUrl(videoUrl)} type={`video/${videoUrl.split('.').pop()}`} />
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
