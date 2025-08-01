import { useMediaQuery, useTheme } from '@mui/material';

import { useAccountInfoQuery } from '@/generated/graphql';

import DesktopNavigation from './DesktopNav';
import Header from './Header';
import MobileNavigation from './MobileNav';

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, loading, error } = useAccountInfoQuery();

  if (loading || error || !data) {
    return null;
  }

  const NavigationComponent = isMobile ? MobileNavigation : DesktopNavigation;

  return (
    <>
      {isMobile && <Header />}
      <NavigationComponent accountInfo={data.me} />
    </>
  );
};

export default Navigation;
