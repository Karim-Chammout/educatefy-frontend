import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

import { DraggableRowSkeleton } from '@/ui/components';

type DndListPageSkeletonProps = {
  rows?: number;
  breadcrumbs?: number;
  showOpenButton?: boolean;
};

const DndListPageSkeleton = ({
  rows = 5,
  breadcrumbs = 2,
  showOpenButton = false,
}: DndListPageSkeletonProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {Array.from({ length: breadcrumbs }, (_, index) => (
          <Box key={`crumb-${index}`} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton height={20} width={index === breadcrumbs - 1 ? 90 : 110} />
            {index < breadcrumbs - 1 && <Skeleton width={12} />}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Skeleton variant="text" height={38} width={200} />
        <Skeleton variant="rectangular" width={110} height={36} />
      </Box>

      <Box sx={{ mt: 2 }}>
        {Array.from({ length: rows }, (_, index) => (
          <DraggableRowSkeleton key={`row-${index}`} showOpenButton={showOpenButton} />
        ))}
      </Box>
    </Container>
  );
};

export default DndListPageSkeleton;
