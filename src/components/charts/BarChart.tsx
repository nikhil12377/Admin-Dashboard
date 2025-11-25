import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { getColor } from "../../lib/utils"

interface BarChartProps {
  data: Array<{ date: string; value: number; label?: string }>
  height?: number
  color?: string
}

export const BarChart = ({ data, height = 300, color = "#3b82f6" }: BarChartProps) => {
  const chartData = data.map((d) => ({
    ...d,
    date: d.label || new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }))

  const mutedColor = getColor('--muted-foreground')

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke={getColor('--muted')} />
        <XAxis
          dataKey="date"
          tick={{ fill: mutedColor, fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis
          tick={{ fill: mutedColor, fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: getColor('--card'),
            border: `1px solid ${getColor('--border')}`,
            borderRadius: "0.5rem",
          }}
        />
        <Bar
          dataKey="value"
          fill={color}
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
