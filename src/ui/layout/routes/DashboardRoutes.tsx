import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';

import { PERMISSION_DENIED } from '@/utils/constants';

import { DashboardContainer, MainContent, Sidebar, SidebarHeader } from './DashboardRoutes.style';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!hasPermission) {
    return <Navigate to="/explore" state={{ action: PERMISSION_DENIED }} />;
  }

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const sidebarWidth = isMobile ? 56 : sidebarCollapsed ? 56 : 240;

  return (
    <DashboardContainer>
      <Sidebar width={sidebarWidth}>
        {!isMobile && (
          <SidebarHeader>
            <IconButton onClick={toggleSidebar} size="small">
              {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </SidebarHeader>
        )}
        <List component="nav">
          {navigationItems.map((item) => (
            <div key={item.path}>
              <ListItemButton
                selected={
                  location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                }
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!isMobile && !sidebarCollapsed && <ListItemText primary={t(item.primary)} />}
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
