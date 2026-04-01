import { PencilLine, Plus } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'

function EmptyState({ isAdmin, onAddTransaction }) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center border border-dashed border-app bg-app-soft px-6 py-14 text-center">
      <h3 className="text-xl font-semibold text-app-primary">No transactions match these filters</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-app-secondary">
        Try adjusting your search or filters to broaden the result set.
        {isAdmin ? ' You can also add a new transaction to populate the dashboard.' : ''}
      </p>
      {isAdmin ? (
        <button
          type="button"
          onClick={onAddTransaction}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
        >
          <Plus className="h-4 w-4" />
          Add transaction
        </button>
      ) : null}
    </div>
  )
}

function TransactionTable({ transactions, selectedRole, onAddTransaction, onEditTransaction }) {
  const isAdmin = selectedRole === 'admin'

  if (!transactions.length) {
    return <EmptyState isAdmin={isAdmin} onAddTransaction={onAddTransaction} />
  }

  return (
    <div className="panel-grid overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-app px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="text-lg font-semibold text-app-primary">Transactions</h3>
          <p className="mt-1 text-sm text-app-secondary">
            {transactions.length} records shown. Viewer can inspect; admin can add and edit.
          </p>
        </div>
        {isAdmin ? (
          <button
            type="button"
            onClick={onAddTransaction}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent to-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
          >
            <Plus className="h-4 w-4" />
            Add transaction
          </button>
        ) : (
          <div className="pill-shell w-fit px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-app-secondary">
            Viewer mode
          </div>
        )}
      </div>

      <div className="overflow-x-auto scrollbar-subtle">
        <table className="min-w-[760px] w-full text-left">
          <thead className="bg-table-row text-xs uppercase tracking-[0.18em] text-app-muted">
            <tr>
              <th className="px-4 py-4 font-medium sm:px-6">Date</th>
              <th className="px-4 py-4 font-medium sm:px-6">Description</th>
              <th className="px-4 py-4 font-medium sm:px-6">Category</th>
              <th className="px-4 py-4 font-medium sm:px-6">Type</th>
              <th className="px-4 py-4 font-medium sm:px-6">Amount</th>
              <th className="px-4 py-4 font-medium sm:px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-t border-app transition hover:bg-app-soft">
                <td className="whitespace-nowrap px-4 py-4 text-sm text-app-secondary sm:px-6">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <div>
                    <p className="text-sm font-medium text-app-primary">{transaction.description}</p>
                    <p className="mt-1 text-xs text-app-muted">#{transaction.id}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-app-secondary sm:px-6">{transaction.category}</td>
                <td className="px-4 py-4 sm:px-6">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                      transaction.type === 'income'
                        ? 'bg-emerald-400/10 text-emerald-300'
                        : 'bg-rose-400/10 text-rose-300'
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td
                  className={`px-4 py-4 text-sm font-semibold sm:px-6 ${
                    transaction.type === 'income' ? 'text-emerald-300' : 'text-rose-300'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  {isAdmin ? (
                    <button
                      type="button"
                      onClick={() => onEditTransaction(transaction)}
                      className="inline-flex items-center gap-2 rounded-xl border border-app bg-app-soft px-3 py-2 text-sm text-app-primary transition hover:-translate-y-0.5 hover:bg-app-strong"
                    >
                      <PencilLine className="h-4 w-4 text-accent" />
                      Edit
                    </button>
                  ) : (
                    <span className="text-sm text-app-muted">View only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionTable
