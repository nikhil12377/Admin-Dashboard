import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Switch,
  Slider,
  Select,
  MenuItem,
  Button,
  Chip,
  Typography,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Bell as NotificationsIcon,
  Plug as IntegrationIcon,
  Palette as PaletteIcon,
} from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import type { PrimaryColor, TypographyScale } from '../store/themeStore';
import { useNotificationStore } from '../utils/notifications';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
}

const integrations: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Connect your Slack workspace for notifications',
    icon: '💬',
    connected: false,
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Sync with GitHub repositories',
    icon: '🐙',
    connected: true,
  },
  {
    id: 'google',
    name: 'Google Workspace',
    description: 'Integrate with Google services',
    icon: '🔵',
    connected: false,
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState<number>(30);
  const { primaryColor, typographyScale, setPrimaryColor, setTypographyScale } = useThemeStore();
  const { addNotification } = useNotificationStore();
  const [integrationStates, setIntegrationStates] = useState(integrations);

  const handleIntegrationToggle = (id: string) => {
    setIntegrationStates((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
    const integration = integrationStates.find((i) => i.id === id);
    addNotification(
      `${integration?.name} ${integration?.connected ? 'disconnected' : 'connected'}`,
      'success'
    );
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Settings
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="settings tabs"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab icon={<SettingsIcon size={16} />} iconPosition="start" label="General" />
          <Tab icon={<NotificationsIcon size={16} />} iconPosition="start" label="Notifications" />
          <Tab icon={<IntegrationIcon size={16} />} iconPosition="start" label="Integrations" />
          <Tab icon={<PaletteIcon size={16} />} iconPosition="start" label="Preferences" />
        </Tabs>
      </Box>

      <CustomTabPanel value={tabValue} index={0}>
        <Card>
          <CardHeader title="General Settings" />
          <CardContent>
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography>Auto-save changes</Typography>
                <Switch
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                />
              </Stack>
              <Box>
                <Typography gutterBottom>Data Refresh Interval (seconds)</Typography>
                <Slider
                  value={refreshInterval}
                  onChange={(_, value) => setRefreshInterval(value as number)}
                  min={10}
                  max={300}
                  step={10}
                  valueLabelDisplay="auto"
                />
                <Typography variant="caption" color="text.secondary">
                  Current: {refreshInterval} seconds
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={1}>
        <Card>
          <CardHeader title="Notification Preferences" />
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography>Email Notifications</Typography>
                <Switch
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography>Push Notifications</Typography>
                <Switch
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {integrationStates.map((integration) => (
            <Grid size={{ xs: 12, md: 6 }} key={integration.id}>
              <Card>
                <CardHeader
                  title={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h6">
                        {integration.icon} {integration.name}
                      </Typography>
                    </Stack>
                  }
                  subheader={integration.description}
                  action={
                    <Chip
                      label={integration.connected ? 'Connected' : 'Disconnected'}
                      color={integration.connected ? 'success' : 'default'}
                      variant={integration.connected ? 'filled' : 'outlined'}
                      size="small"
                    />
                  }
                />
                <CardContent>
                  <Button
                    variant={integration.connected ? 'outlined' : 'contained'}
                    fullWidth
                    onClick={() => handleIntegrationToggle(integration.id)}
                    color={integration.connected ? 'error' : 'primary'}
                  >
                    {integration.connected ? 'Disconnect' : 'Connect'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3}>
        <Card>
          <CardHeader title="Appearance Preferences" />
          <CardContent>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Primary Color</InputLabel>
                <Select
                  value={primaryColor}
                  label="Primary Color"
                  onChange={(e) => setPrimaryColor(e.target.value as PrimaryColor)}
                >
                  <MenuItem value="blue">Blue</MenuItem>
                  <MenuItem value="green">Green</MenuItem>
                  <MenuItem value="purple">Purple</MenuItem>
                  <MenuItem value="orange">Orange</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Typography Scale</InputLabel>
                <Select
                  value={typographyScale}
                  label="Typography Scale"
                  onChange={(e) => setTypographyScale(e.target.value as TypographyScale)}
                >
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>
      </CustomTabPanel>
    </Box>
  );
};
