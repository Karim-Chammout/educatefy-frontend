import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { StatCardSkeleton } from '@/ui/components';

const ContentHealthRowSkeleton = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Skeleton width={90} height={18} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton variant="rounded" width={70} height={20} />
          <Skeleton variant="rounded" width={60} height={20} />
        </Box>
      </Box>

      <Skeleton variant="rectangular" sx={{ width: '100%', height: 8, borderRadius: 4 }} />
    </Box>
  );
};

const AnalyticsSkeleton = () => {
  return (
    <Box sx={{ p: { xxs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" height={36} width={220} />
        <Skeleton variant="text" height={22} width={320} />
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {Array.from({ length: 4 }, (_, index) => (
          <Grid key={`kpi-${index}`} size={{ xxs: 12, md: 6 }}>
            <StatCardSkeleton accentBorder />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xxs: 12 }}>
          <Card variant="outlined">
            <CardContent>
              <Skeleton sx={{ mb: 2 }} height={22} width={170} />
              <Skeleton
                variant="rectangular"
                sx={{ width: '100%', height: 220, borderRadius: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xxs: 12 }}>
          <Card variant="outlined">
            <CardContent>
              <Skeleton sx={{ mb: 3 }} height={22} width={150} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <ContentHealthRowSkeleton />
                <ContentHealthRowSkeleton />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton width={140} height={16} />
                  <Skeleton width={40} height={16} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton width={160} height={16} />
                  <Skeleton width={40} height={16} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card variant="outlined">
        <CardContent>
          <Skeleton sx={{ mb: 2 }} height={22} width={180} />

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
                gridTemplateColumns: '2fr repeat(6, minmax(0, 1fr))',
                gap: 2,
                alignItems: 'center',
                px: 2,
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              {Array.from({ length: 7 }, (_, index) => (
                <Skeleton
                  key={`head-${index}`}
                  height={16}
                  width={`${50 + ((index * 11) % 30)}%`}
                />
              ))}
            </Box>

            {[0, 1, 2].map((rowIndex) => (
              <Box
                key={`row-${rowIndex}`}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr repeat(6, minmax(0, 1fr))',
                  gap: 2,
                  alignItems: 'center',
                  px: 2,
                  py: 1.5,
                  borderBottom: rowIndex < 2 ? '1px solid' : undefined,
                  borderColor: 'divider',
                }}
              >
                <Skeleton height={16} width={`${55 + ((rowIndex * 13) % 25)}%`} />
                <Skeleton variant="rounded" height={20} width={54} />
                <Skeleton height={14} width="45%" />
                <Skeleton height={14} width="45%" />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Skeleton variant="rectangular" sx={{ width: 60, height: 6, borderRadius: 3 }} />
                  <Skeleton width={28} />
                </Box>

                <Skeleton height={14} width="35%" />
                <Skeleton height={14} width="35%" />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalyticsSkeleton;
