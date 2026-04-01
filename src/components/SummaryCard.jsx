import clsx from 'clsx'
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react'
import { formatCompactCurrency, formatCurrency } from '../utils/formatters'

const iconMap = {
  balance: Wallet,
  income: ArrowUpRight,
  expenses: ArrowDownRight,
}

function SummaryCard({ label, value, delta, tone = 'balance', helper }) {
  const Icon = iconMap[tone]

  return (
    <div className="panel-grid shine-card card-hover p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-app-secondary">{label}</p>
          <div>
            <p className="text-3xl font-semibold tracking-tight text-app-primary sm:text-4xl">
              {formatCurrency(value)}
            </p>
            <p className="mt-2 max-w-xs text-sm text-app-secondary">{helper}</p>
          </div>
        </div>
        <div
          className={clsx(
            'rounded-2xl p-3 ring-1 ring-inset',
            tone === 'income'
              ? 'bg-emerald-400/15 text-emerald-300 ring-emerald-300/15'
              : tone === 'expenses'
                ? 'bg-rose-400/15 text-rose-300 ring-rose-300/15'
                : 'bg-accent/15 text-accent ring-accent/20',
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between gap-3 text-sm">
        <span className="text-app-muted">Selected range performance</span>
        <span
          className={clsx(
            'rounded-full px-3 py-1 font-medium',
            delta >= 0 ? 'bg-emerald-400/10 text-emerald-300' : 'bg-rose-400/10 text-rose-300',
          )}
        >
          {delta >= 0 ? '+' : '-'}
          {formatCompactCurrency(Math.abs(delta))}
        </span>
      </div>
    </div>
  )
}

export default SummaryCard
