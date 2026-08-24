import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';

import { ReviewItemSkeleton, StatCardSkeleton } from '@/ui/components';

const SectionCompletionRowSkeleton = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Skeleton width={160} height={16} />
        <Skeleton width={110} height={14} />
      </Box>

      <Skeleton variant="rectangular" sx={{ width: '100%', height: 8, borderRadius: 4 }} />
    </Box>
  );
};

const DemographicColumnSkeleton = () => {
  return (
    <Box>
      <Skeleton height={18} width={90} sx={{ mb: 1.5 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {[0, 1, 2].map((index) => (
          <Box key={`item-${index}`}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Skeleton width={80} height={13} />
              <Skeleton width={24} height={13} />
            </Box>

            <Skeleton variant="rectangular" sx={{ width: '100%', height: 6, borderRadius: 3 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const StudentRowSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '2fr repeat(5, minmax(0, 1fr))',
        gap: 2,
        alignItems: 'center',
        px: 2,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Skeleton variant="circular" width={28} height={28} />

        <Box>
          <Skeleton height={14} width={90} />
          <Skeleton height={11} width={60} />
        </Box>
      </Box>

      <Skeleton height={13} width="55%" />
      <Skeleton height={13} width="55%" />
      <Skeleton height={13} width="30%" />
      <Skeleton height={13} width="65%" />
      <Skeleton variant="rounded" height={20} width={70} />
    </Box>
  );
};

const CourseDetailAnalyticsSkeleton = () => {
  return (
    <Box sx={{ p: { xxs: 2, sm: 3 }, maxWidth: 1100 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <IconButton size="small" disabled>
          <Skeleton variant="circular" width={20} height={20} />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant="text" height={28} width={220} />
          <Skeleton variant="rounded" height={20} width={70} />
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {Array.from({ length: 4 }, (_, index) => (
          <Grid key={`kpi-${index}`} size={{ xxs: 12, md: 6 }}>
            <StatCardSkeleton accentBorder />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xxs: 12, md: 5 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Skeleton sx={{ mb: 2 }} height={22} width={180} />
              <Skeleton variant="circular" sx={{ width: 180, height: 180, mx: 'auto', my: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xxs: 12, md: 7 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Skeleton sx={{ mb: 2 }} height={22} width={170} />
              <Skeleton
                variant="rectangular"
                sx={{ width: '100%', height: 200, borderRadius: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Skeleton sx={{ mb: 2 }} height={22} width={190} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SectionCompletionRowSkeleton />
            <SectionCompletionRowSkeleton />
            <SectionCompletionRowSkeleton />
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Skeleton sx={{ mb: 3 }} height={22} width={210} />

          <Grid container spacing={4}>
            {Array.from({ length: 4 }, (_, index) => (
              <Grid key={`demo-${index}`} size={{ xxs: 12, sm: 6, lg: 3 }}>
                <DemographicColumnSkeleton />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Skeleton sx={{ mb: 2 }} height={22} width={150} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ReviewItemSkeleton />
            <ReviewItemSkeleton />
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent sx={{ pb: '16px !important' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Skeleton height={22} width={160} />
            <Skeleton height={16} width={90} />
          </Box>

          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '2fr repeat(5, minmax(0, 1fr))',
                gap: 2,
                alignItems: 'center',
                px: 2,
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={`head-${index}`} height={15} width={`${45 + ((index * 9) % 30)}%`} />
              ))}
            </Box>

            {Array.from({ length: 6 }, (_, index) => (
              <StudentRowSkeleton key={`student-${index}`} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Chip label={<Skeleton width={120} />} size="small" sx={{ px: 2 }} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseDetailAnalyticsSkeleton;
