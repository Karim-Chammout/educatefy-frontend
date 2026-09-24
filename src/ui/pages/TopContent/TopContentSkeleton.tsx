import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { ContentCardSkeleton } from '@/ui/components';

const TopContentSkeleton = () => {
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
        <Skeleton variant="text" sx={{ mx: 'auto' }} width={240} height={48} />
        <Skeleton variant="text" sx={{ mx: 'auto' }} width={320} height={28} />
      </Box>

      <Grid container spacing={3}>
        {Array.from({ length: 8 }, (_, index) => (
          <Grid
            key={index}
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

export default TopContentSkeleton;
