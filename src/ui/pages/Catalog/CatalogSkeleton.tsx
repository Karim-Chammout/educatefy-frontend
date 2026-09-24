import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { ContentCardSkeleton, TeacherCardSkeleton } from '@/ui/components';

const CatalogSkeleton = () => {
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1,
          mb: 5,
        }}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={`chip-${index}`} variant="rounded" height={32} width={96} />
        ))}
      </Box>

      <Box sx={{ mb: 6 }}>
        <Skeleton variant="text" width={260} height={36} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {Array.from({ length: 4 }, (_, index) => (
            <Grid
              key={`teacher-${index}`}
              size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <TeacherCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Skeleton variant="text" width={220} height={36} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {Array.from({ length: 8 }, (_card, index) => (
            <Grid
              key={`content-${index}`}
              size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ContentCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default CatalogSkeleton;
