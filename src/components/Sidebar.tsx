import { useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Gauge as DashboardIcon,
  Users as PeopleIcon,
  Settings as SettingsIcon,
  Activity as TimelineIcon,
  BarChart3 as AnalyticsIcon,
} from 'lucide-react';
import { useSidebarStore } from '../store/sidebarStore';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: <DashboardIcon size={20} />,
  },
  {
    label: 'Users & Roles',
    path: '/users',
    icon: <PeopleIcon size={20} />,
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: <AnalyticsIcon size={20} />,
  },
  {
    label: 'Activity Log',
    path: '/activity',
    icon: <TimelineIcon size={20} />,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <SettingsIcon size={20} />,
  },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, close } = useSidebarStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
      if (isMobile) {
        close();
      }
    },
    [navigate, isMobile, close]
  );

  const drawerContent = useMemo(
    () => (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            px: 3,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Admin Dashboard
          </Typography>
        </Box>
        <List sx={{ p: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isActive}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 1,
                    '&.Mui-selected': {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? 'inherit' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    ),
    [location.pathname, handleNavigation]
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: isOpen ? 260 : 0 }, flexShrink: { md: 0 }, transition: 'width 0.3s' }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={isOpen && isMobile}
        onClose={close}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="persistent"
        open={isOpen}
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 260,
            top: '64px',
            height: 'calc(100% - 64px)',
            borderRight: 1,
            borderColor: 'divider',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
