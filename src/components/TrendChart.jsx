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

function TrendChart({ data }) {
  if (!data.length) {
    return (
      <div className="win-window" style={{ padding: '16px', textAlign: 'center', color: '#808080', fontSize: '11px' }}>
        No time-based data available for the current filters.
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Cash Flow Trend</span>
        <div style={{ display: 'flex', gap: '8px', fontSize: '10px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ width: '12px', height: '3px', background: '#006400', display: 'inline-block' }} />
            Income
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ width: '12px', height: '3px', background: '#8b0000', display: 'inline-block' }} />
            Expenses
          </span>
        </div>
      </div>
      <div style={{ padding: '8px' }}>
        <p style={{ fontSize: '10px', color: '#444', margin: '0 0 8px' }}>
          Monthly income and expenses over time to highlight direction and volatility.
        </p>
        <div style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="incomeFillW2k" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#006400" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#006400" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseFillW2k" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#8b0000" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b0000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#d0ccc4" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#444', fontSize: 10, fontFamily: 'Tahoma, Arial' }} axisLine={{ stroke: '#808080' }} tickLine={false} />
              <YAxis
                tickFormatter={formatCompactCurrency}
                tick={{ fill: '#444', fontSize: 10, fontFamily: 'Courier New, monospace' }}
                axisLine={{ stroke: '#808080' }}
                tickLine={false}
                width={68}
              />
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
                labelStyle={{ color: '#000', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="income" stroke="#006400" fill="url(#incomeFillW2k)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke="#8b0000" fill="url(#expenseFillW2k)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default TrendChart
