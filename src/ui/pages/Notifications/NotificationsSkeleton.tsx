import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const NotificationsSkeleton = () => {
  return (
    <div style={{ marginTop: '16px' }}>
      <Box sx={{ mb: 6, pb: 4, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Skeleton variant="text" width={240} height={48} />
        <Skeleton variant="text" width={320} height={24} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Skeleton variant="rectangular" width={180} height={36} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={160} height={36} sx={{ borderRadius: 1 }} />
      </Box>

      <Box>
        {Array.from({ length: 6 }, (_, index) => (
          <Box
            key={`notification-${index}`}
            sx={{ display: 'flex', gap: 2, py: 1.5, alignItems: 'center' }}
          >
            <Skeleton variant="circular" width={36} height={36} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="70%" height={22} />
              <Skeleton variant="text" width="30%" height={18} />
            </Box>
            <Skeleton variant="rectangular" width={72} height={30} sx={{ borderRadius: 1 }} />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default NotificationsSkeleton;
