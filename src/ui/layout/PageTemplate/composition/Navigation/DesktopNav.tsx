import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { TFunction } from 'i18next';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import logoDark from '@/assets/logo_dark.png';
import logoLight from '@/assets/logo_light.png';
import person from '@/assets/person.png';
import { AccountInfoQuery, AccountRole } from '@/generated/graphql';
import { useThemeContext } from '@/ui/theme/ThemeContext';
import { logout } from '@/utils/logout';

import { LogoWrapper, StyledNavLink } from './Navigation.style';

type NavItemType = {
  label: string;
  icon: JSX.Element;
  path: string;
  roleAccess: AccountRole;
};

const navItems: NavItemType[] = [
  {
    label: 'navigation.home',
    icon: <HomeIcon />,
    path: '/',
    roleAccess: AccountRole.Student,
  },
  {
    label: 'navigation.explore',
    icon: <ExploreIcon />,
    path: '/explore',
    roleAccess: AccountRole.Student,
  },
  {
    label: 'navigation.dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    roleAccess: AccountRole.Teacher,
  },
];

const NavItem = ({ item, t }: { item: NavItemType; t: TFunction<'translation', undefined> }) => {
  return (
    <StyledNavLink to={item.path}>
      {item.icon}
      {t(item.label)}
    </StyledNavLink>
  );
};

const DesktopNavigation = ({ accountInfo }: { accountInfo: AccountInfoQuery['me'] }) => {
  const { t } = useTranslation();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { themeMode, toggleTheme } = useThemeContext();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={0} variant="outlined">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <LogoWrapper>
            <img
              src={themeMode === 'light' ? logoDark : logoLight}
              width={60}
              alt="Logo"
              role="presentation"
              onClick={() => navigate('/')}
            />
          </LogoWrapper>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {accountInfo?.accountRole === AccountRole.Student
              ? navItems
                  .filter((i) => i.roleAccess !== AccountRole.Teacher)
                  .map((navItem) => <NavItem key={navItem.path} item={navItem} t={t} />)
              : navItems.map((item) => <NavItem key={item.path} item={item} t={t} />)}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={accountInfo?.nickname || t('navigation.avatarAlt')}
                src={accountInfo?.avatar_url || person}
              />
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    width: 160,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              disableScrollLock
            >
              <MenuItem
                onClick={() => {
                  navigate('/profile');
                  handleCloseUserMenu();
                }}
              >
                <ListItemIcon>
                  <Person2Icon fontSize="small" />
                </ListItemIcon>
                {t('navigation.profile')}
              </MenuItem>
              <MenuItem onClick={toggleTheme}>
                <ListItemIcon>
                  {themeMode === 'light' ? (
                    <Brightness4 fontSize="small" />
                  ) : (
                    <Brightness7 fontSize="small" />
                  )}
                </ListItemIcon>
                {t(`theme.${themeMode === 'light' ? 'dark' : 'light'}`)}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  handleCloseUserMenu();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                {t('navigation.logout')}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DesktopNavigation;
