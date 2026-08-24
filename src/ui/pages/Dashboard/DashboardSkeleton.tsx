import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { StatCardSkeleton } from '@/ui/components';

const DashboardSkeleton = () => {
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
        <Box sx={{ width: '100%' }}>
          <Skeleton variant="text" height={36} width={280} />
          <Skeleton variant="text" height={22} width={200} />
        </Box>
        <Chip
          label={<Skeleton width={80} />}
          variant="outlined"
          size="small"
          sx={{ alignSelf: { xxs: 'flex-start', sm: 'center' }, flexShrink: 0 }}
        />
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {Array.from({ length: 4 }, (_, index) => (
          <Grid key={`stat-${index}`} size={{ xxs: 12, md: 6 }}>
            <StatCardSkeleton accentBorder />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 3 }} />

      <Box>
        <Skeleton height={18} width={110} sx={{ mb: 1.5, display: 'block' }} />

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Skeleton variant="rectangular" width={130} height={31} />
          <Skeleton variant="rectangular" width={145} height={31} />
          <Skeleton variant="rectangular" width={150} height={31} />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardSkeleton;
