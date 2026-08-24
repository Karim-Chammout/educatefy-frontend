import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

type TableSkeletonProps = {
  columns?: number;
  rows?: number;
  toolbar?: boolean;
};

const TableSkeleton = ({ columns = 6, rows = 10, toolbar = true }: TableSkeletonProps) => {
  return (
    <Box>
      {toolbar && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            pb: 2,
          }}
        >
          <Skeleton variant="rectangular" width={220} height={36} />
          <Skeleton variant="rectangular" sx={{ width: { xxs: '40%', sm: 260 }, height: 56 }} />
        </Box>
      )}

      <Paper variant="outlined">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: 2,
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'action.hover',
          }}
        >
          {Array.from({ length: columns }, (_, index) => (
            <Skeleton key={`header-${index}`} height={20} />
          ))}
        </Box>

        {Array.from({ length: rows }, (_, rowIndex) => (
          <Box
            key={`row-${rowIndex}`}
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gap: 2,
              alignItems: 'center',
              px: 2,
              py: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            {Array.from({ length: columns }, (__, cellIndex) => (
              <Skeleton
                key={`cell-${rowIndex}-${cellIndex}`}
                height={16}
                width={`${60 + ((rowIndex * 7 + cellIndex * 13) % 35)}%`}
              />
            ))}
          </Box>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Skeleton width={220} height={32} />
        </Box>
      </Paper>
    </Box>
  );
};

export default TableSkeleton;
