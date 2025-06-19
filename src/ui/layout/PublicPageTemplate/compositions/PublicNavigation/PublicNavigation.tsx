import ExploreIcon from '@mui/icons-material/Explore';
import { useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router';

import logo from '@/assets/logo.png';
import { Button } from '@/ui/components';
import { savePostLoginRedirectPath } from '@/utils/savePostLoginRedirectPath';

import { LogoWrapper, StyledNavLink } from './PublicNavigation.style';

const navItems = [
  {
    label: 'navigation.explore',
    icon: <ExploreIcon />,
    path: '/explore',
  },
];

const PublicNavigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const shouldShowCTA = !['/login', '/register'].includes(location.pathname);

  return (
    <AppBar position="sticky" color="inherit">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <LogoWrapper>
            <img
              src={logo}
              width={60}
              alt="Logo"
              role="presentation"
              onClick={() => navigate('/explore')}
            />
          </LogoWrapper>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {navItems.map((item) => (
              <StyledNavLink key={item.path} to={item.path}>
                {item.icon}
                {t(item.label)}
              </StyledNavLink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {shouldShowCTA &&
              (isMobile ? (
                <Button
                  variant="contained"
                  LinkComponent={Link}
                  to="/login"
                  onClick={() => savePostLoginRedirectPath(location.pathname)}
                >
                  {t('publicNavigation.continue')}
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    LinkComponent={Link}
                    to="/login"
                    onClick={() => savePostLoginRedirectPath(location.pathname)}
                  >
                    {t('publicNavigation.login')}
                  </Button>
                  <Button
                    variant="contained"
                    LinkComponent={Link}
                    to="/register"
                    onClick={() => savePostLoginRedirectPath(location.pathname)}
                  >
                    {t('publicNavigation.register')}
                  </Button>
                </Box>
              ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PublicNavigation;
