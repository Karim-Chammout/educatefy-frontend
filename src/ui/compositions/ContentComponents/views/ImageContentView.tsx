import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ImageContent } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { ViewProps } from '../types';
import { Image, LightboxImage, LightboxOverlay } from './ImageContentView.style';

export const ImageContentView = ({ component }: ViewProps) => {
  const { t } = useTranslation();
  const imageContent = component as ImageContent;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  if (!imageContent.url) return null;

  const imageUrl = getMediaUrl(imageContent.url);
  const altText = imageContent.alt_text || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Image src={imageUrl} alt={altText} onClick={() => setIsLightboxOpen(true)} />
      {imageContent.caption && (
        <Typography color="text.secondary">{imageContent.caption}</Typography>
      )}
      <div>
        <Button
          href={imageUrl}
          download={imageContent.original_name || undefined}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          startIcon={<DownloadIcon />}
        >
          {t('contentComponent.download')}
        </Button>
      </div>
      {isLightboxOpen && (
        <LightboxOverlay onClick={() => setIsLightboxOpen(false)}>
          <LightboxImage
            src={imageUrl}
            alt={altText}
            onClick={(event) => event.stopPropagation()}
          />
        </LightboxOverlay>
      )}
    </div>
  );
};
