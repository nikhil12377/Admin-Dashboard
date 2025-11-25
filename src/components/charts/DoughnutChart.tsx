import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"
import { getColor } from "../../lib/utils"

interface DoughnutChartProps {
  data: Array<{ name: string; value: number }>
  height?: number
  colors?: string[]
}

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"]

export const DoughnutChart = ({ data, height = 300, colors = COLORS }: DoughnutChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent ? percent * 100 : 0).toFixed(0)}%`}
          outerRadius={80}
          innerRadius={50}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: getColor('--card'),
            border: `1px solid ${getColor('--border')}`,
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
