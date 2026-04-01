import { Funnel, Search, SlidersHorizontal } from 'lucide-react'

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-[150px] flex-1 flex-col gap-2 text-sm text-app-secondary">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="input-shell">
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-900 text-white dark:bg-slate-900 dark:text-white">
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function TransactionFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  sortKey,
  sortDirection,
  onSortKeyChange,
  onSortDirectionChange,
  categories,
}) {
  return (
    <div className="glass-panel p-4 sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-app-primary">
          <Funnel className="h-4 w-4 text-accent" />
          Search, filter, and sort transactions
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
          <label className="flex flex-col gap-2 text-sm text-app-secondary md:col-span-2 xl:col-span-1">
            Search
            <div className="filter-shell flex items-center gap-3">
              <Search className="h-4 w-4 text-app-muted" />
              <input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search by description, category, or type"
                className="w-full bg-transparent text-sm text-app-primary outline-none placeholder:text-app-muted"
              />
            </div>
          </label>

          <FilterSelect label="Category" value={selectedCategory} onChange={onCategoryChange} options={['All', ...categories]} />
          <FilterSelect label="Type" value={selectedType} onChange={onTypeChange} options={['All', 'income', 'expense']} />
          <FilterSelect label="Sort by" value={sortKey} onChange={onSortKeyChange} options={['date', 'amount', 'category', 'type']} />
          <label className="flex min-w-[150px] flex-1 flex-col gap-2 text-sm text-app-secondary">
            Direction
            <button
              type="button"
              onClick={onSortDirectionChange}
              className="filter-shell inline-flex h-[50px] items-center justify-between text-sm text-app-primary hover:bg-app-strong"
            >
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-accent" />
                {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-app-muted">Toggle</span>
            </button>
          </label>
        </div>
      </div>
    </div>
  )
}

export default TransactionFilters
