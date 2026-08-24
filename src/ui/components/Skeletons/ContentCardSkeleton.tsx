import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

const ContentCardSkeleton = () => {
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: '4px', width: '100%', maxWidth: 420, minWidth: 280, height: '100%' }}
    >
      <Box sx={{ p: 2 }}>
        <Skeleton variant="rectangular" sx={{ width: '100%', height: 200, borderRadius: '4px' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            pt: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 1,
            }}
          >
            <Skeleton variant="rounded" width={70} height={24} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Skeleton width={30} />
              <Skeleton width={30} />
            </Box>
          </Box>

          <Skeleton width="90%" />
          <Skeleton width="60%" />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton width={90} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ContentCardSkeleton;
