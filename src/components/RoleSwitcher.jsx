import clsx from 'clsx'

const roles = [
  { id: 'viewer', label: 'Viewer', detail: 'Read-only access' },
  { id: 'admin', label: 'Admin', detail: 'Add and edit transactions' },
]

function RoleSwitcher({ selectedRole, onRoleChange }) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-[24px] border border-app bg-app-soft p-2">
      {roles.map((role) => {
        const isActive = role.id === selectedRole

        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onRoleChange(role.id)}
            className={clsx(
              'rounded-[20px] px-4 py-3 text-left transition duration-300',
              isActive
                ? 'bg-gradient-to-r from-accent to-sky-400 text-slate-950 shadow-lg shadow-accent/20'
                : 'text-app-secondary hover:-translate-y-0.5 hover:bg-app-strong',
            )}
          >
            <span className="block text-sm font-semibold">{role.label}</span>
            <span className={clsx('mt-1 block text-xs', isActive ? 'text-slate-900/80' : 'text-app-muted')}>
              {role.detail}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default RoleSwitcher
