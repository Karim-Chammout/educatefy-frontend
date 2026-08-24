import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

const StatCardSkeleton = ({ accentBorder }: { accentBorder?: boolean }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 3,
        height: '100%',
        ...(accentBorder && { borderLeft: '3px solid', borderLeftColor: 'divider' }),
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{ width: 56, height: 56, flexShrink: 0, borderRadius: 1.5 }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Skeleton width={64} height={34} />
        <Skeleton width={110} height={14} />
      </Box>
    </Paper>
  );
};

export default StatCardSkeleton;
