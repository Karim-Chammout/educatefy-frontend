import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

const InfoSectionSkeleton = ({
  children,
  withAction = true,
}: {
  children: React.ReactNode;
  withAction?: boolean;
}) => {
  return (
    <Paper variant="outlined">
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton height={24} width={180} />
          {withAction && (
            <Skeleton
              variant="rectangular"
              width={100}
              height={36}
              sx={{ marginInlineStart: 'auto' }}
            />
          )}
        </Box>

        {children}
      </Box>
    </Paper>
  );
};

const ProfileFieldSkeleton = () => {
  return (
    <Box>
      <Skeleton height={16} width={90} />
      <Skeleton height={22} width={140} sx={{ mt: 0.5 }} />
    </Box>
  );
};

const DeviceRowSkeleton = () => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
        <Skeleton variant="rounded" width={40} height={40} />

        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton width={170} height={20} />
            <Skeleton variant="rounded" width={100} height={22} />
          </Box>

          <Skeleton width={190} height={14} sx={{ mt: 0.5 }} />
        </Box>

        <Skeleton variant="rectangular" width={90} height={30} />
      </Box>

      <Divider />
    </>
  );
};

const ProfileSkeleton = () => {
  return (
    <div style={{ marginTop: '16px' }}>
      <Paper variant="outlined" sx={{ mb: 3 }}>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xxs: 'column', md: 'row' },
              alignItems: { xxs: 'center', md: 'flex-start' },
              gap: 3,
              textAlign: { xxs: 'center', md: 'start' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
                flexShrink: 0,
              }}
            >
              <Skeleton variant="circular" width={120} height={120} />
              <Skeleton variant="rounded" width={150} height={30} />
            </Box>

            <Box sx={{ flex: 1, alignSelf: 'center' }}>
              <Skeleton variant="text" height={42} width={240} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Skeleton variant="text" height={24} width={120} />
                <Skeleton variant="rounded" width={80} height={24} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xxs: 12 }}>
          <InfoSectionSkeleton>
            <Grid container spacing={3}>
              {Array.from({ length: 7 }, (_, index) => (
                <Grid key={`field-${index}`} size={{ xxs: 12, sm: 6 }}>
                  <ProfileFieldSkeleton />
                </Grid>
              ))}
            </Grid>
          </InfoSectionSkeleton>
        </Grid>

        <Grid size={{ xxs: 12 }}>
          <InfoSectionSkeleton>
            <Box sx={{ mb: 3 }}>
              <Skeleton height={16} width={80} sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Skeleton variant="rounded" width={110} height={32} />
                <Skeleton variant="rounded" width={90} height={32} />
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Skeleton height={16} width={50} sx={{ mb: 2 }} />
              <Skeleton width="70%" />
              <Skeleton width="45%" />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Skeleton height={16} width={95} sx={{ mb: 2 }} />
              <Skeleton width="92%" />
              <Skeleton width="85%" />
              <Skeleton width="88%" />
              <Skeleton width="50%" />
            </Box>
          </InfoSectionSkeleton>
        </Grid>

        <Grid size={{ xxs: 12 }}>
          <InfoSectionSkeleton>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant="rounded" width={120} height={32} />
              <Skeleton variant="rounded" width={120} height={32} />
            </Box>
          </InfoSectionSkeleton>
        </Grid>

        <Grid size={{ xxs: 12 }}>
          <InfoSectionSkeleton withAction={false}>
            <Skeleton variant="rectangular" width={300} height={56} />
          </InfoSectionSkeleton>
        </Grid>

        <Grid size={{ xxs: 12 }}>
          <InfoSectionSkeleton withAction={false}>
            {Array.from({ length: 3 }, (_, index) => (
              <Box
                key={`notification-${index}`}
                sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}
              >
                <Skeleton width={160} height={20} sx={{ flexGrow: 1 }} />
                <Skeleton variant="rounded" width={34} height={20} />
                <Skeleton variant="rounded" width={34} height={20} />
              </Box>
            ))}
          </InfoSectionSkeleton>
        </Grid>

        <Grid size={{ xxs: 12 }}>
          <InfoSectionSkeleton withAction={false}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
            >
              <Skeleton width={260} height={16} />
              <Skeleton variant="rectangular" width={190} height={30} />
            </Box>

            <DeviceRowSkeleton />
            <DeviceRowSkeleton />
          </InfoSectionSkeleton>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileSkeleton;
