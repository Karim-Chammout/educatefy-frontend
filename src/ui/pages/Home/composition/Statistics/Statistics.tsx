import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { useTranslation } from 'react-i18next';

import { StatisticsFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { StatCard, StatContent, StatIcon } from './Statistics.style';

const Statistics = ({ statistics }: { statistics: StatisticsFragment }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xxs: 12, sm: 4 }}>
          <StatCard variant="outlined">
            <StatIcon>
              <MenuBookIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            </StatIcon>
            <StatContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {statistics.enrolledCoursesCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('statistics.enrolledCourses')}
              </Typography>
            </StatContent>
          </StatCard>
        </Grid>

        <Grid size={{ xxs: 12, sm: 4 }}>
          <StatCard variant="outlined">
            <StatIcon>
              <SchoolIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            </StatIcon>
            <StatContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {statistics.completedCoursesCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('statistics.completedCourses')}
              </Typography>
            </StatContent>
          </StatCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
