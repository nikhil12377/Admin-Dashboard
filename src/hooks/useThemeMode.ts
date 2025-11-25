import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

export const useThemeMode = () => {
  const { mode } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  return { mode };
};
