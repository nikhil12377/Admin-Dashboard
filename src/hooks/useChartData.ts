import { useMemo } from 'react';

export type TimeRange = 'daily' | 'weekly' | 'monthly';

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export const useChartData = (timeRange: TimeRange) => {
  const generateData = (days: number): ChartDataPoint[] => {
    const data: ChartDataPoint[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.floor((Math.sin(date.getTime()) + 1) * 500) + 500,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      });
    }

    return data;
  };

  const data = useMemo(() => {
    switch (timeRange) {
      case 'daily':
        return generateData(7);
      case 'weekly':
        return generateData(30);
      case 'monthly':
        return generateData(90);
      default:
        return generateData(30);
    }
  }, [timeRange]);

  return data;
};




