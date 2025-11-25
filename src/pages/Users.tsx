import { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Chip,
  Typography,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { useUserFilters } from '../hooks/useUserFilters';
import { mockUsers } from '../data/mockData';
import type { UserRole } from '../store/filterStore';
import { formatDate } from '../utils/formatNumber';

const roleOptions: UserRole[] = ['Admin', 'Manager', 'Viewer'];

export const Users = () => {
  const { filteredUsers, userSearch, roleFilter, setUserSearch, setRoleFilter } =
    useUserFilters(mockUsers);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<typeof mockUsers[0]> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => (
        <Chip
          label={role}
          color={
            role === 'Admin'
              ? 'error'
              : role === 'Manager'
                ? 'secondary'
                : 'default'
          }
          size="small"
          variant={role === 'Viewer' ? 'outlined' : 'filled'}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Chip
          label={status}
          color={status === 'active' ? 'success' : 'default'}
          size="small"
          variant={status === 'active' ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (lastLogin: string) => formatDate(lastLogin),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Users & Roles
      </Typography>

      <Grid container spacing={2} mb={3} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            placeholder="Search users..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              label="Role"
              onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
            >
              <MenuItem value="all">All Roles</MenuItem>
              {roleOptions.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label={`Total: ${filteredUsers.length}`} variant="outlined" />
            {roleFilter !== 'all' && (
              <Chip
                label={`Role: ${roleFilter}`}
                onDelete={() => setRoleFilter('all')}
                color="primary"
              />
            )}
            {userSearch && (
              <Chip
                label={`Search: ${userSearch}`}
                onDelete={() => setUserSearch('')}
                color="primary"
              />
            )}
          </Stack>
        </Grid>
      </Grid>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredUsers}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
