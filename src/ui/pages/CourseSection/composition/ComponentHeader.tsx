import StarIcon from '@mui/icons-material/Star';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

import { ContentComponentsType } from '@/types/types';
import { Typography } from '@/ui/components';

export const ComponentHeader = ({ component }: { component: Partial<ContentComponentsType> }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
          {component.denomination}
        </Typography>
        {component.is_required && (
          <Tooltip title={t('contentComponent.requiredContent')} arrow>
            <StarIcon sx={{ fontSize: '24px', color: '#ff9800' }} />
          </Tooltip>
        )}
      </Box>
      {component.is_required && !component.progress?.is_completed && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {t('contentComponent.requiredContentHint')}
        </Alert>
      )}
    </Box>
  );
};

export default ComponentHeader;
