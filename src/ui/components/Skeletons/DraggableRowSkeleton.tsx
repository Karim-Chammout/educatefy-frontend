import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

type DraggableRowSkeletonProps = {
  trailingIcons?: number;
  showOpenButton?: boolean;
};

const DraggableRowSkeleton = ({ trailingIcons = 2, showOpenButton }: DraggableRowSkeletonProps) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', py: 1 }}>
        <Skeleton variant="rounded" width={24} height={24} sx={{ flexShrink: 0 }} />

        <Skeleton sx={{ flexGrow: 1, minWidth: 120 }} height={22} />

        {Array.from({ length: trailingIcons }, (_, index) => (
          <Skeleton key={`icon-${index}`} variant="circular" width={40} height={40} />
        ))}

        {showOpenButton && <Skeleton variant="rectangular" width={80} height={30} />}
      </Box>

      <Divider />
    </>
  );
};

export default DraggableRowSkeleton;
