import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

const SubjectTileSkeleton = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 1,
        p: 2,
        borderRadius: '4px',
        height: '100%',
      }}
    >
      <Skeleton height={28} width="65%" />

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rounded" height={24} width={80} />
        <Skeleton variant="rounded" height={24} width={64} />
      </Box>
    </Paper>
  );
};

const ExploreSkeleton = () => {
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
        <Skeleton variant="text" sx={{ mx: 'auto' }} width={280} height={48} />
        <Skeleton variant="text" sx={{ mx: 'auto' }} width={220} height={28} />
      </Box>

      <Grid container spacing={3}>
        {Array.from({ length: 8 }, (_, index) => (
          <Grid key={`subject-${index}`} size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}>
            <SubjectTileSkeleton />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ExploreSkeleton;
