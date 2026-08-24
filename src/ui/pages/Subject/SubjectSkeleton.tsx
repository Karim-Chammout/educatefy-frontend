import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { ContentCardSkeleton } from '@/ui/components';

const StatBlockSkeleton = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Skeleton variant="text" sx={{ mx: 'auto' }} width={56} height={40} />
      <Skeleton variant="text" sx={{ mx: 'auto' }} width={96} height={18} />
    </Box>
  );
};

const SubjectSkeleton = () => {
  return (
    <div style={{ marginTop: '16px' }}>
      <Box
        sx={{
          mb: 6,
          pb: 4,
          borderBottom: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
        }}
      >
        <Skeleton variant="text" sx={{ mx: 'auto', mb: 2 }} width={320} height={48} />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
          {Array.from({ length: 4 }, (_, index) => (
            <StatBlockSkeleton key={`stat-${index}`} />
          ))}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {Array.from({ length: 8 }, (_, index) => (
          <Grid
            key={`content-${index}`}
            size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ContentCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SubjectSkeleton;
