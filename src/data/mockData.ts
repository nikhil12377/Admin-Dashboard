import type { User } from '../hooks/useUserFilters';
import type { ActionType } from '../store/filterStore';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '2024-01-13T09:20:00Z',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Manager',
    status: 'inactive',
    lastLogin: '2024-01-10T14:15:00Z',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '2024-01-15T11:00:00Z',
  },
  {
    id: '6',
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15T08:30:00Z',
  },
  {
    id: '7',
    name: 'Eve Adams',
    email: 'eve.adams@example.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2024-01-14T16:20:00Z',
  },
  {
    id: '8',
    name: 'Frank Miller',
    email: 'frank.miller@example.com',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2024-01-08T12:00:00Z',
  },
];

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: ActionType;
  resource: string;
  timestamp: string;
  details?: string;
}

export const mockActivities: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    action: 'create',
    resource: 'User Account',
    timestamp: '2024-01-15T10:30:00Z',
    details: 'Created new user account for jane.smith@example.com',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    action: 'update',
    resource: 'Settings',
    timestamp: '2024-01-15T09:15:00Z',
    details: 'Updated notification preferences',
  },
  {
    id: '3',
    userId: '1',
    userName: 'John Doe',
    action: 'delete',
    resource: 'Document',
    timestamp: '2024-01-14T16:45:00Z',
    details: 'Deleted document: report-2024.pdf',
  },
  {
    id: '4',
    userId: '3',
    userName: 'Bob Johnson',
    action: 'view',
    resource: 'Dashboard',
    timestamp: '2024-01-14T14:20:00Z',
  },
  {
    id: '5',
    userId: '6',
    userName: 'Diana Prince',
    action: 'create',
    resource: 'Project',
    timestamp: '2024-01-14T11:30:00Z',
    details: 'Created new project: Q1 Marketing Campaign',
  },
  {
    id: '6',
    userId: '2',
    userName: 'Jane Smith',
    action: 'update',
    resource: 'User Role',
    timestamp: '2024-01-13T15:00:00Z',
    details: 'Updated role for bob.johnson@example.com to Manager',
  },
  {
    id: '7',
    userId: '1',
    userName: 'John Doe',
    action: 'view',
    resource: 'Analytics',
    timestamp: '2024-01-13T10:00:00Z',
  },
  {
    id: '8',
    userId: '7',
    userName: 'Eve Adams',
    action: 'create',
    resource: 'Report',
    timestamp: '2024-01-12T13:45:00Z',
    details: 'Generated monthly sales report',
  },
];

