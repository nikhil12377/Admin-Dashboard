import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'Admin' | 'Manager' | 'Viewer';
export type ActionType = 'create' | 'update' | 'delete' | 'view';

interface FilterState {
  userSearch: string;
  roleFilter: UserRole | 'all';
  actionTypeFilter: ActionType | 'all';
  setUserSearch: (search: string) => void;
  setRoleFilter: (role: UserRole | 'all') => void;
  setActionTypeFilter: (action: ActionType | 'all') => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      userSearch: '',
      roleFilter: 'all',
      actionTypeFilter: 'all',
      setUserSearch: (userSearch) => set({ userSearch }),
      setRoleFilter: (roleFilter) => set({ roleFilter }),
      setActionTypeFilter: (actionTypeFilter) => set({ actionTypeFilter }),
      resetFilters: () =>
        set({
          userSearch: '',
          roleFilter: 'all',
          actionTypeFilter: 'all',
        }),
    }),
    {
      name: 'filter-storage',
    }
  )
);




