import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { MouseEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import person from '@/assets/person.png';
import { AccountInfoQuery, AccountRole } from '@/generated/graphql';
import { UserMenu } from '@/ui/compositions';

const navItems = [
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

const MobileNavigation = ({ accountInfo }: { accountInfo: AccountInfoQuery['me'] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState(location.pathname);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Force update the value of the navigation (when changing the route)
  useEffect(() => {
    if (value !== location.pathname) {
      setValue(location.pathname);
    }
  }, [value, location.pathname]);

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    setValue(location.pathname); // Tricky way to handle the avatar click
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9 }} elevation={3}>
      <BottomNavigation value={value} onChange={handleChange}>
        {accountInfo.accountRole === AccountRole.Student
          ? navItems
              .filter((i) => i.roleAccess !== AccountRole.Teacher)
              .map((item) => (
                <BottomNavigationAction
                  key={item.path}
                  aria-label={t(item.label)}
                  value={item.path}
                  icon={item.icon}
                  onClick={() => navigate(item.path)}
                />
              ))
          : navItems.map((item) => (
              <BottomNavigationAction
                key={item.path}
                aria-label={t(item.label)}
                value={item.path}
                icon={item.icon}
                onClick={() => navigate(item.path)}
              />
            ))}
        <BottomNavigationAction
          onClick={handleAvatarClick}
          icon={
            <Avatar
              alt={accountInfo.nickname || t('navigation.avatarAlt')}
              src={accountInfo.avatar_url || person}
              sx={{ height: '24px', width: '24px' }}
            />
          }
        />
      </BottomNavigation>
      <UserMenu
        accountInfo={accountInfo}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      />
    </Paper>
  );
};

export default MobileNavigation;
