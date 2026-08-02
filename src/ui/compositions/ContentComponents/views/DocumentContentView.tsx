import DownloadIcon from '@mui/icons-material/Download';
import { useTranslation } from 'react-i18next';

import { DocumentContent } from '@/generated/graphql';
import { Button } from '@/ui/components';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { ViewProps } from '../types';
import { DocumentFrame } from './DocumentContentView.style';

export const DocumentContentView = ({ component }: ViewProps) => {
  const { t } = useTranslation();
  const documentContent = component as DocumentContent;

  if (!documentContent.url) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DocumentFrame
        title={documentContent.original_name || undefined}
        src={getMediaUrl(documentContent.url)}
      />
      <div>
        <Button
          href={getMediaUrl(documentContent.url)}
          download={documentContent.original_name || undefined}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          startIcon={<DownloadIcon />}
        >
          {t('contentComponent.download')}
        </Button>
      </div>
    </div>
  );
};
