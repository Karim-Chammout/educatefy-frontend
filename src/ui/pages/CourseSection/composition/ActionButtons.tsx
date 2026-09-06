import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { Button } from '@/ui/components';

type ActionButtonsType = {
  isCompleted: boolean;
  hasNext: boolean;
  hasNextSection: boolean;
  isUpdating: boolean;
  isItemCompleted: boolean;
  onCompleteAndNext: () => void;
  onNavigateNext: () => void;
  onNavigateNextSection: () => void;
  onBackToCourse: () => void;
};

const ActionButtons = ({
  isCompleted,
  hasNext,
  hasNextSection,
  isUpdating,
  isItemCompleted,
  onCompleteAndNext,
  onNavigateNext,
  onNavigateNextSection,
  onBackToCourse,
}: ActionButtonsType) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
      <Stack direction={{ xxs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
        {!isCompleted && (
          <Button
            variant="contained"
            startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : <DoneIcon />}
            onClick={onCompleteAndNext}
            disabled={isUpdating}
          >
            {hasNext ? t('common.completeAndNext') : t('common.complete')}
          </Button>
        )}
        {isCompleted && hasNext && (
          <Button
            variant="outlined"
            startIcon={isUpdating ? <CircularProgress size={20} /> : <NavigateNextIcon />}
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
          <Alert
            icon={<DoneIcon fontSize="inherit" />}
            severity="success"
            variant="filled"
            sx={{ mb: 2 }}
          >
            {t('courseSection.sectionCompleted')}
          </Alert>
          {hasNextSection ? (
            <Button
              variant="contained"
              startIcon={<NavigateNextIcon />}
              onClick={onNavigateNextSection}
            >
              {t('courseSection.nextSection')}
            </Button>
          ) : (
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onBackToCourse}>
              {t('courseSection.backToCourse')}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ActionButtons;
