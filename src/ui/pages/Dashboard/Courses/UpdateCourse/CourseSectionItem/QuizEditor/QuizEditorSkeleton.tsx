import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

const QuestionRowSkeleton = () => {
  return (
    <Paper variant="outlined" sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Skeleton variant="rounded" width={40} height={40} />

      <Skeleton variant="circular" width={32} height={32} />

      <Skeleton variant="text" sx={{ flexGrow: 1, height: 22, maxWidth: 280 }} />

      <Skeleton variant="rounded" width={90} height={24} />
      <Skeleton variant="rounded" width={64} height={24} />

      <Skeleton variant="circular" width={36} height={36} />
      <Skeleton variant="circular" width={36} height={36} />
    </Paper>
  );
};

const SwitchRowSkeleton = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Skeleton variant="rounded" width={58} height={26} />
      <Skeleton width={160} height={18} />
    </Box>
  );
};

const QuizEditorSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Skeleton variant="text" height={38} width={180} />
          <Skeleton variant="rectangular" width={100} height={36} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {[110, 80, 130, 100].map((width) => (
            <Box key={`crumb-${width}`} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {width !== 110 && <Skeleton width={12} />}
              <Skeleton height={20} width={width} />
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Skeleton variant="rectangular" sx={{ width: '100%', height: 56 }} />

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          {[0, 1, 2].map((index) => (
            <Box key={`number-${index}`} sx={{ flex: 1 }}>
              <Skeleton variant="rectangular" sx={{ width: '100%', height: 56 }} />
            </Box>
          ))}
        </Box>

        <Skeleton variant="rectangular" sx={{ width: '100%', height: 56 }} />

        <Skeleton variant="rectangular" sx={{ width: '100%', height: 72 }} />
        <Skeleton variant="rectangular" sx={{ width: '100%', height: 72 }} />

        <Box sx={{ mt: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Skeleton variant="text" height={26} width={120} />
            <Skeleton variant="text" height={16} width={170} />
          </Box>

          <QuestionRowSkeleton />
          <QuestionRowSkeleton />
          <QuestionRowSkeleton />

          <Skeleton variant="rectangular" sx={{ width: '100%', height: 40, mt: 2 }} />
        </Box>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SwitchRowSkeleton />
          <SwitchRowSkeleton />
          <SwitchRowSkeleton />
          <SwitchRowSkeleton />
        </Box>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          position: 'fixed',
          bottom: 0,
          insetInlineStart: 0,
          insetInlineEnd: 0,
          borderRadius: 0,
          px: { xxs: 2, sm: 4 },
          py: 1.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Skeleton variant="rectangular" width={110} height={36} />
        <Skeleton variant="rectangular" width={140} height={36} />
      </Paper>
    </Container>
  );
};

export default QuizEditorSkeleton;
