import ExploreIcon from '@mui/icons-material/Explore';
import { useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router';

import logoDark from '@/assets/logo_dark.png';
import logoLight from '@/assets/logo_light.png';
import { Button } from '@/ui/components';
import { LanguagePicker } from '@/ui/compositions';
import { useThemeContext } from '@/ui/theme/ThemeContext';
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
  const { themeMode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const shouldShowCTA = !['/login', '/register'].includes(location.pathname);

  return (
    <AppBar position="sticky" color="inherit">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <LogoWrapper>
            <img
              src={themeMode === 'light' ? logoDark : logoLight}
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
          <Box sx={{ mx: 1 }}>
            <LanguagePicker />
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
