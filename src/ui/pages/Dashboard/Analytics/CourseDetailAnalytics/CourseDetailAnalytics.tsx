import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { format, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { CourseDetailAnalyticsDataFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { DemographicBar, KpiCard } from './composition';

const CourseDetailAnalytics = ({
  data,
  pageSize,
  currentOffset,
  onPageChange,
}: {
  data: CourseDetailAnalyticsDataFragment;
  pageSize: number;
  currentOffset: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    meta,
    enrollmentBreakdown,
    dropOffCount,
    completionTransitionCount,
    avgDaysToCompletion,
    ratingDistribution,
    recentReviews,
    sectionCompletionStats,
    audienceDemographics,
    enrolledStudents,
  } = data;

  const totalEnrolled = enrollmentBreakdown.reduce((sum, e) => sum + e.count, 0);
  const totalPages = Math.ceil(enrolledStudents.total / pageSize);
  const currentPage = Math.floor(currentOffset / pageSize) + 1;

  const pieData = enrollmentBreakdown.map((e, i) => ({
    id: i,
    value: e.count,
    label: e.status.charAt(0).toUpperCase() + e.status.slice(1),
  }));

  const ratingLabels = ratingDistribution.map((r) => `${r.stars}★`);
  const ratingCounts = ratingDistribution.map((r) => r.count);

  return (
    <Box sx={{ p: { xxs: 2, sm: 3 }, maxWidth: 1100 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <IconButton onClick={() => navigate('/dashboard/analytics')} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {meta.denomination}
            </Typography>
            <Chip
              label={meta.isPublished ? t('analytics.published') : t('analytics.draft')}
              size="small"
              color={meta.isPublished ? 'success' : 'default'}
              variant="outlined"
              sx={{ height: 20, fontSize: 11 }}
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xxs: 12, md: 6 }}>
          <KpiCard
            icon={<SchoolIcon sx={{ fontSize: 28 }} />}
            label={t('analytics.totalEnrollments')}
            value={totalEnrolled}
            accentColor="primary.main"
          />
        </Grid>
        <Grid size={{ xxs: 12, md: 6 }}>
          <KpiCard
            icon={<TrendingUpIcon sx={{ fontSize: 28 }} />}
            label={t('analytics.completions')}
            value={completionTransitionCount}
            accentColor="success.main"
            subtitle={
              totalEnrolled > 0
                ? `${((completionTransitionCount / totalEnrolled) * 100).toFixed(1)}% rate`
                : undefined
            }
          />
        </Grid>
        <Grid size={{ xxs: 12, md: 6 }}>
          <KpiCard
            icon={<TrendingDownIcon sx={{ fontSize: 28 }} />}
            label={t('analytics.dropOffs')}
            value={dropOffCount}
            accentColor="error.main"
            subtitle={
              totalEnrolled > 0
                ? `${((dropOffCount / totalEnrolled) * 100).toFixed(1)}% drop-off rate`
                : undefined
            }
          />
        </Grid>
        <Grid size={{ xxs: 12, md: 6 }}>
          <KpiCard
            icon={<SchoolIcon sx={{ fontSize: 28 }} />}
            label={t('analytics.avgDaysToComplete')}
            value={avgDaysToCompletion != null ? `${avgDaysToCompletion}d` : '—'}
            accentColor="warning.main"
            subtitle={avgDaysToCompletion != null ? 'average per student' : 'no completions yet'}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xxs: 12, md: 5 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                {t('analytics.enrollmentBreakdown')}
              </Typography>
              {pieData.every((d) => d.value === 0) ? (
                <Typography variant="body2" color="text.secondary">
                  {t('analytics.noEnrollments')}
                </Typography>
              ) : (
                <PieChart
                  series={[
                    {
                      data: pieData,
                      innerRadius: 50,
                      outerRadius: 90,
                      paddingAngle: 3,
                      cornerRadius: 4,
                      highlightScope: { fade: 'global', highlight: 'item' },
                    },
                  ]}
                  height={220}
                  margin={{ left: 16, right: 16, top: 16, bottom: 16 }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xxs: 12, md: 7 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                {t('analytics.ratingDistribution')}
              </Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ratingLabels }]}
                series={[{ data: ratingCounts, label: t('analytics.reviews'), color: '#f59e0b' }]}
                height={200}
                margin={{ left: 32, right: 16, top: 16, bottom: 32 }}
                grid={{ horizontal: true }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {sectionCompletionStats.length > 0 && (
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              {t('analytics.sectionCompletion')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {sectionCompletionStats.map((section) => (
                <Box key={section.sectionId}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {section.denomination}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {section.completedCount} / {section.totalEnrolled} · {section.completionRate}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={section.completionRate}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
            {t('analytics.audienceDemographics')}
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xxs: 12, sm: 6, lg: 3 }}>
              <DemographicBar
                title={t('analytics.byCountry')}
                data={audienceDemographics.countryBreakdown}
              />
            </Grid>
            <Grid size={{ xxs: 12, sm: 6, lg: 3 }}>
              <DemographicBar
                title={t('analytics.byNationality')}
                data={audienceDemographics.nationalityBreakdown}
              />
            </Grid>
            <Grid size={{ xxs: 12, sm: 6, lg: 3 }}>
              <DemographicBar
                title={t('analytics.byLanguage')}
                data={audienceDemographics.languageBreakdown}
              />
            </Grid>
            <Grid size={{ xxs: 12, sm: 6, lg: 3 }}>
              <DemographicBar
                title={t('analytics.byAge')}
                data={audienceDemographics.ageBreakdown}
                subtitle={`${audienceDemographics.ageDataCoverage} students with age data`}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            {t('analytics.recentReviews')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentReviews.length > 0 ? (
              recentReviews.map((review) => (
                <Box key={review.reviewId}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
                    <Avatar
                      src={review.reviewerAvatarUrl ?? undefined}
                      sx={{ width: 32, height: 32, fontSize: 14 }}
                    >
                      {review.reviewerFirstName?.[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {review.reviewerFirstName}
                          {review.reviewerNickname && (
                            <Typography
                              component="span"
                              variant="caption"
                              color="text.secondary"
                              sx={{ ml: 0.5 }}
                            >
                              @{review.reviewerNickname}
                            </Typography>
                          )}
                        </Typography>
                        <Rating
                          name="rating"
                          value={review.rating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {format(parseISO(review.createdAt), 'MMM d, yyyy')}
                      </Typography>
                    </Box>
                  </Box>
                  {review.review && (
                    <Typography variant="body2" color="text.secondary" sx={{ pl: 6 }}>
                      {review.review}
                    </Typography>
                  )}
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))
            ) : (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  {t('course.emptyReviews')}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent sx={{ pb: '16px !important' }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {t('analytics.enrolledStudents')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {enrolledStudents.total} {t('dashboard.totalStudents').toLowerCase()}
            </Typography>
          </Box>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t('analytics.student')}</TableCell>
                  <TableCell>{t('analytics.country')}</TableCell>
                  <TableCell>{t('analytics.nationality')}</TableCell>
                  <TableCell>{t('analytics.age')}</TableCell>
                  <TableCell>{t('analytics.enrolledAt')}</TableCell>
                  <TableCell>{t('analytics.status')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enrolledStudents.students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        {t('analytics.noStudents')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  enrolledStudents.students.map((student) => (
                    <TableRow key={student.accountId} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar
                            src={student.avatarUrl ?? undefined}
                            sx={{ width: 28, height: 28, fontSize: 12 }}
                          >
                            {student.firstName?.[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {student.firstName}
                            </Typography>
                            {student.nickname && (
                              <Typography variant="caption" color="text.secondary">
                                @{student.nickname}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{student.country ?? '—'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{student.nationality ?? '—'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{student.age ?? '—'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {format(parseISO(student.enrolledAt), 'MMM d, yyyy')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          size="small"
                          color={student.status === 'completed' ? 'success' : 'primary'}
                          variant="outlined"
                          sx={{ height: 20, fontSize: 11 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={onPageChange}
                color="primary"
                size="small"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseDetailAnalytics;
