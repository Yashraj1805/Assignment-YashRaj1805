import { formatCurrency, formatDate } from '../utils/formatters'

function EmptyState({ isAdmin, onAddTransaction }) {
  return (
    <div className="win-window" style={{ padding: '24px', textAlign: 'center' }}>
      <div style={{ marginBottom: '12px' }}>
        <div
          style={{
            width: '48px', height: '48px', margin: '0 auto 8px',
            background: '#d4d0c8',
            borderTop: '2px solid #fff', borderLeft: '2px solid #fff',
            borderRight: '2px solid #404040', borderBottom: '2px solid #404040',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px',
          }}
        >
          &#128202;
        </div>
        <p style={{ fontSize: '12px', fontWeight: 'bold', margin: '0 0 4px' }}>No transactions match these filters</p>
        <p style={{ fontSize: '11px', color: '#444', margin: 0 }}>
          Try adjusting your search or filters to broaden the result set.
          {isAdmin ? ' You can also add a new transaction to populate the dashboard.' : ''}
        </p>
      </div>
      {isAdmin && (
        <button type="button" onClick={onAddTransaction} className="win-button">
          + Add Transaction
        </button>
      )}
    </div>
  )
}

function TransactionTable({ transactions, selectedRole, onAddTransaction, onEditTransaction }) {
  const isAdmin = selectedRole === 'admin'

  if (!transactions.length) {
    return <EmptyState isAdmin={isAdmin} onAddTransaction={onAddTransaction} />
  }

  return (
    <div className="win-window" style={{ padding: 0 }}>
      {/* Table header toolbar */}
      <div
        style={{
          padding: '3px 6px',
          background: 'linear-gradient(to right, #d4d0c8, #e8e4dc)',
          borderBottom: '1px solid #808080',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Transactions</span>
          <span
            className="win-inset"
            style={{ fontSize: '10px', padding: '1px 6px', display: 'inline-block' }}
          >
            {transactions.length} records
          </span>
          {isAdmin ? (
            <span
              style={{
                background: '#006400', color: '#fff',
                fontSize: '9px', padding: '1px 5px', fontWeight: 'bold', textTransform: 'uppercase',
              }}
            >
              Admin Mode
            </span>
          ) : (
            <span
              style={{
                background: '#808080', color: '#fff',
                fontSize: '9px', padding: '1px 5px', fontWeight: 'bold', textTransform: 'uppercase',
              }}
            >
              Viewer Mode
            </span>
          )}
        </div>
        {isAdmin && (
          <button type="button" onClick={onAddTransaction} className="win-button">
            + Add Transaction
          </button>
        )}
      </div>

      {/* ListView table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="win-listview" style={{ minWidth: '700px' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td style={{ whiteSpace: 'nowrap', fontFamily: 'Courier New, monospace' }}>
                  {formatDate(transaction.date)}
                </td>
                <td>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{transaction.description}</div>
                    <div style={{ fontSize: '9px', color: '#808080' }}>#{transaction.id}</div>
                  </div>
                </td>
                <td>{transaction.category}</td>
                <td>
                  <span
                    className={transaction.type === 'income' ? 'win-badge-income' : 'win-badge-expense'}
                    style={{ textTransform: 'uppercase', fontSize: '9px' }}
                  >
                    {transaction.type === 'income' ? '+ ' : '- '}{transaction.type}
                  </span>
                </td>
                <td
                  style={{
                    fontFamily: 'Courier New, monospace',
                    fontWeight: 'bold',
                    color: transaction.type === 'income' ? '#006400' : '#8b0000',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </td>
                {isAdmin && (
                  <td>
                    <button
                      type="button"
                      onClick={() => onEditTransaction(transaction)}
                      className="win-button"
                      style={{ minWidth: '60px', fontSize: '10px', padding: '2px 6px' }}
                    >
                      Edit...
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status bar */}
      <div className="win-statusbar">
        <div className="win-statusbar-pane">
          {transactions.length} object(s)
        </div>
        <div className="win-statusbar-pane" style={{ flex: 0, whiteSpace: 'nowrap' }}>
          {isAdmin ? 'Ready' : 'Read Only'}
        </div>
      </div>
    </div>
  )
}

export default TransactionTable
