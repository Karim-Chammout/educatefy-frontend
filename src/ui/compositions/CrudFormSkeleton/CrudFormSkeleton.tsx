import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

type CrudFormSkeletonProps = {
  variant: 'course' | 'program';
  update?: boolean;
};

const InputSkeleton = () => <Skeleton variant="rectangular" sx={{ width: '100%', height: 56 }} />;

const FormSection = ({ children }: { children: React.ReactNode }) => (
  <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
    {children}
  </Paper>
);

const SectionHeader = () => (
  <Box sx={{ mb: 3 }}>
    <Skeleton height={24} width={150} />
    <Skeleton height={14} width={230} />
  </Box>
);

const ListSectionSkeleton = () => {
  return (
    <FormSection>
      <SectionHeader />

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <InputSkeleton />
        <Skeleton variant="rectangular" width={70} height={36} />
      </Box>

      <Box sx={{ mt: 2 }}>
        {[0, 1].map((index) => (
          <Box key={`item-${index}`}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
              <Skeleton width={`${55 + index * 15}%`} />
              <Skeleton variant="rectangular" width={48} height={28} />
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
    </FormSection>
  );
};

const CrudFormSkeleton = ({ variant, update }: CrudFormSkeletonProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Skeleton variant="text" height={38} width={260} />
        <Skeleton variant="rectangular" width={100} height={36} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormSection>
          <SectionHeader />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <InputSkeleton />
            <InputSkeleton />

            {!update ? (
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <InputSkeleton />
                <Skeleton variant="rectangular" width={130} height={36} />
              </Box>
            ) : (
              <InputSkeleton />
            )}

            {variant === 'course' && <InputSkeleton />}
            <InputSkeleton />
            <InputSkeleton />
            {variant === 'course' && <InputSkeleton />}

            {variant === 'course' && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <InputSkeleton />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputSkeleton />
                </Box>
              </Box>
            )}

            <Box>
              <Skeleton height={20} width={110} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" sx={{ width: '100%', height: 40 }} />
              <Skeleton variant="rectangular" sx={{ width: '100%', height: 180, mt: -0.25 }} />
            </Box>
          </Box>
        </FormSection>

        <FormSection>
          <Skeleton height={24} width={120} sx={{ mb: 3 }} />

          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 1,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton width={180} />
            <Skeleton width={120} />
          </Box>
        </FormSection>

        <ListSectionSkeleton />
        <ListSectionSkeleton />

        {update && variant === 'course' && (
          <FormSection>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Box>
                <Skeleton height={24} width={100} />
                <Skeleton height={14} width={220} />
              </Box>
              <Skeleton variant="rectangular" width={160} height={36} />
            </Box>
          </FormSection>
        )}

        {update && variant === 'program' && (
          <FormSection>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box>
                <Skeleton height={24} width={100} />
                <Skeleton height={14} width={220} />
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rectangular" width={150} height={36} />
                <Skeleton variant="rectangular" width={140} height={36} />
              </Box>
            </Box>

            <Skeleton variant="rounded" sx={{ width: '100%', height: 48, mb: 3 }} />

            {[0, 1].map((index) => (
              <Box
                key={`course-${index}`}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 1.5,
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Skeleton variant="rectangular" width={48} height={48} sx={{ borderRadius: 1 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Skeleton width="45%" />
                  <Skeleton variant="rounded" width={90} height={20} sx={{ mt: 0.5 }} />
                </Box>
              </Box>
            ))}
          </FormSection>
        )}

        <FormSection>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1 }}>
            <Skeleton variant="rounded" width={58} height={26} />
            <Skeleton width={130} height={18} />
          </Box>
        </FormSection>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          {update ? <Skeleton variant="rectangular" width={110} height={36} /> : <span />}

          <Box sx={{ display: 'flex', gap: 2 }}>
            {!update && <Skeleton variant="rectangular" width={100} height={36} />}
            <Skeleton variant="rectangular" width={140} height={36} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CrudFormSkeleton;
