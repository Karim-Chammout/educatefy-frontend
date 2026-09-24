import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

const TeacherCardSkeleton = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        width: '100%',
        maxWidth: 320,
        minHeight: 248,
        height: '100%',
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
          px: 2,
          pt: 3.5,
          pb: 2.5,
        }}
      >
        <Skeleton variant="circular" width={88} height={88} />
        <Skeleton variant="text" width="65%" height={28} sx={{ mt: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, width: '100%', mt: 0.5 }}>
          <Skeleton variant="rounded" width={56} height={24} />
          <Skeleton variant="rounded" width={48} height={24} />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          py: 1.5,
          bgcolor: 'action.hover',
        }}
      >
        <Skeleton variant="circular" width={18} height={18} />
        <Skeleton width={90} />
      </Box>
    </Paper>
  );
};

export default TeacherCardSkeleton;
