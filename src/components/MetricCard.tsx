import { Card, CardContent, Typography, Box, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { formatNumber, formatCurrency } from '../utils/formatNumber';

interface MetricCardProps {
  title: string;
  value: number;
  change?: number;
  format?: 'number' | 'currency';
  icon?: React.ReactNode;
}

export const MetricCard = ({ title, value, change, format = 'number', icon }: MetricCardProps) => {
  const formattedValue = format === 'currency' ? formatCurrency(value) : formatNumber(value);
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {title}
            </Typography>
            {icon && (
              <Box sx={{ color: 'primary.main', opacity: 0.7 }}>
                {icon}
              </Box>
            )}
          </Stack>
          <Typography variant="h4" component="div" fontWeight="bold" mb={1}>
            {formattedValue}
          </Typography>
          {change !== undefined && (
            <Typography
              variant="body2"
              sx={{
                color: change >= 0 ? 'success.main' : 'error.main',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {change >= 0 ? '+' : ''}
              {change.toFixed(1)}% from last period
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
