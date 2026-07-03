import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LineChart } from '@mui/x-charts/LineChart';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { TeacherAnalyticsDataFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { ContentHealthBar, KpiCard, SortableCell, SortKey } from './composition';

type KpiCardType = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accentColor: string;
  subtitle?: string;
};

const Analytics = ({ data }: { data: TeacherAnalyticsDataFragment }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [sortKey, setSortKey] = useState<SortKey>('enrolledCount');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sortedCourseStats = [...data.courseStats].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    return sortDir === 'asc'
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const trendDates = data.enrollmentTrend.map((p) => format(parseISO(p.date), 'MMM d'));
  const trendCounts = data.enrollmentTrend.map((p) => p.count);

  const kpis: KpiCardType[] = [
    {
      icon: <GroupsIcon sx={{ fontSize: 28 }} />,
      label: t('analytics.totalEnrollments'),
      value: data.totalEnrollments,
      accentColor: 'primary.main',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 28 }} />,
      label: t('analytics.completionRate'),
      value: `${data.overallCompletionRate}%`,
      accentColor: 'success.main',
      subtitle: `${data.totalCompletions} completions`,
    },
    {
      icon: <StarIcon sx={{ fontSize: 28 }} />,
      label: t('analytics.averageRating'),
      value: data.overallAverageRating > 0 ? data.overallAverageRating.toFixed(2) : '—',
      accentColor: 'warning.main',
      subtitle: `${data.totalReviewsCount} reviews`,
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 28 }} />,
      label: t('analytics.newFollowers'),
      value: data.newFollowersLastMonth,
      accentColor: 'secondary.main',
      subtitle: 'last 30 days',
    },
  ];

  return (
    <Box sx={{ p: { xxs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
          {t('analytics.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('analytics.subtitle')}
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {kpis.map((kpi) => (
          <Grid key={kpi.label} size={{ xxs: 12, md: 6 }}>
            <KpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xxs: 12 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                {t('analytics.enrollmentTrend')}
              </Typography>
              <LineChart
                xAxis={[
                  {
                    data: trendDates,
                    scaleType: 'point',
                    tickLabelInterval: (_, i) => i % 5 === 0, // show every 5th label
                  },
                ]}
                series={[
                  {
                    data: trendCounts,
                    label: t('analytics.enrollments'),
                    area: true,
                    showMark: false,
                    color: theme.palette.primary.main,
                  },
                ]}
                height={220}
                margin={{ left: 32, right: 16, top: 16, bottom: 32 }}
                grid={{ horizontal: true }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xxs: 12 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
                {t('analytics.contentHealth')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <ContentHealthBar
                  label={t('dashboard.courses')}
                  published={data.publishedCoursesCount}
                  draft={data.draftCoursesCount}
                />
                <ContentHealthBar
                  label={t('dashboard.programs')}
                  published={data.publishedProgramsCount}
                  draft={data.draftProgramsCount}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    {t('analytics.uniqueStudents')}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {data.totalUniqueStudents}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    {t('analytics.programEnrollments')}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {data.totalProgramEnrollments}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card variant="outlined">
        <CardContent sx={{ pb: '16px !important' }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            {t('analytics.courseBreakdown')}
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <SortableCell
                    label={t('analytics.course')}
                    field="denomination"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortableCell
                    label={t('analytics.status')}
                    field="isPublished"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortableCell
                    label={t('analytics.enrolled')}
                    field="enrolledCount"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortableCell
                    label={t('analytics.completed')}
                    field="completedCount"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortableCell
                    label={t('analytics.completionRate')}
                    field="completionRate"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortableCell
                    label={t('analytics.rating')}
                    field="averageRating"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortableCell
                    label={t('analytics.reviews')}
                    field="ratingsCount"
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedCourseStats.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        {t('analytics.noCourses')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedCourseStats.map((course) => (
                    <TableRow
                      key={course.courseId}
                      hover
                      onClick={() => navigate(`/dashboard/analytics/courses/${course.courseId}`)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {course.denomination}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            course.isPublished ? t('analytics.published') : t('analytics.draft')
                          }
                          size="small"
                          color={course.isPublished ? 'success' : 'default'}
                          variant="outlined"
                          sx={{ height: 20, fontSize: 11 }}
                        />
                      </TableCell>
                      <TableCell>{course.enrolledCount}</TableCell>
                      <TableCell>{course.completedCount}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={course.completionRate}
                            sx={{ width: 60, height: 6, borderRadius: 3 }}
                          />
                          <Typography variant="caption">{course.completionRate}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {course.averageRating > 0 ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                            <Typography variant="body2">
                              {course.averageRating.toFixed(1)}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.disabled">
                            —
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{course.ratingsCount}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Analytics;
