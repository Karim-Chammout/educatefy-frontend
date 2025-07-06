import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Paper, Box, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CourseSectionFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { useSectionProgress } from '../hooks/useSectionProgress';
import { SectionProgressIndicator } from './SectionProgressIndicator';

type SectionCardType = {
  section: CourseSectionFragment;
  onSectionClick: (sectionId: string) => void;
  calculateSectionDuration: (section: CourseSectionFragment) => string;
};

export const SectionCard = ({
  section,
  onSectionClick,
  calculateSectionDuration,
}: SectionCardType) => {
  const { t } = useTranslation();
  const { completedComponents, totalComponents, percentage, isCompleted } =
    useSectionProgress(section);

  return (
    <Paper
      key={section.id}
      variant="outlined"
      sx={{
        p: 3,
        flex: 1,
        minWidth: { xxs: '100%', sm: 300 },
        position: 'relative',
        ...(isCompleted && {
          borderColor: 'success.main',
          borderWidth: 2,
        }),
      }}
    >
      {isCompleted && (
        <Chip
          label={t('courseSection.completed')}
          color="success"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontSize: '12px',
          }}
        />
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ mb: 1, pr: isCompleted ? 10 : 0 }}>
            {section.denomination}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('courseSection.itemInfo', {
              count: section.items.length,
              duration: calculateSectionDuration(section),
            })}
          </Typography>
        </Box>

        <SectionProgressIndicator
          completedComponents={completedComponents}
          totalComponents={totalComponents}
          percentage={percentage}
          isCompleted={isCompleted}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color={isCompleted ? 'success' : 'primary'}
            onClick={() => onSectionClick(section.id)}
            startIcon={<OpenInNewIcon />}
          >
            {t('common.open')}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
