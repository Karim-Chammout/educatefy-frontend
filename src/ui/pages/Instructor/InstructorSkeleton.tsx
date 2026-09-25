import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

import { ContentCardSkeleton, StatCardSkeleton } from '@/ui/components';

import {
  FollowActions,
  HeaderIdentity,
  HeaderSection,
  InstructorInfo,
  SocialLinksGroup,
  SocialLinksRow,
} from './Instructor.style';

const InstructorSkeleton = () => {
  return (
    <div style={{ marginTop: '16px' }}>
      <HeaderSection variant="outlined">
        <Skeleton variant="circular" width={120} height={120} />

        <InstructorInfo>
          <HeaderIdentity>
            <Skeleton variant="text" height={40} width="55%" sx={{ mx: { xxs: 'auto', md: 0 } }} />
            <Skeleton
              variant="rectangular"
              width={140}
              height={32}
              sx={{ mx: { xxs: 'auto', md: 0 } }}
            />
          </HeaderIdentity>

          <Box sx={{ width: '100%' }}>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="75%" />
          </Box>

          <SocialLinksGroup>
            <Skeleton variant="text" width={72} height={14} />
            <SocialLinksRow>
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton
                  key={`social-${index}`}
                  variant="rounded"
                  width={index === 0 ? 96 : 88}
                  height={40}
                  sx={{ borderRadius: 999 }}
                />
              ))}
            </SocialLinksRow>
          </SocialLinksGroup>

          <FollowActions>
            <Skeleton variant="rectangular" width={150} height={36} />
          </FollowActions>
        </InstructorInfo>
      </HeaderSection>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Skeleton height={24} width={80} />
        <Skeleton sx={{ mt: 1 }} width="95%" />
        <Skeleton width="85%" />
        <Skeleton width="40%" />
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          {Array.from({ length: 4 }, (_, index) => (
            <Grid key={`stat-${index}`} size={{ xxs: 12, sm: 6, md: 3 }}>
              <StatCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Skeleton sx={{ mb: 3 }} height={34} width={300} />

        <Grid container spacing={3}>
          {Array.from({ length: 4 }, (_, index) => (
            <Grid
              key={`content-${index}`}
              size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ContentCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default InstructorSkeleton;
