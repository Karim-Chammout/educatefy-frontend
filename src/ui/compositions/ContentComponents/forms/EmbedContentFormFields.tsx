import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

import { EmbedContent } from '@/generated/graphql';

import { EMBED_PROVIDERS, getEmbedUrl } from '../embedProviders';
import { FormFieldsProps } from '../types';
import { EmbedFrame } from '../views/EmbedContentView.style';

export const EmbedContentFormFields = ({ value, onChange }: FormFieldsProps) => {
  const { t } = useTranslation();
  const embedData = value as Partial<EmbedContent> | null;

  const embedUrl =
    embedData?.provider && embedData.url ? getEmbedUrl(embedData.provider, embedData.url) : '';

  return (
    <>
      <TextField
        select
        label={t('contentComponent.embedProvider')}
        value={embedData?.provider || ''}
        onChange={(e) => onChange({ provider: e.target.value })}
        required
        fullWidth
        margin="normal"
      >
        {EMBED_PROVIDERS.map((provider) => (
          <MenuItem key={provider.value} value={provider.value}>
            {provider.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label={t('contentComponent.embedUrl')}
        helperText={t('contentComponent.embedUrlHelperText')}
        value={embedData?.url || ''}
        onChange={(e) => onChange({ url: e.target.value })}
        required
        fullWidth
        margin="normal"
      />

      {embedUrl && (
        <EmbedFrame
          title={embedData?.provider}
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </>
  );
};
