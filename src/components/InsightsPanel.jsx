const toneStyles = {
  rose: { titlebarBg: '#8b0000', badgeBg: '#fce4e4', badgeColor: '#8b0000', badgeBorder: '#8b0000' },
  green: { titlebarBg: '#006400', badgeBg: '#e8f5e8', badgeColor: '#006400', badgeBorder: '#006400' },
  amber: { titlebarBg: '#8b6914', badgeBg: '#fff8e1', badgeColor: '#8b6914', badgeBorder: '#8b6914' },
  teal: { titlebarBg: '#0a246a', badgeBg: '#e8f0ff', badgeColor: '#0a246a', badgeBorder: '#0a246a' },
  default: { titlebarBg: '#444', badgeBg: '#f0ede8', badgeColor: '#444', badgeBorder: '#888' },
}

function InsightsPanel({ insights }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px' }}>
      {insights.map((insight) => {
        const style = toneStyles[insight.tone] || toneStyles.default
        return (
          <div key={insight.title} className="win-window" style={{ padding: 0 }}>
            {/* Mini titlebar */}
            <div
              style={{
                background: `linear-gradient(to right, ${style.titlebarBg}, ${style.titlebarBg}88)`,
                padding: '2px 6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                borderBottom: '1px solid #404040',
              }}
            >
              <span style={{ fontSize: '10px', color: '#fff', fontWeight: 'bold' }}>{insight.title}</span>
            </div>
            <div style={{ padding: '8px' }}>
              <div
                style={{
                  background: style.badgeBg,
                  border: `1px solid ${style.badgeBorder}`,
                  color: style.badgeColor,
                  padding: '3px 8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '6px',
                  fontFamily: 'Courier New, monospace',
                  display: 'inline-block',
                }}
              >
                {insight.value}
              </div>
              <p style={{ fontSize: '10px', color: '#444', margin: 0, lineHeight: '1.4' }}>{insight.detail}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default InsightsPanel
