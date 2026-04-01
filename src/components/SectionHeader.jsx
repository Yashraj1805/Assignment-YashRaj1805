function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        borderBottom: '2px solid #808080',
        borderTop: '1px solid #fff',
        padding: '3px 0 3px 4px',
        marginBottom: '4px',
        background: 'linear-gradient(to right, #d4d0c8, #e8e4dc)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {eyebrow && (
          <span
            style={{
              fontSize: '9px',
              fontWeight: 'bold',
              background: '#0a246a',
              color: '#fff',
              padding: '1px 5px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {eyebrow}
          </span>
        )}
        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>{title}</span>
        {description && (
          <span style={{ fontSize: '10px', color: '#444' }}>— {description}</span>
        )}
      </div>
      {action}
    </div>
  )
}

export default SectionHeader
