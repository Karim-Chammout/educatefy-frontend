import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

import { AccountRole, AccountFragment } from '@/generated/graphql';

const FieldSkeleton = () => {
  return (
    <Box>
      <Skeleton width={110} height={16} />

      <Skeleton variant="rectangular" sx={{ width: '100%', height: 56, mt: 1 }} />
    </Box>
  );
};

const SetupProfileSkeleton = ({ userInfo }: { userInfo: AccountFragment }) => {
  return (
    <Container maxWidth="xs" sx={{ my: 2 }}>
      <Skeleton variant="text" height={42} width={220} sx={{ mb: 3 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <FieldSkeleton />

        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />

        {userInfo.accountRole === AccountRole.Teacher && (
          <>
            <FieldSkeleton />

            <Box>
              <Skeleton width={50} height={16} />

              <Skeleton variant="rectangular" sx={{ width: '100%', height: 80, mt: 1 }} />
            </Box>

            <Box>
              <Skeleton width={95} height={16} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                <Skeleton height={14} width="90%" />
                <Skeleton height={14} width="75%" />
                <Skeleton height={14} width="82%" />
              </Box>
            </Box>
          </>
        )}
      </div>

      <Divider sx={{ mt: 4, mb: 4 }} />

      <Skeleton variant="rectangular" sx={{ width: '100%', height: 36 }} />
    </Container>
  );
};

export default SetupProfileSkeleton;
