import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

import { Button } from '@/ui/components';
import { FileDropzone, RichTextEditor } from '@/ui/compositions';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { TextContent, YouTubeContent } from '@/generated/graphql';

import { useComponentContext, VideoContentType } from './ComponentContext';

const TextComponentForm = () => {
  const { t } = useTranslation();
  const { componentData, updateComponentData } = useComponentContext();
  const textData = componentData as TextContent;

  return (
    <RichTextEditor
      onChange={(content) => updateComponentData({ content })}
      initialValue={textData?.content || ''}
      placeholder={t('course.descriptionPlaceholder')}
    />
  );
};

const VideoComponentForm = () => {
  const { t } = useTranslation();
  const { componentData, uploadVideo } = useComponentContext();
  const videoData = componentData as VideoContentType;

  const handleVideoSelection = async (files: File[]) => {
    await uploadVideo(files);
  };

  return (
    <>
      <FileDropzone
        onFilesSelected={handleVideoSelection}
        accept={{ 'video/*': ['.mp4'] }}
        isUploading={videoData?.isUploading || false}
      />
      {videoData?.url && (
        <div style={{ marginTop: '16px' }}>
          <span>{t('contentComponent.preview')}:</span>
          <div>
            <video
              width="100%"
              height="250"
              key={getMediaUrl(videoData.url)}
              controls
              style={{ border: '2px solid #BDBDBD' }}
            >
              <source
                src={getMediaUrl(videoData.url)}
                type={`video/${videoData.url.split('.').pop()}`}
              />
              Your browser does not support videos.
            </video>
          </div>
        </div>
      )}
    </>
  );
};

const YouTubeComponentForm = () => {
  const { t } = useTranslation();
  const { componentData, updateComponentData } = useComponentContext();
  const youtubeData = componentData as YouTubeContent;

  return (
    <>
      <TextField
        label={t('contentComponent.youtubeVideoId')}
        helperText={t('contentComponent.youtubeVideoHelperText')}
        value={youtubeData?.youtube_video_id || ''}
        onChange={(e) => updateComponentData({ youtube_video_id: e.target.value })}
        required
        fullWidth
      />
      {youtubeData?.youtube_video_id && (
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeData.youtube_video_id}`}
          title="YouTube video player"
          allowFullScreen
          style={{
            border: 0,
            marginTop: '16px',
          }}
        />
      )}
    </>
  );
};

export const ComponentFormModal = ({ mode }: { mode: 'create' | 'edit' }) => {
  const { t } = useTranslation();
  const {
    selectedComponentType,
    baseComponentData,
    componentData,
    updateBaseComponentData,
    createComponent,
    updateComponent,
    closeCreateModal,
    closeEditModal,
  } = useComponentContext();

  if (!selectedComponentType) return null;

  const handleClose = () => {
    if (mode === 'create') {
      closeCreateModal();
    } else {
      closeEditModal();
    }
  };

  const handleSave = async () => {
    if (mode === 'create') {
      await createComponent();
    } else {
      await updateComponent();
    }
  };

  const renderComponentForm = () => {
    switch (selectedComponentType.id) {
      case 'TextContent':
        return <TextComponentForm />;
      case 'VideoContent':
        return <VideoComponentForm />;
      case 'YouTubeContent':
        return <YouTubeComponentForm />;
      default:
        return null;
    }
  };

  const isValid = selectedComponentType.validation(componentData || ({} as any), baseComponentData);

  return (
    <div>
      <div style={{ margin: '16px 0' }}>
        {/* Base Component Fields */}
        <div style={{ marginBottom: '24px' }}>
          <TextField
            label={t('contentComponent.title')}
            value={baseComponentData.denomination}
            onChange={(e) => updateBaseComponentData({ denomination: e.target.value })}
            required
            fullWidth
            margin="normal"
          />

          <div style={{ marginTop: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={baseComponentData.isPublished}
                    onChange={(e) => updateBaseComponentData({ isPublished: e.target.checked })}
                    title={t('contentComponent.isPublished')}
                  />
                }
                label={t('contentComponent.isPublished')}
              />
              <FormHelperText>{t('contentComponent.isPublishedHint')}</FormHelperText>
            </div>

            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={baseComponentData.isRequired}
                    onChange={(e) => updateBaseComponentData({ isRequired: e.target.checked })}
                    title={t('contentComponent.isRequired')}
                  />
                }
                label={t('contentComponent.isRequired')}
              />
              <FormHelperText>{t('contentComponent.isRequiredHint')}</FormHelperText>
            </div>
          </div>
        </div>

        {/* Component-specific form */}
        <div style={{ marginTop: '24px' }}>{renderComponentForm()}</div>
      </div>

      <DialogActions sx={{ padding: '8px 0 !important' }}>
        <Button onClick={handleClose} variant="outlined" fullWidth>
          {t('common.cancel')}
        </Button>
        <Button onClick={handleSave} disabled={!isValid} fullWidth>
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </div>
  );
};
