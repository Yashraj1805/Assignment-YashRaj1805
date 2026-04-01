const roles = [
  { id: 'viewer', label: 'Viewer', detail: 'Read-only access' },
  { id: 'admin', label: 'Admin', detail: 'Add and edit transactions' },
]

function RoleSwitcher({ selectedRole, onRoleChange }) {
  return (
    <div className="win-inset" style={{ padding: '4px', display: 'flex', gap: '4px' }}>
      {roles.map((role) => {
        const isActive = role.id === selectedRole
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onRoleChange(role.id)}
            className={isActive ? undefined : 'win-button'}
            style={{
              flex: 1,
              padding: '4px 6px',
              fontSize: '11px',
              textAlign: 'left',
              cursor: 'pointer',
              fontFamily: 'Tahoma, Arial, sans-serif',
              ...(isActive
                ? {
                    background: '#0a246a',
                    color: '#fff',
                    border: '1px solid #000',
                    borderTop: '1px solid #000',
                    borderLeft: '1px solid #000',
                  }
                : {}),
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{role.label}</div>
            <div style={{ fontSize: '9px', color: isActive ? '#cce' : '#666', marginTop: '1px' }}>{role.detail}</div>
          </button>
        )
      })}
    </div>
  )
}

export default RoleSwitcher
