import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

import { YouTubeContent } from '@/generated/graphql';

import { FormFieldsProps } from '../types';

export const YouTubeContentFormFields = ({ value, onChange }: FormFieldsProps) => {
  const { t } = useTranslation();
  const youtubeData = value as Partial<YouTubeContent> | null;

  return (
    <>
      <TextField
        label={t('contentComponent.youtubeVideoId')}
        helperText={t('contentComponent.youtubeVideoHelperText')}
        value={youtubeData?.youtube_video_id || ''}
        onChange={(e) => onChange({ youtube_video_id: e.target.value })}
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
