import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { CourseSectionFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { AuthContext } from '@/ui/context';
import { isLoggedIn } from '@/ui/layout/apolloClient';
import { savePostLoginRedirectPath } from '@/utils/savePostLoginRedirectPath';

import { useSectionProgress } from '../hooks/useSectionProgress';
import { SectionProgressIndicator } from './SectionProgressIndicator';

type SectionCardType = {
  section: CourseSectionFragment;
};

export const SectionCard = ({ section }: SectionCardType) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();

  const { completedComponents, totalComponents, percentage, isCompleted } =
    useSectionProgress(section);

  const {
    authModal: { setAuthModalVisibility },
  } = useContext(AuthContext);

  const handleSectionClick = () => {
    if (!isLoggedIn()) {
      savePostLoginRedirectPath(`/course/${slug}/section/${section.id}`);
      setAuthModalVisibility('login');

      return;
    }

    navigate(`/course/${slug}/section/${section.id}`);
  };

  const calculateSectionDuration = () => {
    const totalMinutes = section.items.reduce((total, item) => total + item.duration, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const parts = [];

    if (hours > 0) {
      parts.push(t('courseSection.duration.hours', { count: hours }));
    }

    if (minutes > 0) {
      parts.push(t('courseSection.duration.minutes', { count: minutes }));
    }

    if (parts.length === 0) {
      return t('courseSection.duration.minutes', { count: 0 });
    }

    return parts.join(' ');
  };

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
              duration: calculateSectionDuration(),
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
            onClick={handleSectionClick}
            startIcon={<OpenInNewIcon />}
          >
            {t('common.open')}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
