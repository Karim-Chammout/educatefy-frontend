import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SectionLoader = () => {
  return (
    <Box sx={{ flex: 1, width: '100%', p: 2, overflowY: 'auto' }}>
      <Box sx={{ maxWidth: 720, mx: 'auto' }}>
        <Skeleton variant="text" height={38} width="70%" />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 3 }}>
          <Skeleton width="98%" />
          <Skeleton width="94%" />
          <Skeleton width="96%" />
        </Box>

        <Skeleton variant="rectangular" sx={{ width: '100%', height: 200, borderRadius: '4px' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 3 }}>
          <Skeleton width="92%" />
          <Skeleton width="65%" />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 4 }}>
          <Skeleton variant="rectangular" width={110} height={36} />
          <Skeleton variant="rectangular" width={150} height={36} />
        </Box>
      </Box>
    </Box>
  );
};

export default SectionLoader;
