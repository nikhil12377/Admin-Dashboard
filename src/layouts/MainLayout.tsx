import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { NotificationSnackbar } from '../components/NotificationSnackbar';
import { useThemeMode } from '../hooks/useThemeMode';
import { Box } from '@mui/material';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  useThemeMode(); 

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <TopNav />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px',
        }}
      >
        {children}
      </Box>
      <NotificationSnackbar />
    </Box>
  );
};
