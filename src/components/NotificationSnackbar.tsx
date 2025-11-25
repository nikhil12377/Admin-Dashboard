import { Alert, Stack } from '@mui/material';
import { useNotificationStore } from '../utils/notifications';

export const NotificationSnackbar = () => {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <Stack
      spacing={1}
      sx={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 2000,
      }}
    >
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          severity={notification.type as 'success' | 'error' | 'warning' | 'info'}
          onClose={() => removeNotification(notification.id)}
          variant="filled"
          sx={{ width: '100%', minWidth: '300px', boxShadow: 3 }}
        >
          {notification.message}
        </Alert>
      ))}
    </Stack>
  );
};
