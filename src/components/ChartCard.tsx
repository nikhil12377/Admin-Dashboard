import { Card, CardContent, CardHeader, Box, Stack, useTheme, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const ChartCard = ({ title, children, action }: ChartCardProps) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <CardHeader
          title={
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                {title}
              </Typography>
              {action && <Box>{action}</Box>}
            </Stack>
          }
          sx={{ pb: 0 }}
        />
        <CardContent sx={{ height: '100%', minHeight: '300px', p: 3 }}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};
