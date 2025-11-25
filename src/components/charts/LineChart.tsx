import {
  LineChart as RechartsLineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { getColor } from "../../lib/utils"

interface LineChartProps {
  data: Array<{ date: string; value: number; label?: string }>
  height?: number
  color?: string
  showArea?: boolean
}

export const LineChart = ({ data, height = 300, color = "#3b82f6", showArea = true }: LineChartProps) => {
  const chartData = data.map((d) => ({
    ...d,
    date: d.label || new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }))

  const mutedColor = getColor('--muted-foreground')

  if (showArea) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={getColor('--muted')} />
          <XAxis
            dataKey="date"
            tick={{ fill: mutedColor, fontSize: 12 }}
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
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fillOpacity={1}
            fill="url(#colorValue)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke={getColor('--muted')} />
        <XAxis
          dataKey="date"
          tick={{ fill: mutedColor, fontSize: 12 }}
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
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
