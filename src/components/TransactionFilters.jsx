function FilterSelect({ label, value, onChange, options }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '11px', color: '#000' }}>
      {label}:
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="win-select"
        style={{ minWidth: '120px' }}
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
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
    <div className="win-window" style={{ padding: 0 }}>
      {/* Toolbar header */}
      <div
        style={{
          background: 'linear-gradient(to right, #d4d0c8, #e8e4dc)',
          borderBottom: '1px solid #808080',
          padding: '3px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Find:</span>
        <div className="win-inset" style={{ flex: 1, maxWidth: '280px', display: 'flex', alignItems: 'center', padding: '1px 4px', gap: '4px' }}>
          <span style={{ fontSize: '10px', color: '#808080' }}>&#128269;</span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search description, category, or type..."
            className="win-input"
            style={{ border: 'none', flex: 1, padding: '1px 2px', background: 'transparent', outline: 'none', fontSize: '11px' }}
          />
        </div>
      </div>

      {/* Filter toolbar */}
      <div
        style={{
          padding: '4px 8px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'flex-end',
          borderBottom: '1px solid #bbb',
        }}
      >
        <FilterSelect
          label="Category"
          value={selectedCategory}
          onChange={onCategoryChange}
          options={['All', ...categories]}
        />
        <FilterSelect
          label="Type"
          value={selectedType}
          onChange={onTypeChange}
          options={['All', 'income', 'expense']}
        />
        <FilterSelect
          label="Sort By"
          value={sortKey}
          onChange={onSortKeyChange}
          options={['date', 'amount', 'category', 'type']}
        />
        <label style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '11px', color: '#000' }}>
          Order:
          <button
            type="button"
            onClick={onSortDirectionChange}
            className="win-button"
            style={{ minWidth: '100px' }}
          >
            {sortDirection === 'asc' ? '&#8593; Ascending' : '&#8595; Descending'}
          </button>
        </label>
      </div>
    </div>
  )
}

export default TransactionFilters
