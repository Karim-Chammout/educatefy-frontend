import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

import { Button } from '@/ui/components';

type ActionButtonsType = {
  isCompleted: boolean;
  hasNext: boolean;
  isUpdating: boolean;
  isItemCompleted: boolean;
  onCompleteAndNext: () => void;
  onNavigateNext: () => void;
  onBackToCourse: () => void;
};

const ActionButtons = ({
  isCompleted,
  hasNext,
  isUpdating,
  isItemCompleted,
  onCompleteAndNext,
  onNavigateNext,
  onBackToCourse,
}: ActionButtonsType) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
      <Stack direction={{ xxs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        {!isCompleted && (
          <Button
            variant="contained"
            startIcon={<DoneIcon />}
            onClick={onCompleteAndNext}
            disabled={isUpdating}
          >
            {hasNext ? t('common.completeAndNext') : t('common.complete')}
          </Button>
        )}
        {isCompleted && hasNext && (
          <Button
            variant="outlined"
            startIcon={<NavigateNextIcon />}
            onClick={onNavigateNext}
            disabled={!isCompleted || isUpdating}
          >
            {t('common.next')}
          </Button>
        )}
      </Stack>
      {isItemCompleted && isCompleted && !hasNext && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Alert icon={<DoneIcon fontSize="inherit" />} severity="success" sx={{ mb: 2 }}>
            {t('courseSection.sectionCompleted')}
          </Alert>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onBackToCourse}>
            {t('courseSection.backToCourse')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ActionButtons;
