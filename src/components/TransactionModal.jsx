const initialFormState = {
  date: '',
  description: '',
  category: '',
  type: 'expense',
  amount: '',
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '11px' }}>
      <label style={{ color: '#000', fontWeight: 'bold', fontSize: '11px' }}>{label}:</label>
      {children}
    </div>
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
    /* Overlay — matches classic modal dimming */
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Dialog window */}
      <div
        className="win-window"
        style={{ width: '100%', maxWidth: '440px', padding: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Title bar */}
        <div className="win-titlebar">
          <span style={{ fontSize: '11px' }}>&#128203;</span>
          <span id="modal-title">
            {mode === 'edit' ? 'Edit Transaction' : 'Add New Transaction'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="win-button ml-auto"
            style={{ minWidth: '16px', minHeight: '14px', padding: '0 4px', fontSize: '10px', lineHeight: 1, fontWeight: 'bold', color: '#8b0000' }}
            aria-label="Close"
          >
            &#10005;
          </button>
        </div>

        {/* Dialog body */}
        <div style={{ padding: '12px' }}>
          <p style={{ fontSize: '11px', color: '#444', margin: '0 0 10px', borderBottom: '1px solid #bbb', paddingBottom: '6px' }}>
            {mode === 'edit'
              ? 'Modify the transaction details below, then click Save.'
              : 'Fill in the details below to add a new transaction to the ledger.'}
          </p>

          <form
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}
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
                className="win-input"
                style={{ width: '100%' }}
                required
              />
            </Field>
            <Field label="Amount ($)">
              <input
                type="number"
                min="0"
                step="0.01"
                value={formValues.amount || initialFormState.amount}
                onChange={(event) => onChange('amount', event.target.value)}
                placeholder="0.00"
                className="win-input"
                style={{ width: '100%', fontFamily: 'Courier New, monospace' }}
                required
              />
            </Field>
            <div style={{ gridColumn: '1 / -1' }}>
              <Field label="Description">
                <input
                  type="text"
                  value={formValues.description || initialFormState.description}
                  onChange={(event) => onChange('description', event.target.value)}
                  placeholder="e.g. Salary deposit or travel booking"
                  className="win-input"
                  style={{ width: '100%' }}
                  required
                />
              </Field>
            </div>
            <Field label="Category">
              <input
                list="transaction-categories"
                value={formValues.category || initialFormState.category}
                onChange={(event) => onChange('category', event.target.value)}
                placeholder="Select or type..."
                className="win-input"
                style={{ width: '100%' }}
                required
              />
              <datalist id="transaction-categories">
                {categories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </Field>
            <Field label="Type">
              <select
                value={formValues.type || initialFormState.type}
                onChange={(event) => onChange('type', event.target.value)}
                className="win-select"
                style={{ width: '100%' }}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </Field>

            {/* Button row — classic dialog OK/Cancel */}
            <div
              style={{
                gridColumn: '1 / -1',
                borderTop: '1px solid #bbb',
                paddingTop: '10px',
                marginTop: '2px',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '6px',
              }}
            >
              <button type="submit" className="win-button win-button-primary" style={{ fontWeight: 'bold' }}>
                {mode === 'edit' ? 'Save' : 'OK'}
              </button>
              <button type="button" onClick={onClose} className="win-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TransactionModal
