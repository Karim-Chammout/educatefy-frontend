import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

import { ContentCardSkeleton, StatCardSkeleton } from '@/ui/components';

const InstructorSkeleton = () => {
  return (
    <div style={{ marginTop: '16px' }}>
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: { xxs: 'column', md: 'row' },
          alignItems: { xxs: 'center', md: 'flex-start' },
          gap: 4,
          p: 3,
          mb: 3,
          textAlign: { xxs: 'center', md: 'start' },
        }}
      >
        <Skeleton variant="circular" width={120} height={120} />

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignSelf: 'center',
          }}
        >
          <Skeleton variant="text" height={40} width={240} />
          <Box>
            <Skeleton variant="rectangular" width={140} height={36} />
          </Box>
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Skeleton height={24} width={60} />
          <Skeleton sx={{ mt: 1 }} width="90%" />
          <Skeleton width="75%" />
        </Box>

        <Box>
          <Skeleton height={24} width={80} />
          <Skeleton sx={{ mt: 1 }} width="95%" />
          <Skeleton width="85%" />
          <Skeleton width="40%" />
        </Box>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          {Array.from({ length: 4 }, (_, index) => (
            <Grid key={`stat-${index}`} size={{ xxs: 12, sm: 6, md: 3 }}>
              <StatCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Skeleton sx={{ mb: 3 }} height={34} width={300} />

        <Grid container spacing={3}>
          {Array.from({ length: 4 }, (_, index) => (
            <Grid
              key={`content-${index}`}
              size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ContentCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default InstructorSkeleton;
