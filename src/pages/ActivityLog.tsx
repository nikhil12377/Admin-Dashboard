import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Stack,
  Chip,
  Avatar,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import {
  Plus as CreateIcon,
  Edit as UpdateIcon,
  Trash2 as DeleteIcon,
  Eye as VisibilityIcon,
} from 'lucide-react';
import { mockActivities } from '../data/mockData';
import { useFilterStore } from '../store/filterStore';
import type { ActionType } from '../store/filterStore';
import { formatDate } from '../utils/formatNumber';

const actionIcons: Record<ActionType, React.ReactNode> = {
  create: <CreateIcon size={16} />,
  update: <UpdateIcon size={16} />,
  delete: <DeleteIcon size={16} />,
  view: <VisibilityIcon size={16} />,
};



export const ActivityLogPage = () => {
  const { actionTypeFilter, setActionTypeFilter, userSearch, setUserSearch } = useFilterStore();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredActivities = useMemo(() => {
    return mockActivities.filter((activity) => {
      const matchesAction =
        actionTypeFilter === 'all' || activity.action === actionTypeFilter;
      const matchesUser =
        userSearch === '' ||
        activity.userName.toLowerCase().includes(userSearch.toLowerCase());
      return matchesAction && matchesUser;
    });
  }, [actionTypeFilter, userSearch]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Activity / Audit Log
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            placeholder="Search by user..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Action Type</InputLabel>
            <Select
              value={actionTypeFilter}
              label="Action Type"
              onChange={(e) => setActionTypeFilter(e.target.value as ActionType | 'all')}
            >
              <MenuItem value="all">All Actions</MenuItem>
              <MenuItem value="create">Create</MenuItem>
              <MenuItem value="update">Update</MenuItem>
              <MenuItem value="delete">Delete</MenuItem>
              <MenuItem value="view">View</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={2}>
            {filteredActivities.map((activity, index) => (
              <Box key={activity.id}>
                <Stack direction="row" spacing={2}>
                  <Stack alignItems="center">
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor:
                          activity.action === 'create'
                            ? 'success.light'
                            : activity.action === 'delete'
                            ? 'error.light'
                            : activity.action === 'update'
                            ? 'info.light'
                            : 'action.selected',
                        color:
                          activity.action === 'create'
                            ? 'success.dark'
                            : activity.action === 'delete'
                            ? 'error.dark'
                            : activity.action === 'update'
                            ? 'info.dark'
                            : 'text.primary',
                      }}
                    >
                      {actionIcons[activity.action]}
                    </Avatar>
                    {index < filteredActivities.length - 1 && (
                      <Box
                        sx={{
                          width: 1,
                          flexGrow: 1,
                          bgcolor: 'divider',
                          my: 1,
                        }}
                      />
                    )}
                  </Stack>
                  <Box sx={{ flexGrow: 1, pb: 2 }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      justifyContent="space-between"
                      alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
                      spacing={{ xs: 1, sm: 0 }}
                      width="100%"
                    >
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {activity.userName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {activity.action} {activity.resource}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(activity.timestamp)}
                        </Typography>
                        {expandedItems.has(activity.id) && activity.details && (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {activity.details}
                          </Typography>
                        )}
                      </Box>
                      <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip
                          label={activity.action}
                          color={
                            activity.action === 'create'
                              ? 'success'
                              : activity.action === 'delete'
                              ? 'error'
                              : activity.action === 'update'
                              ? 'info'
                              : 'default'
                          }
                          size="small"
                          variant="outlined"
                        />
                        {activity.details && (
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => toggleExpand(activity.id)}
                            sx={{ minWidth: 'auto' }}
                          >
                            {expandedItems.has(activity.id) ? 'Less' : 'More'}
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
