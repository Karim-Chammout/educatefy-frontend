import DashboardIcon from '@mui/icons-material/Dashboard';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { MouseEvent, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import person from '@/assets/person.png';
import { isLoggedIn } from '@/layout/apolloClient';
import { AccountInfoQuery, AccountRole } from '@/generated/graphql';
import { AuthContext } from '@/ui/context';
import { logout } from '@/utils/logout';

const navItems = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    path: '/',
    roleAccess: AccountRole.Student,
  },
  {
    label: 'Explore',
    icon: <ExploreIcon />,
    path: '/explore',
    roleAccess: AccountRole.Student,
  },
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    roleAccess: AccountRole.Teacher,
  },
];

const MobileNavigation = ({ accountInfo }: { accountInfo: AccountInfoQuery['me'] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    authModal: { setAuthModalVisibility },
  } = useContext(AuthContext);

  const [value, setValue] = useState(location.pathname);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Force update the value of the navigation (when changing the route)
  useEffect(() => {
    if (value !== location.pathname) {
      setValue(location.pathname);
    }
  }, [value, location.pathname]);

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    if (!isLoggedIn()) {
      setAuthModalVisibility('login');

      return;
    }

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
                  // label={item.label}
                  value={item.path}
                  icon={item.icon}
                  onClick={() => navigate(item.path)}
                  sx={{ '&.Mui-selected': { color: '#000' } }}
                />
              ))
          : navItems.map((item) => (
              <BottomNavigationAction
                key={item.path}
                // label={item.label}
                value={item.path}
                icon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{ '&.Mui-selected': { color: '#000' } }}
              />
            ))}
        <BottomNavigationAction
          onClick={handleAvatarClick}
          icon={
            <Avatar
              alt={accountInfo.nickname || 'Avatar'}
              src={accountInfo.avatar_url || person}
              sx={{ height: '24px', width: '24px' }}
            />
          }
        />
      </BottomNavigation>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        disableScrollLock
      >
        <MenuItem
          onClick={() => {
            navigate('/profile');
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <Person2Icon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default MobileNavigation;
