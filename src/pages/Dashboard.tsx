import { useState } from 'react';
import { MetricCard } from '../components/MetricCard';
import { ChartCard } from '../components/ChartCard';
import { LineChart } from '../components/charts/LineChart';
import { BarChart } from '../components/charts/BarChart';
import { DoughnutChart } from '../components/charts/DoughnutChart';
import { useChartData } from '../hooks/useChartData';
import type { TimeRange } from '../hooks/useChartData';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Button, Typography, Box, Stack, Grid } from '@mui/material';

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const chartData = useChartData(timeRange);

  const doughnutData = [
    { name: 'Product A', value: 1048 },
    { name: 'Product B', value: 735 },
    { name: 'Product C', value: 580 },
    { name: 'Product D', value: 484 },
  ];

  return (
    <Box>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', sm: 'center' }} 
        mb={3}
        spacing={{ xs: 2, sm: 0 }}
      >
        <Typography variant="h4" fontWeight="bold">Dashboard</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Button
            variant={timeRange === 'daily' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setTimeRange('daily')}
          >
            Daily
          </Button>
          <Button
            variant={timeRange === 'weekly' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setTimeRange('weekly')}
          >
            Weekly
          </Button>
          <Button
            variant={timeRange === 'monthly' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setTimeRange('monthly')}
          >
            Monthly
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Total Users"
            value={12450}
            change={12.5}
            icon={<Users size={20} />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Revenue"
            value={245678}
            change={8.3}
            format="currency"
            icon={<DollarSign size={20} />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Active Sessions"
            value={892}
            change={-2.1}
            icon={<Activity size={20} />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title="Growth Rate"
            value={18.5}
            change={5.2}
            icon={<TrendingUp size={20} />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard
            title="User Growth"
            action={
              <Stack direction="row" spacing={1}>
                <Button
                  variant={timeRange === 'daily' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setTimeRange('daily')}
                  sx={{ minWidth: 'auto', px: 1 }}
                >
                  D
                </Button>
                <Button
                  variant={timeRange === 'weekly' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setTimeRange('weekly')}
                  sx={{ minWidth: 'auto', px: 1 }}
                >
                  W
                </Button>
                <Button
                  variant={timeRange === 'monthly' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setTimeRange('monthly')}
                  sx={{ minWidth: 'auto', px: 1 }}
                >
                  M
                </Button>
              </Stack>
            }
          >
            <LineChart data={chartData} height={300} showArea={true} />
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <ChartCard title="Revenue Chart">
            <BarChart data={chartData.map(d => ({ ...d, value: d.value * 1.5 }))} height={300} />
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <ChartCard title="Sales Distribution">
            <DoughnutChart data={doughnutData} height={300} />
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};
