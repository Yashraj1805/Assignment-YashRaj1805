import clsx from 'clsx'
import { Download, Moon, Sparkles, SunMedium } from 'lucide-react'
import RoleSwitcher from './RoleSwitcher'

function QuickChip({ label, value, tone = 'default' }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border px-3 py-2 backdrop-blur-sm',
        tone === 'accent'
          ? 'border-accent/25 bg-accent/10 text-accent'
          : 'border-app bg-app-soft text-app-secondary',
      )}
    >
      <p className="text-[11px] uppercase tracking-[0.22em] opacity-70">{label}</p>
      <p className="mt-1 text-sm font-semibold text-app-primary">{value}</p>
    </div>
  )
}

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
    <header className="sticky top-0 z-20 -mx-4 px-4 pt-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="hero-shell mx-auto max-w-7xl border px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-accent/20 blur-3xl animate-drift" />
        <div className="absolute -right-8 bottom-4 h-24 w-24 rounded-full bg-sky-400/15 blur-3xl animate-drift" />

        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_380px] xl:items-start">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              <Sparkles className="h-3.5 w-3.5 animate-pulseSoft" />
              Finance intelligence workspace
            </div>

            <div className="space-y-3">
              <h1 className="max-w-4xl text-balance text-[clamp(2.1rem,5vw,4.4rem)] font-semibold leading-[0.95] tracking-tight text-app-primary">
                PulseFi gives your finance story a sharper, faster interface.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-app-secondary sm:text-base">
                Review cash flow, compare spending patterns, and manage transactions from a tighter,
                recruiter-friendly dashboard that feels premium on mobile and desktop.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <QuickChip label="Theme" value={isDark ? 'Dark mode' : 'Light mode'} tone="accent" />
              <QuickChip label="Records" value={`${transactionCount} transactions`} />
              <QuickChip label="Access" value={selectedRole === 'admin' ? 'Admin controls' : 'Viewer only'} />
            </div>
          </div>

          <div className="panel-grid shine-card card-hover flex flex-col gap-4 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-app-primary">Workspace controls</p>
                <p className="mt-1 text-sm text-app-secondary">Theme, export, and role access in one compact panel.</p>
              </div>
              <button
                type="button"
                onClick={onToggleTheme}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-app bg-app-soft px-4 py-3 text-sm font-medium text-app-primary transition hover:-translate-y-0.5 hover:bg-app-strong"
              >
                {isDark ? <SunMedium className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-sky-500" />}
                {isDark ? 'Switch to light' : 'Switch to dark'}
              </button>
            </div>

            <button
              type="button"
              onClick={onExport}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-app bg-app-soft px-4 py-3 text-sm font-medium text-app-primary transition hover:-translate-y-0.5 hover:bg-app-strong"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>

            <div className="space-y-3 rounded-[22px] border border-app bg-app-soft p-3 sm:p-4">
              <div>
                <p className="text-sm font-semibold text-app-primary">Role-based access</p>
                <p className="mt-1 text-sm text-app-secondary">
                  Viewer stays read-only. Admin unlocks add and edit controls.
                </p>
              </div>
              <RoleSwitcher selectedRole={selectedRole} onRoleChange={onRoleChange} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
