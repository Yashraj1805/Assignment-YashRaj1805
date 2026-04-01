import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCompactCurrency } from '../utils/formatters'

const colors = ['#0a246a', '#006400', '#8b0000', '#8b6914', '#4b0082', '#006666', '#804000']

function CategoryChart({ data }) {
  if (!data.length) {
    return (
      <div className="win-window" style={{ padding: '16px', textAlign: 'center', color: '#808080', fontSize: '11px' }}>
        No category data available for the current filters.
      </div>
    )
  }

  return (
    <div className="win-window" style={{ padding: 0 }}>
      <div
        style={{
          background: 'linear-gradient(to right, #d4d0c8, #e8e4dc)',
          borderBottom: '1px solid #808080',
          padding: '3px 6px',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Expense Mix by Category</span>
      </div>
      <div style={{ padding: '8px' }}>
        <p style={{ fontSize: '10px', color: '#444', margin: '0 0 8px' }}>
          Category-based breakdown of where money is going.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', alignItems: 'center' }}>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="amount" nameKey="category" innerRadius={40} outerRadius={75} paddingAngle={2}>
                  {data.map((entry, index) => (
                    <Cell key={entry.category} fill={colors[index % colors.length]} stroke="#d4d0c8" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCompactCurrency(value)}
                  contentStyle={{
                    background: '#d4d0c8',
                    border: '2px solid',
                    borderTopColor: '#fff',
                    borderLeftColor: '#fff',
                    borderRightColor: '#404040',
                    borderBottomColor: '#404040',
                    borderRadius: 0,
                    fontSize: '11px',
                    fontFamily: 'Tahoma, Arial',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', maxHeight: '200px', overflowY: 'auto' }}>
            {data.slice(0, 7).map((item, index) => (
              <div
                key={item.category}
                className="win-inset"
                style={{ padding: '2px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    style={{
                      width: '10px', height: '10px', flexShrink: 0,
                      background: colors[index % colors.length],
                      border: '1px solid #404040',
                      display: 'inline-block',
                    }}
                  />
                  <span style={{ fontSize: '10px', color: '#000' }}>{item.category}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#000', fontFamily: 'Courier New, monospace', whiteSpace: 'nowrap' }}>
                  {formatCompactCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryChart
