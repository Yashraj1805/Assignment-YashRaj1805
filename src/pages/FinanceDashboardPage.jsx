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
  const [theme, setTheme] = useLocalStorageState('finance-dashboard-theme', 'dark')
  const [filters, setFilters] = useState(defaultFilters)
  const [sortConfig, setSortConfig] = useState(defaultSort)
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'add' })
  const [formValues, setFormValues] = useState(emptyForm)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

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
    setFormValues({
      ...emptyForm,
      date: new Date().toISOString().slice(0, 10),
    })
    setModalState({ isOpen: true, mode: 'add' })
  }

  const openEditModal = (transaction) => {
    setFormValues({
      ...transaction,
      amount: String(transaction.amount),
    })
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
        {
          ...normalizedTransaction,
          id: `txn-${crypto.randomUUID().slice(0, 8)}`,
        },
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
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-[-7%] h-72 w-72 rounded-full bg-accent/15 blur-3xl animate-drift" />
        <div className="absolute right-[-6%] top-40 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl animate-drift" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-20 left-[30%] h-64 w-64 rounded-full bg-fuchsia-400/10 blur-3xl animate-drift" style={{ animationDelay: '2.2s' }} />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 sm:px-6 lg:px-8">
        <DashboardHeader
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          onExport={handleExport}
          theme={theme}
          onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          transactionCount={visibleTransactions.length}
        />

        <main className="space-y-8 pt-5 sm:space-y-10 sm:pt-6">
          <section className="animate-fadeUp space-y-5">
            <OverviewCards overview={overview} monthlyComparison={monthlyComparison} />
          </section>

          <section className="animate-fadeUp space-y-5" style={{ animationDelay: '70ms' }}>
            <SectionHeader
              eyebrow="Overview"
              title="Visualize how money is moving"
              description="The dashboard combines a monthly trend view with category-level expense composition, giving a quick read on cash health and spending concentration."
            />
            <div className="grid gap-5 xl:grid-cols-[1.25fr_0.95fr]">
              <TrendChart data={monthlyTrendData} theme={theme} />
              <CategoryChart data={categorySpendData} theme={theme} />
            </div>
          </section>

          <section className="animate-fadeUp space-y-5" style={{ animationDelay: '140ms' }}>
            <SectionHeader
              eyebrow="Insights"
              title="Actionable observations"
              description="Simple derived insights help surface what matters most without needing a backend analytics engine."
            />
            <InsightsPanel insights={insights} />
          </section>

          <section className="animate-fadeUp space-y-5" style={{ animationDelay: '210ms' }}>
            <SectionHeader
              eyebrow="Transactions"
              title="Searchable transaction ledger"
              description="Search, filter, and sort through realistic finance activity. Admin mode unlocks add and edit workflows through a clean modal experience."
            />

            <TransactionFilters
              search={filters.search}
              onSearchChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              selectedCategory={filters.selectedCategory}
              onCategoryChange={(value) =>
                setFilters((current) => ({ ...current, selectedCategory: value }))
              }
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

            <TransactionTable
              transactions={visibleTransactions}
              selectedRole={selectedRole}
              onAddTransaction={openAddModal}
              onEditTransaction={openEditModal}
            />
          </section>
        </main>
      </div>

      <TransactionModal
        isOpen={modalState.isOpen && selectedRole === 'admin'}
        mode={modalState.mode}
        categories={categories}
        formValues={formValues}
        onChange={handleFormChange}
        onClose={closeModal}
        onSubmit={handleSubmitTransaction}
      />
    </div>
  )
}

export default FinanceDashboardPage
