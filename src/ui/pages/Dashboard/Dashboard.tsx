import BarChartIcon from '@mui/icons-material/BarChart';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { InstructorFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { StatCard, StatContent, StatIcon } from './Dashboard.style';

const getTotalStudents = (instructor: InstructorFragment) =>
  instructor.courses.reduce((sum, course) => sum + course.participationCount, 0);

const Dashboard = ({ instructor }: { instructor: InstructorFragment }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const totalStudents = getTotalStudents(instructor);

  const stats = [
    {
      icon: <MenuBookIcon sx={{ fontSize: 28, color: 'primary.main' }} />,
      value: instructor.courses.length,
      label: t('dashboard.totalCourses'),
      accentColor: 'primary.main',
    },
    {
      icon: <CollectionsBookmarkIcon sx={{ fontSize: 28, color: 'secondary.main' }} />,
      value: instructor.programs.length,
      label: t('dashboard.totalPrograms'),
      accentColor: 'secondary.main',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 28, color: 'success.main' }} />,
      value: totalStudents,
      label: t('dashboard.totalStudents'),
      accentColor: 'success.main',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 28, color: 'warning.main' }} />,
      value: instructor.followersCount,
      label: t('dashboard.totalFollowers'),
      accentColor: 'warning.main',
    },
  ];

  return (
    <Box sx={{ p: { xxs: 2, sm: 3 } }}>
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: { xxs: 'column', sm: 'row' },
          alignItems: { xxs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, mb: 0.5, lineHeight: 1.2 }}
          >
            {t('dashboard.welcome', { name: instructor.first_name })}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('dashboard.overview')}
          </Typography>
        </Box>
        <Chip
          label={format(new Date(), 'MMM d, yyyy')}
          variant="outlined"
          size="small"
          sx={{ alignSelf: { xxs: 'flex-start', sm: 'center' }, flexShrink: 0 }}
        />
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid key={stat.label} size={{ xxs: 12, md: 6 }}>
            <StatCard
              variant="outlined"
              sx={{
                borderLeft: '3px solid',
                borderLeftColor: stat.accentColor,
              }}
            >
              <StatIcon>{stat.icon}</StatIcon>
              <StatContent>
                <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {stat.label}
                </Typography>
              </StatContent>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 3 }} />

      <Box>
        <Typography variant="overline" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
          {t('dashboard.quickActions')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<MenuBookIcon />}
            onClick={() => navigate('/dashboard/courses/create')}
          >
            {t('dashboard.newCourse')}
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<CollectionsBookmarkIcon />}
            onClick={() => navigate('/dashboard/programs/create')}
          >
            {t('dashboard.newProgram')}
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<BarChartIcon />}
            onClick={() => navigate('/dashboard/analytics')}
          >
            {t('dashboard.viewAnalytics')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
