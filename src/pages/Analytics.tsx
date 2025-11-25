import { Card, CardContent, CardHeader, Typography, Box, Stack, Chip, LinearProgress, useTheme, Grid } from '@mui/material';
import { ChartCard } from '../components/ChartCard';
import { LineChart } from '../components/charts/LineChart';
import { BarChart } from '../components/charts/BarChart';
import { DoughnutChart } from '../components/charts/DoughnutChart';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useChartData } from '../hooks/useChartData';

export const Analytics = () => {
  const chartData = useChartData('monthly');
  const theme = useTheme();

  const performanceData = [
    { date: '2024-01-01', label: 'Mon', value: 120 },
    { date: '2024-01-02', label: 'Tue', value: 132 },
    { date: '2024-01-03', label: 'Wed', value: 101 },
    { date: '2024-01-04', label: 'Thu', value: 134 },
    { date: '2024-01-05', label: 'Fri', value: 90 },
    { date: '2024-01-06', label: 'Sat', value: 230 },
    { date: '2024-01-07', label: 'Sun', value: 210 },
  ];

  const conversionData = [
    { name: 'Direct', value: 1048 },
    { name: 'Email', value: 735 },
    { name: 'Social', value: 580 },
    { name: 'Referral', value: 484 },
  ];

  const kpiData = [
    { label: 'Page Views', value: 12450, change: 12.5, positive: true },
    { label: 'Bounce Rate', value: 45.2, change: -3.2, positive: false },
    { label: 'Avg. Session', value: 3.5, change: 8.1, positive: true },
    { label: 'Conversion', value: 2.8, change: 15.3, positive: true },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Analytics
      </Typography>

      <Grid container spacing={3} mb={3}>
        {kpiData.map((kpi) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={kpi.label}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {kpi.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold" mb={1}>
                  {kpi.value}
                  {(kpi.label === 'Bounce Rate' || kpi.label === 'Conversion') && '%'}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {kpi.positive ? (
                    <TrendingUp size={16} color={theme.palette.success.main} />
                  ) : (
                    <TrendingDown size={16} color={theme.palette.error.main} />
                  )}
                  <Typography
                    variant="body2"
                    color={kpi.positive ? 'success.main' : 'error.main'}
                  >
                    {kpi.positive ? '+' : ''}
                    {kpi.change}%
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="User Growth Trend">
            <LineChart data={chartData} height={300} showArea={true} color={theme.palette.success.main} />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="Performance Metrics">
            <BarChart data={performanceData} height={300} color={theme.palette.secondary.main} />
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="Conversion Sources">
            <DoughnutChart data={conversionData} height={300} />
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="AI Insights" />
            <CardContent>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">User Engagement</Typography>
                    <Chip label="High" color="primary" size="small" />
                  </Stack>
                  <LinearProgress variant="determinate" value={85} />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Conversion Rate</Typography>
                    <Chip label="Good" color="secondary" size="small" />
                  </Stack>
                  <LinearProgress variant="determinate" value={65} color="secondary" />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Performance Score</Typography>
                    <Chip label="Excellent" color="success" size="small" />
                  </Stack>
                  <LinearProgress variant="determinate" value={92} color="success" />
                </Box>
              </Stack>
              <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Summary:</strong> Your dashboard shows strong user engagement with a 12.5%
                  increase in page views. Conversion rates are improving, and performance metrics
                  indicate excellent system health.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
