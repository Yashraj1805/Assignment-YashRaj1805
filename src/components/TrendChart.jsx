import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCompactCurrency } from '../utils/formatters'

function TrendChart({ data, theme }) {
  const axisColor = theme === 'dark' ? '#94A3B8' : '#64748B'
  const tooltipBackground = theme === 'dark' ? 'rgba(7, 17, 31, 0.96)' : 'rgba(255, 255, 255, 0.96)'
  const tooltipBorder = theme === 'dark' ? '1px solid rgba(148, 163, 184, 0.15)' : '1px solid rgba(148, 163, 184, 0.22)'
  const tooltipLabel = theme === 'dark' ? '#E2E8F0' : '#0F172A'

  if (!data.length) {
    return (
      <div className="glass-panel flex h-[300px] items-center justify-center border border-dashed border-app bg-app-soft text-sm text-app-muted">
        No time-based data available for the current filters.
      </div>
    )
  }

  return (
    <div className="panel-grid shine-card card-hover p-5 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-app-primary">Cash flow trend</h3>
          <p className="mt-2 text-sm text-app-secondary">
            Monthly income and expenses over time to highlight direction and volatility.
          </p>
        </div>
        <div className="pill-shell px-3 py-1 text-xs font-medium text-app-secondary">
          Time-based visualization
        </div>
      </div>
      <div className="h-[280px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#5EEAD4" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#5EEAD4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#FB7185" stopOpacity={0.42} />
                <stop offset="95%" stopColor="#FB7185" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={formatCompactCurrency}
              tick={{ fill: axisColor, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={68}
            />
            <Tooltip
              formatter={(value) => formatCompactCurrency(value)}
              contentStyle={{
                background: tooltipBackground,
                border: tooltipBorder,
                borderRadius: '16px',
              }}
              labelStyle={{ color: tooltipLabel }}
            />
            <Area type="monotone" dataKey="income" stroke="#5EEAD4" fill="url(#incomeFill)" strokeWidth={3} />
            <Area type="monotone" dataKey="expenses" stroke="#FB7185" fill="url(#expenseFill)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TrendChart
