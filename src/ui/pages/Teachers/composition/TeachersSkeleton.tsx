import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const TeacherListItemSkeleton = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      p: 2,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Skeleton variant="circular" width={72} height={72} />
    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
      <Skeleton variant="text" width={200} height={28} />
      <Skeleton variant="text" width={280} height={20} />
      <Skeleton variant="text" width={120} height={16} />
    </Box>
  </Box>
);

const TeachersSkeleton = () => {
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

      <Stack spacing={3}>
        {Array.from({ length: 8 }, (_, index) => (
          <TeacherListItemSkeleton key={index} />
        ))}
      </Stack>
    </div>
  );
};

export default TeachersSkeleton;
