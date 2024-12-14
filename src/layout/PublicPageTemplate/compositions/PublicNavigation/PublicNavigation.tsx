import ExploreIcon from '@mui/icons-material/Explore';
import { useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link, useNavigate } from 'react-router';

import logo from '@/assets/logo.svg';
import { Button } from '@/ui/components';

import { LogoWrapper, StyledNavLink } from './PublicNavigation.style';

const navItems = [
  {
    label: 'Explore',
    icon: <ExploreIcon />,
    path: '/explore',
  },
];

const PublicNavigation = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const shouldShowCTA = !['/login', '/register'].includes(window.location.pathname);

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
                {item.label}
              </StyledNavLink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {shouldShowCTA &&
              (isMobile ? (
                <Button variant="contained" LinkComponent={Link} to="/login">
                  Continue
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="outlined" LinkComponent={Link} to="/login">
                    Log in
                  </Button>
                  <Button variant="contained" LinkComponent={Link} to="/register">
                    Register
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
