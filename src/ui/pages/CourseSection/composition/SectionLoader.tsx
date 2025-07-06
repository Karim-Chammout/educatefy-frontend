import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SectionLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: { xxs: '90%', md: '60%' },
        margin: '16px auto',
      }}
    >
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton height={120} />
    </Box>
  );
};

export default SectionLoader;
