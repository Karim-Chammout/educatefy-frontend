import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

import { ContentCardSkeleton } from '@/ui/components';

const OverviewListPaperSkeleton = () => {
  return (
    <Paper variant="outlined" sx={{ p: 3, flex: '1 1 auto', minWidth: 280 }}>
      <Skeleton height={24} width={130} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton width="85%" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton width="70%" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton width="78%" />
        </Box>
      </Box>
    </Paper>
  );
};

const ProgramSkeleton = () => {
  return (
    <div style={{ marginTop: '16px' }}>
      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xxs: 'column', md: 'row' }, gap: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <Box>
              <Skeleton variant="text" height={44} width="65%" />

              <Skeleton variant="text" sx={{ mt: 0.5 }} height={30} width="45%" />

              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Skeleton height={22} width={110} />
                <Skeleton height={22} width={85} />
                <Skeleton height={22} width={120} />
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 2 }}>
                <Skeleton variant="rounded" width={96} height={32} />
                <Skeleton variant="rounded" width={80} height={32} />
              </Box>

              <Skeleton variant="rectangular" width={170} height={40} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: '100%',
                maxWidth: { xxs: '100%', md: 400 },
                minHeight: 200,
                maxHeight: 300,
                borderRadius: '4px',
              }}
            />
          </Box>
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Skeleton height={24} width={120} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 2 }}>
          <Skeleton width="98%" />
          <Skeleton width="94%" />
          <Skeleton width="97%" />
          <Skeleton width="55%" />
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
        <OverviewListPaperSkeleton />
        <OverviewListPaperSkeleton />
      </Box>

      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Skeleton sx={{ mb: 3 }} height={24} width={100} />

        <Grid container spacing={3}>
          {Array.from({ length: 4 }, (_, index) => (
            <Grid
              key={`course-${index}`}
              size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ContentCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Skeleton sx={{ mb: 2 }} height={24} width={110} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Skeleton variant="circular" width={96} height={96} />
          <Skeleton height={24} width={180} />
        </Box>

        <Box sx={{ my: 2 }}>
          <Skeleton variant="rectangular" width={150} height={36} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton width="90%" />
          <Skeleton width="70%" />
        </Box>
      </Paper>
    </div>
  );
};

export default ProgramSkeleton;
