import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';
export type PrimaryColor = 'blue' | 'green' | 'purple' | 'orange';
export type TypographyScale = 'small' | 'medium' | 'large';

interface ThemeState {
  mode: ThemeMode;
  primaryColor: PrimaryColor;
  typographyScale: TypographyScale;
  setMode: (mode: ThemeMode) => void;
  setPrimaryColor: (color: PrimaryColor) => void;
  setTypographyScale: (scale: TypographyScale) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      primaryColor: 'blue',
      typographyScale: 'medium',
      setMode: (mode) => set({ mode }),
      setPrimaryColor: (primaryColor) => set({ primaryColor }),
      setTypographyScale: (typographyScale) => set({ typographyScale }),
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage',
    }
  )
);




