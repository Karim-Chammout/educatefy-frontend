import BarChartIcon from '@mui/icons-material/BarChart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';

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
    primary: 'dashboard.analytics',
    icon: <BarChartIcon />,
    path: '/dashboard/analytics',
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

  const activeTab = navigationItems.find(
    (item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`),
  )?.path;

  if (isMobile) {
    return (
      <>
        <Tabs
          value={activeTab || false}
          onChange={(_, newValue) => navigate(newValue)}
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            mb: 2,
            '& .MuiTab-root': {
              minWidth: 80,
              px: 1.5,
            },
          }}
        >
          {navigationItems.map((item) => (
            <Tab
              key={item.path}
              label={t(item.primary)}
              value={item.path}
              icon={item.icon}
              iconPosition="start"
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Tabs>
        <Outlet />
      </>
    );
  }

  return (
    <DashboardContainer>
      <Sidebar width={sidebarCollapsed ? 56 : 240}>
        <SidebarHeader>
          <IconButton onClick={() => setSidebarCollapsed(!sidebarCollapsed)} size="small">
            {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </SidebarHeader>
        <List component="nav" disablePadding>
          {navigationItems.map((item) => (
            <div key={item.path}>
              <Tooltip title={sidebarCollapsed ? t(item.primary) : ''} placement="right" arrow>
                <ListItemButton
                  selected={
                    location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                  }
                  onClick={() => navigate(item.path)}
                  sx={{
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    px: sidebarCollapsed ? 0 : 2,
                    minHeight: 48,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: sidebarCollapsed ? 'unset' : 40,
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!sidebarCollapsed && (
                    <ListItemText
                      primary={t(item.primary)}
                      slotProps={{
                        primary: { sx: { textTransform: 'capitalize' } },
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
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
