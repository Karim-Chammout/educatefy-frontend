import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import { Typography } from '@/ui/components';

import { CompletedIndicator, StyledLinearProgress } from '../Course.style';

type SectionProgressIndicatorProps = {
  completedComponents: number;
  totalComponents: number;
  percentage: number;
  isCompleted: boolean;
};

export const SectionProgressIndicator = ({
  completedComponents,
  totalComponents,
  percentage,
  isCompleted,
}: SectionProgressIndicatorProps) => {
  const { t } = useTranslation();

  if (totalComponents === 0) {
    return (
      <Typography variant="caption" color="text.secondary">
        {t('courseSection.noContent')}
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      {isCompleted ? (
        <CompletedIndicator>
          <CheckCircleIcon />
          <Typography variant="body2">{t('courseSection.completed')}</Typography>
        </CompletedIndicator>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <StyledLinearProgress variant="determinate" value={percentage} sx={{ flexGrow: 1 }} />
            <Typography
              variant="caption"
              sx={{
                minWidth: 40,
                fontWeight: 'medium',
                color: percentage > 0 ? 'primary.main' : 'text.secondary',
              }}
            >
              {Math.round(percentage)}%
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {t('courseSection.progress', {
              completed: completedComponents,
              total: totalComponents,
            })}
          </Typography>
        </>
      )}
    </Box>
  );
};
