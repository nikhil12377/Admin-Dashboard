import { Card, CardContent, Skeleton, Grid } from '@mui/material';

export const MetricCardSkeleton = () => (
  <Card>
    <CardContent sx={{ p: 3 }}>
      <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="40%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="50%" height={16} />
    </CardContent>
  </Card>
);

export const ChartCardSkeleton = () => (
  <Card>
    <CardContent sx={{ p: 3 }}>
      <Skeleton variant="text" width="40%" height={28} sx={{ mb: 3 }} />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </CardContent>
  </Card>
);

export const SkeletonLoader = () => (
  <Grid container spacing={3}>
    {[1, 2, 3, 4].map((i) => (
      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
        <MetricCardSkeleton />
      </Grid>
    ))}
    <Grid size={{ xs: 12, lg: 8 }}>
      <ChartCardSkeleton />
    </Grid>
    <Grid size={{ xs: 12, lg: 4 }}>
      <ChartCardSkeleton />
    </Grid>
  </Grid>
);
