import { formatCompactCurrency, formatCurrency } from '../utils/formatters'

const iconChar = {
  balance: '$',
  income: '+',
  expenses: '-',
}

const iconColor = {
  balance: '#0a246a',
  income: '#006400',
  expenses: '#8b0000',
}

function SummaryCard({ label, value, delta, tone = 'balance', helper }) {
  const char = iconChar[tone]
  const color = iconColor[tone]
  const isPositiveDelta = delta >= 0

  return (
    <div className="win-window" style={{ padding: 0 }}>
      {/* Mini titlebar */}
      <div
        style={{
          background: `linear-gradient(to right, ${color}, ${color}88)`,
          padding: '2px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          borderBottom: '1px solid #404040',
        }}
      >
        <span style={{ fontSize: '10px', color: '#fff', fontWeight: 'bold' }}>
          {char} {label}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <div>
            <div className="win-inset" style={{ display: 'inline-block', padding: '4px 10px', marginBottom: '4px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: color, fontFamily: 'Courier New, monospace' }}>
                {formatCurrency(value)}
              </span>
            </div>
            <p style={{ fontSize: '10px', color: '#444', margin: 0, lineHeight: '1.3' }}>{helper}</p>
          </div>
          <div
            style={{
              width: '32px', height: '32px', background: color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              borderTop: '1px solid #fff', borderLeft: '1px solid #fff',
              borderRight: '1px solid #404040', borderBottom: '1px solid #404040',
              fontSize: '18px', color: '#fff', fontWeight: 'bold', fontFamily: 'Courier New, monospace',
            }}
          >
            {char}
          </div>
        </div>

        {/* Status bar at bottom */}
        <div style={{ borderTop: '1px solid #bbb', paddingTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '10px', color: '#444' }}>Range performance:</span>
          <div
            style={{
              background: isPositiveDelta ? '#e8f5e8' : '#fce4e4',
              border: `1px solid ${isPositiveDelta ? '#006400' : '#8b0000'}`,
              color: isPositiveDelta ? '#006400' : '#8b0000',
              padding: '1px 6px',
              fontSize: '10px',
              fontWeight: 'bold',
              fontFamily: 'Courier New, monospace',
            }}
          >
            {isPositiveDelta ? '+' : '-'}{formatCompactCurrency(Math.abs(delta))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
