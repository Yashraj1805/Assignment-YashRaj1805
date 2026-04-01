import { useEffect, useMemo, useState } from 'react'
import CategoryChart from '../components/CategoryChart'
import DashboardHeader from '../components/DashboardHeader'
import InsightsPanel from '../components/InsightsPanel'
import OverviewCards from '../components/OverviewCards'
import SectionHeader from '../components/SectionHeader'
import TransactionFilters from '../components/TransactionFilters'
import TransactionModal from '../components/TransactionModal'
import TransactionTable from '../components/TransactionTable'
import TrendChart from '../components/TrendChart'
import { mockTransactions } from '../data/mockTransactions'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import {
  filterTransactions,
  getCategorySpendData,
  getInsightCards,
  getMonthlyComparison,
  getMonthlyTrendData,
  getOverviewMetrics,
  getUniqueCategories,
  sortTransactions,
} from '../utils/dashboard'

const defaultFilters = {
  search: '',
  selectedCategory: 'All',
  selectedType: 'All',
}

const defaultSort = {
  key: 'date',
  direction: 'desc',
}

const emptyForm = {
  id: null,
  date: '',
  description: '',
  category: '',
  type: 'expense',
  amount: '',
}

function FinanceDashboardPage() {
  const [transactions, setTransactions] = useLocalStorageState(
    'finance-dashboard-transactions',
    mockTransactions,
  )
  const [selectedRole, setSelectedRole] = useLocalStorageState('finance-dashboard-role', 'viewer')
  const [theme, setTheme] = useLocalStorageState('finance-dashboard-theme', 'light')
  const [filters, setFilters] = useState(defaultFilters)
  const [sortConfig, setSortConfig] = useState(defaultSort)
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'add' })
  const [formValues, setFormValues] = useState(emptyForm)

  // Win2000 style — always light mode
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  const categories = useMemo(() => getUniqueCategories(transactions), [transactions])

  const visibleTransactions = useMemo(() => {
    const filtered = filterTransactions(transactions, filters)
    return sortTransactions(filtered, sortConfig)
  }, [transactions, filters, sortConfig])

  const overview = useMemo(() => getOverviewMetrics(visibleTransactions), [visibleTransactions])
  const monthlyTrendData = useMemo(() => getMonthlyTrendData(visibleTransactions), [visibleTransactions])
  const categorySpendData = useMemo(() => getCategorySpendData(visibleTransactions), [visibleTransactions])
  const monthlyComparison = useMemo(() => getMonthlyComparison(visibleTransactions), [visibleTransactions])
  const insights = useMemo(() => getInsightCards(visibleTransactions), [visibleTransactions])

  const openAddModal = () => {
    setFormValues({ ...emptyForm, date: new Date().toISOString().slice(0, 10) })
    setModalState({ isOpen: true, mode: 'add' })
  }

  const openEditModal = (transaction) => {
    setFormValues({ ...transaction, amount: String(transaction.amount) })
    setModalState({ isOpen: true, mode: 'edit' })
  }

  const closeModal = () => {
    setModalState({ isOpen: false, mode: 'add' })
    setFormValues(emptyForm)
  }

  const handleFormChange = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }))
  }

  const handleSubmitTransaction = () => {
    const normalizedTransaction = {
      ...formValues,
      category: formValues.category.trim(),
      description: formValues.description.trim(),
      amount: Number(formValues.amount),
    }

    if (modalState.mode === 'edit') {
      setTransactions((current) =>
        current.map((transaction) =>
          transaction.id === normalizedTransaction.id ? normalizedTransaction : transaction,
        ),
      )
    } else {
      setTransactions((current) => [
        { ...normalizedTransaction, id: `txn-${crypto.randomUUID().slice(0, 8)}` },
        ...current,
      ])
    }

    closeModal()
  }

  const handleExport = () => {
    const header = ['id', 'date', 'description', 'category', 'type', 'amount']
    const rows = visibleTransactions.map((transaction) =>
      header.map((column) => `"${String(transaction[column]).replaceAll('"', '""')}"`).join(','),
    )
    const csvContent = [header.join(','), ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'finance-dashboard-transactions.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    /* Desktop wallpaper */
    <div style={{ minHeight: '100vh', background: '#3a6ea5', padding: '8px' }}>
      {/* Main application window */}
      <div
        className="win-window"
        style={{
          minHeight: 'calc(100vh - 16px)',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <DashboardHeader
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          onExport={handleExport}
          theme={theme}
          onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          transactionCount={visibleTransactions.length}
        />

        {/* Main content area */}
        <main style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>

          {/* Overview cards */}
          <section>
            <SectionHeader
              eyebrow="Overview"
              title="Account Summary"
              description="Net position, income, and expense totals for the current filter set."
            />
            <OverviewCards overview={overview} monthlyComparison={monthlyComparison} />
          </section>

          {/* Charts */}
          <section>
            <SectionHeader
              eyebrow="Charts"
              title="Visualize Money Movement"
              description="Monthly trend and category breakdown charts."
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6px' }}>
              <TrendChart data={monthlyTrendData} theme={theme} />
              <CategoryChart data={categorySpendData} theme={theme} />
            </div>
          </section>

          {/* Insights */}
          <section>
            <SectionHeader
              eyebrow="Insights"
              title="Actionable Observations"
              description="Key derived metrics and alerts from your transaction data."
            />
            <InsightsPanel insights={insights} />
          </section>

          {/* Transactions */}
          <section>
            <SectionHeader
              eyebrow="Ledger"
              title="Transaction Ledger"
              description="Search, filter, and sort your finance activity."
            />
            <TransactionFilters
              search={filters.search}
              onSearchChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              selectedCategory={filters.selectedCategory}
              onCategoryChange={(value) => setFilters((current) => ({ ...current, selectedCategory: value }))}
              selectedType={filters.selectedType}
              onTypeChange={(value) => setFilters((current) => ({ ...current, selectedType: value }))}
              sortKey={sortConfig.key}
              sortDirection={sortConfig.direction}
              onSortKeyChange={(value) => setSortConfig((current) => ({ ...current, key: value }))}
              onSortDirectionChange={() =>
                setSortConfig((current) => ({
                  ...current,
                  direction: current.direction === 'asc' ? 'desc' : 'asc',
                }))
              }
              categories={categories}
            />
            <div style={{ marginTop: '6px' }}>
              <TransactionTable
                transactions={visibleTransactions}
                selectedRole={selectedRole}
                onAddTransaction={openAddModal}
                onEditTransaction={openEditModal}
              />
            </div>
          </section>
        </main>

        {/* App Taskbar */}
        <div className="win-taskbar">
          <button type="button" className="win-button" style={{ fontWeight: 'bold', minWidth: '80px', background: '#d4d0c8' }}>
            <span style={{ marginRight: '4px' }}>&#127987;</span>
            Start
          </button>
          <div style={{ width: '1px', background: '#808080', height: '22px', margin: '0 2px' }} />
          <div
            className="win-button"
            style={{ minWidth: '120px', justifyContent: 'flex-start', fontSize: '11px', background: '#bbb8b0', borderTopColor: '#808080', borderLeftColor: '#808080', borderRightColor: '#fff', borderBottomColor: '#fff' }}
          >
            <span style={{ marginRight: '4px' }}>$</span>
            PulseFi Dashboard
          </div>
          <div style={{ flex: 1 }} />
          <div className="win-inset" style={{ padding: '2px 8px', fontSize: '11px', fontFamily: 'Courier New, monospace' }}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceDashboardPage
