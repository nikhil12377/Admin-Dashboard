import { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { MainLayout } from './layouts/MainLayout';
import { SkeletonLoader } from './components/SkeletonLoader';
import { useThemeStore } from './store/themeStore';
import { createAppTheme } from './theme/theme';

const Dashboard = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard })));
const Users = lazy(() => import('./pages/Users').then((module) => ({ default: module.Users })));
const Analytics = lazy(() => import('./pages/Analytics').then((module) => ({ default: module.Analytics })));
const ActivityLog = lazy(() => import('./pages/ActivityLog').then((module) => ({ default: module.ActivityLogPage })));
const Settings = lazy(() => import('./pages/Settings').then((module) => ({ default: module.Settings })));

const LoadingFallback = () => <SkeletonLoader />;

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/activity" element={<ActivityLog />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  const { mode } = useThemeStore();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
