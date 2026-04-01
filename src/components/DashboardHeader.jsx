import RoleSwitcher from './RoleSwitcher'

function DashboardHeader({
  selectedRole,
  onRoleChange,
  onExport,
  theme,
  onToggleTheme,
  transactionCount,
}) {
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-20">
      {/* Title bar */}
      <div className="win-titlebar">
        <img
          src="https://win98icons.alexmeub.com/icons/png/money_dollar-0.png"
          alt=""
          className="h-4 w-4"
          style={{ imageRendering: 'pixelated' }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <span>PulseFi - Financial Dashboard</span>
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            className="win-button"
            style={{ minWidth: '16px', minHeight: '14px', padding: '0 2px', fontSize: '10px', lineHeight: 1 }}
            aria-label="Minimize"
          >
            _
          </button>
          <button
            type="button"
            className="win-button"
            style={{ minWidth: '16px', minHeight: '14px', padding: '0 2px', fontSize: '10px', lineHeight: 1 }}
            aria-label="Maximize"
          >
            &#9633;
          </button>
          <button
            type="button"
            className="win-button"
            style={{ minWidth: '16px', minHeight: '14px', padding: '0 2px', fontSize: '10px', lineHeight: 1, fontWeight: 'bold', color: '#8b0000' }}
            aria-label="Close"
          >
            &#10005;
          </button>
        </div>
      </div>

      {/* Menu bar */}
      <div
        className="win-window"
        style={{ borderTop: 'none', borderRadius: 0, padding: '2px 4px', display: 'flex', alignItems: 'center', gap: '0', borderBottom: '1px solid #808080' }}
      >
        {['File', 'Edit', 'View', 'Tools', 'Help'].map((menu) => (
          <button
            key={menu}
            type="button"
            className="px-2 py-0.5 text-xs hover:bg-[#0a246a] hover:text-white"
            style={{ fontSize: '11px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Tahoma, Arial, sans-serif' }}
          >
            <span style={{ textDecoration: 'underline' }}>{menu[0]}</span>{menu.slice(1)}
          </button>
        ))}
      </div>

      {/* Main header content */}
      <div className="win-window" style={{ borderTop: 'none', borderRadius: 0, padding: '8px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Left: App info panel */}
          <div className="win-card" style={{ flex: '1 1 320px', minWidth: 0 }}>
            <div style={{ borderBottom: '1px solid #808080', marginBottom: '6px', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '32px', height: '32px', background: 'linear-gradient(135deg, #0a246a, #1e90ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  borderTop: '1px solid #fff', borderLeft: '1px solid #fff', borderRight: '1px solid #404040', borderBottom: '1px solid #404040'
                }}
              >
                <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>$</span>
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, color: '#000' }}>PulseFi Dashboard</p>
                <p style={{ fontSize: '10px', margin: 0, color: '#444' }}>Financial Intelligence Workspace v1.0</p>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: '#444', margin: '0 0 6px', lineHeight: '1.4' }}>
              Review cash flow, compare spending patterns, and manage transactions from your personal finance dashboard.
            </p>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              <div className="win-inset" style={{ padding: '2px 6px' }}>
                <span style={{ fontSize: '10px', color: '#444' }}>Records: </span>
                <span style={{ fontSize: '10px', fontWeight: 'bold' }}>{transactionCount}</span>
              </div>
              <div className="win-inset" style={{ padding: '2px 6px' }}>
                <span style={{ fontSize: '10px', color: '#444' }}>Mode: </span>
                <span style={{ fontSize: '10px', fontWeight: 'bold' }}>{isDark ? 'Dark' : 'Light'}</span>
              </div>
              <div className="win-inset" style={{ padding: '2px 6px' }}>
                <span style={{ fontSize: '10px', color: '#444' }}>Access: </span>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: selectedRole === 'admin' ? '#006400' : '#444' }}>
                  {selectedRole === 'admin' ? 'Admin' : 'Viewer'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Controls panel */}
          <div className="win-card" style={{ flex: '0 0 280px', minWidth: 0 }}>
            <div style={{ borderBottom: '1px solid #808080', marginBottom: '6px', paddingBottom: '2px' }}>
              <p style={{ fontSize: '11px', fontWeight: 'bold', margin: 0 }}>Workspace Controls</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                type="button"
                onClick={onToggleTheme}
                className="win-button"
                style={{ justifyContent: 'flex-start', minWidth: 0, width: '100%' }}
              >
                <span style={{ fontSize: '12px', marginRight: '2px' }}>{isDark ? '☀' : '🌙'}</span>
                {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
              <button
                type="button"
                onClick={onExport}
                className="win-button"
                style={{ justifyContent: 'flex-start', minWidth: 0, width: '100%' }}
              >
                <span style={{ fontSize: '12px', marginRight: '2px' }}>&#128190;</span>
                Export to CSV...
              </button>
              <div>
                <p style={{ fontSize: '10px', color: '#444', margin: '0 0 4px' }}>Role-Based Access Control:</p>
                <RoleSwitcher selectedRole={selectedRole} onRoleChange={onRoleChange} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Toolbar separator */}
      <div style={{ height: '2px', background: 'linear-gradient(to right, #808080, #fff, #808080)' }} />
    </header>
  )
}

export default DashboardHeader
