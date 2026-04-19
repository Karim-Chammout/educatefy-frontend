import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { InstructorFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { StatCard, StatContent, StatIcon } from './Dashboard.style';

const Dashboard = ({ instructor }: { instructor: InstructorFragment }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          {t('dashboard.welcome', { name: instructor.first_name })}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {t('dashboard.overview')}
        </Typography>
        <Chip label={format(new Date(), 'yyyy-MM-dd')} />
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xxs: 12, sm: 6 }}>
          <StatCard variant="outlined">
            <StatIcon>
              <MenuBookIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            </StatIcon>
            <StatContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {instructor.courses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('dashboard.totalCourses')}
              </Typography>
            </StatContent>
          </StatCard>
        </Grid>

        <Grid size={{ xxs: 12, sm: 6 }}>
          <StatCard variant="outlined">
            <StatIcon>
              <CollectionsBookmarkIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            </StatIcon>
            <StatContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {instructor.programs.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('dashboard.totalPrograms')}
              </Typography>
            </StatContent>
          </StatCard>
        </Grid>

        <Grid size={{ xxs: 12 }}>
          <StatCard variant="outlined">
            <StatIcon>
              <GroupsIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            </StatIcon>
            <StatContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {instructor.followersCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('dashboard.totalFollowers')}
              </Typography>
            </StatContent>
          </StatCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
