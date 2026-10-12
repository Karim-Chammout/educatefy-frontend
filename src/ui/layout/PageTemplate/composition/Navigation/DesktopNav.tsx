import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { TFunction } from 'i18next';
import { MouseEvent, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import logoDark from '@/assets/logo_dark.png';
import logoLight from '@/assets/logo_light.png';
import person from '@/assets/person.png';
import { AccountInfoQuery, AccountRole } from '@/generated/graphql';
import { LanguagePicker, NotificationBell, UserMenu } from '@/ui/compositions';
import { useThemeContext } from '@/ui/theme/ThemeContext';

import { LogoWrapper, StyledNavLink } from './Navigation.style';

type NavItemType = {
  label: string;
  icon: ReactNode;
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
    label: 'navigation.catalog',
    icon: <LibraryBooksIcon />,
    path: '/catalog',
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
  const { themeMode } = useThemeContext();

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
          <Box sx={{ mx: 1, display: 'flex', alignItems: 'center' }}>
            <NotificationBell />
          </Box>
          <Box sx={{ mx: 2 }}>
            <LanguagePicker />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={accountInfo?.nickname || t('navigation.avatarAlt')}
                src={accountInfo?.avatar_url || person}
                sx={{
                  border: '2px solid',
                  borderColor: anchorElUser ? 'primary.main' : 'divider',
                  transition: 'border-color 0.2s',
                }}
              />
            </IconButton>
            <UserMenu
              accountInfo={accountInfo}
              anchorEl={anchorElUser}
              onClose={handleCloseUserMenu}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DesktopNavigation;
