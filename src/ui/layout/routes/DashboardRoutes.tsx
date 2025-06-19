import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';

import { PERMISSION_DENIED } from '@/utils/constants';

import { DashboardContainer, MainContent, Sidebar } from './DashboardRoutes.style';

const navigationItems = [
  {
    primary: 'dashboard.courses',
    icon: <MenuBookIcon />,
    path: '/dashboard/courses',
  },
  {
    primary: 'dashboard.programs',
    icon: <CollectionsBookmarkIcon />,
    path: '/dashboard/programs',
  },
  {
    primary: 'dashboard.students',
    icon: <GroupsIcon />,
    path: '/dashboard/students',
  },
];

export const DashboardRoutes = ({ hasPermission }: { hasPermission: boolean }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  if (!hasPermission) {
    return <Navigate to="/explore" state={{ action: PERMISSION_DENIED }} />;
  }

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <List component="nav">
          {navigationItems.map((item) => (
            <div key={item.path}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={t(item.primary)} />
              </ListItemButton>
              <Divider />
            </div>
          ))}
        </List>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </DashboardContainer>
  );
};
