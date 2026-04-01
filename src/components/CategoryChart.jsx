import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCompactCurrency } from '../utils/formatters'

const colors = ['#5EEAD4', '#60A5FA', '#FBBF24', '#FB7185', '#C084FC', '#34D399', '#F97316']

function CategoryChart({ data, theme }) {
  const tooltipBackground = theme === 'dark' ? 'rgba(7, 17, 31, 0.96)' : 'rgba(255, 255, 255, 0.96)'
  const tooltipBorder = theme === 'dark' ? '1px solid rgba(148, 163, 184, 0.15)' : '1px solid rgba(148, 163, 184, 0.22)'

  if (!data.length) {
    return (
      <div className="glass-panel flex h-[300px] items-center justify-center border border-dashed border-app bg-app-soft text-sm text-app-muted">
        No category data available for the current filters.
      </div>
    )
  }

  return (
    <div className="panel-grid shine-card card-hover p-5 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-app-primary">Expense mix by category</h3>
          <p className="mt-2 text-sm text-app-secondary">
            A category-based visualization of where money is leaving the business and lifestyle stack.
          </p>
        </div>
        <div className="pill-shell px-3 py-1 text-xs font-medium text-app-secondary">
          Category-based visualization
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="h-[250px] sm:h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="amount" nameKey="category" innerRadius={62} outerRadius={96} paddingAngle={4}>
                {data.map((entry, index) => (
                  <Cell key={entry.category} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCompactCurrency(value)}
                contentStyle={{
                  background: tooltipBackground,
                  border: tooltipBorder,
                  borderRadius: '16px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {data.slice(0, 6).map((item, index) => (
            <div
              key={item.category}
              className="flex items-center justify-between rounded-2xl border border-app bg-app-soft px-4 py-3 transition hover:-translate-y-0.5 hover:bg-app-strong"
            >
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                <span className="text-sm font-medium text-app-primary">{item.category}</span>
              </div>
              <span className="text-sm text-app-secondary">{formatCompactCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryChart
