import { createTheme, alpha } from '@mui/material/styles';

// Premium color palette
const colors = {
  primary: {
    main: '#2563eb', // Vibrant Blue
    light: '#60a5fa',
    dark: '#1e40af',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#7c3aed', // Violet
    light: '#a78bfa',
    dark: '#5b21b6',
    contrastText: '#ffffff',
  },
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#b91c1c',
  },
  background: {
    light: '#f8fafc', // Slate 50
    dark: '#0f172a', // Slate 900
    paperLight: '#ffffff',
    paperDark: '#1e293b', // Slate 800
  },
  text: {
    primaryLight: '#1e293b',
    secondaryLight: '#64748b',
    primaryDark: '#f8fafc',
    secondaryDark: '#94a3b8',
  },
};

const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    background: {
      default: mode === 'light' ? colors.background.light : colors.background.dark,
      paper: mode === 'light' ? colors.background.paperLight : colors.background.paperDark,
    },
    text: {
      primary: mode === 'light' ? colors.text.primaryLight : colors.text.primaryDark,
      secondary: mode === 'light' ? colors.text.secondaryLight : colors.text.secondaryDark,
    },
    divider: mode === 'light' ? alpha(colors.text.primaryLight, 0.1) : alpha(colors.text.primaryDark, 0.1),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none' as const, fontWeight: 500 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'light' 
            ? '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)' 
            : '0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? alpha('#ffffff', 0.8) : alpha('#1e293b', 0.8),
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${mode === 'light' ? alpha(colors.text.primaryLight, 0.1) : alpha(colors.text.primaryDark, 0.1)}`,
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'light' ? '#ffffff' : '#1e293b',
          borderRight: `1px solid ${mode === 'light' ? alpha(colors.text.primaryLight, 0.1) : alpha(colors.text.primaryDark, 0.1)}`,
        },
      },
    },
  },
});

export const createAppTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));
