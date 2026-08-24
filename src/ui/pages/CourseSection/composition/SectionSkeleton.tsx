import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

import { ContentArea, MobileMenuButton, NavigationPanel, SectionContainer } from '../Section.style';
import SectionLoader from './SectionLoader';

const NavItemSkeleton = ({ withDuration }: { withDuration: boolean }) => {
  return (
    <Box sx={{ px: 2, py: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton height={22} width="75%" />
          {withDuration && <Skeleton height={14} width={90} sx={{ mt: 0.5 }} />}
        </Box>
        {!withDuration && <Skeleton variant="circular" width={20} height={20} />}
      </Box>
    </Box>
  );
};

const SectionSkeleton = () => {
  return (
    <SectionContainer>
      <MobileMenuButton>
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton sx={{ ml: 1.5 }} height={22} width={140} />
      </MobileMenuButton>

      <NavigationPanel mobileOpen={false}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" sx={{ mx: 2 }} height={26} width={150} />
        </Box>

        <Divider />

        <Box component="nav">
          <NavItemSkeleton withDuration />
          <NavItemSkeleton withDuration={false} />
          <NavItemSkeleton withDuration />
          <NavItemSkeleton withDuration />
          <NavItemSkeleton withDuration={false} />
        </Box>
      </NavigationPanel>

      <ContentArea>
        <SectionLoader />
      </ContentArea>
    </SectionContainer>
  );
};

export default SectionSkeleton;
