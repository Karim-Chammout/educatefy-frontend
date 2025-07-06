import LockIcon from '@mui/icons-material/Lock';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '@/ui/components';

type LockedContentType = {
  blockingComponent: {
    itemId: string;
    componentId: string;
    denomination: string;
  } | null;
  onNavigateToRequired: (itemId: string, componentId: string) => void;
};

const LockedContent = ({ blockingComponent, onNavigateToRequired }: LockedContentType) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        textAlign: 'center',
      }}
    >
      <LockIcon sx={{ fontSize: '48px', mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        {t('contentComponent.contentLocked')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, maxWidth: '400px' }}>
        {t('contentComponent.contentLockedDesc')}
      </Typography>
      {blockingComponent && (
        <Typography variant="body2" sx={{ mb: 3, maxWidth: '400px', color: '#757575' }}>
          {t('contentComponent.nextRequired')}
          <span style={{ fontWeight: 'bold' }}>{blockingComponent.denomination}</span>
        </Typography>
      )}
      {blockingComponent && (
        <Button
          startIcon={<NavigateNextIcon />}
          onClick={() =>
            onNavigateToRequired(blockingComponent.itemId, blockingComponent.componentId)
          }
        >
          {t('contentComponent.goToRequiredBtn')}
        </Button>
      )}
    </Box>
  );
};

export default LockedContent;
