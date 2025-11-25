import { useMemo } from 'react';
import { useFilterStore } from '../store/filterStore';
import type { UserRole } from '../store/filterStore';

export type { UserRole };

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar?: string;
}

export const useUserFilters = (users: User[]) => {
  const { userSearch, roleFilter, setUserSearch, setRoleFilter, resetFilters } = useFilterStore();

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        userSearch === '' ||
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase());

      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, userSearch, roleFilter]);

  return {
    filteredUsers,
    userSearch,
    roleFilter,
    setUserSearch,
    setRoleFilter,
    resetFilters,
  };
};

