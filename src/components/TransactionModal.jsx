import { X } from 'lucide-react'

const initialFormState = {
  date: '',
  description: '',
  category: '',
  type: 'expense',
  amount: '',
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2 text-sm text-app-secondary">
      {label}
      {children}
    </label>
  )
}

function TransactionModal({
  isOpen,
  mode,
  categories,
  formValues,
  onChange,
  onClose,
  onSubmit,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md">
      <div className="panel-grid w-full max-w-2xl border p-6 shadow-glow sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">Admin editor</p>
            <h3 className="mt-2 text-2xl font-semibold text-app-primary">
              {mode === 'edit' ? 'Edit transaction' : 'Add transaction'}
            </h3>
            <p className="mt-2 text-sm leading-6 text-app-secondary">
              Admin mode can create and update transactions. Viewer mode is intentionally read-only.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-app bg-app-soft p-3 text-app-secondary transition hover:bg-app-strong hover:text-app-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          className="mt-6 grid gap-4 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <Field label="Date">
            <input
              type="date"
              value={formValues.date || initialFormState.date}
              onChange={(event) => onChange('date', event.target.value)}
              className="input-shell"
              required
            />
          </Field>
          <Field label="Amount">
            <input
              type="number"
              min="0"
              step="0.01"
              value={formValues.amount || initialFormState.amount}
              onChange={(event) => onChange('amount', event.target.value)}
              placeholder="0.00"
              className="input-shell"
              required
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description">
              <input
                type="text"
                value={formValues.description || initialFormState.description}
                onChange={(event) => onChange('description', event.target.value)}
                placeholder="e.g. Salary deposit or travel booking"
                className="input-shell w-full"
                required
              />
            </Field>
          </div>
          <Field label="Category">
            <input
              list="transaction-categories"
              value={formValues.category || initialFormState.category}
              onChange={(event) => onChange('category', event.target.value)}
              placeholder="Select or type a category"
              className="input-shell"
              required
            />
            <datalist id="transaction-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </Field>
          <Field label="Type">
            <select value={formValues.type || initialFormState.type} onChange={(event) => onChange('type', event.target.value)} className="input-shell">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </Field>

          <div className="mt-2 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-app bg-app-soft px-5 py-3 text-sm font-medium text-app-secondary transition hover:bg-app-strong"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-accent to-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25"
            >
              {mode === 'edit' ? 'Save changes' : 'Create transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionModal
