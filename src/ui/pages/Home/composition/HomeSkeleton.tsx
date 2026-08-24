import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { ContentCardSkeleton, StatCardSkeleton } from '@/ui/components';

const CoursesSectionSkeleton = () => {
  return (
    <Box sx={{ my: 6 }}>
      <Skeleton sx={{ mb: 2 }} height={34} width={260} />

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
    </Box>
  );
};

const HomeSkeleton = () => {
  return (
    <div style={{ marginTop: '16px' }}>
      <Box
        sx={{
          textAlign: 'center',
          mb: 6,
          pb: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Skeleton variant="text" sx={{ mx: 'auto' }} width={280} height={48} />
        <Skeleton variant="text" sx={{ mx: 'auto' }} width={220} height={28} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xxs: 12, sm: 4 }}>
            <StatCardSkeleton />
          </Grid>
          <Grid size={{ xxs: 12, sm: 4 }}>
            <StatCardSkeleton />
          </Grid>
        </Grid>
      </Box>

      <CoursesSectionSkeleton />
      <CoursesSectionSkeleton />
    </div>
  );
};

export default HomeSkeleton;
