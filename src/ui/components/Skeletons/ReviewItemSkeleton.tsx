import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ReviewItemSkeleton = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Skeleton width={140} height={18} />
          <Skeleton width={90} height={12} />
        </Box>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Skeleton variant="rectangular" width={120} height={20} sx={{ borderRadius: 1 }} />
      </Box>

      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        <Skeleton width="95%" />
        <Skeleton width="70%" />
      </Box>
    </Box>
  );
};

export default ReviewItemSkeleton;
