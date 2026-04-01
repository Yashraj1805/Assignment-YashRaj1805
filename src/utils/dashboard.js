const monthKeyFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
})

export function getOverviewMetrics(transactions) {
  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  return {
    income,
    expenses,
    totalBalance: income - expenses,
  }
}

export function getMonthlyTrendData(transactions) {
  const grouped = transactions.reduce((accumulator, transaction) => {
    const monthKey = monthKeyFormatter.format(new Date(transaction.date))

    if (!accumulator[monthKey]) {
      accumulator[monthKey] = { month: monthKey, income: 0, expenses: 0 }
    }

    if (transaction.type === 'income') {
      accumulator[monthKey].income += transaction.amount
    } else {
      accumulator[monthKey].expenses += transaction.amount
    }

    return accumulator
  }, {})

  return Object.values(grouped).sort(
    (left, right) => new Date(left.month) - new Date(right.month),
  )
}

export function getCategorySpendData(transactions) {
  const grouped = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((accumulator, transaction) => {
      accumulator[transaction.category] =
        (accumulator[transaction.category] || 0) + transaction.amount
      return accumulator
    }, {})

  return Object.entries(grouped)
    .map(([category, amount]) => ({ category, amount }))
    .sort((left, right) => right.amount - left.amount)
}

export function getHighestSpendingCategory(transactions) {
  return getCategorySpendData(transactions)[0] || null
}

export function getMonthlyComparison(transactions) {
  const monthly = getMonthlyTrendData(transactions)

  if (monthly.length < 2) {
    return null
  }

  const current = monthly[monthly.length - 1]
  const previous = monthly[monthly.length - 2]

  const expenseDelta = current.expenses - previous.expenses
  const incomeDelta = current.income - previous.income

  return { current, previous, expenseDelta, incomeDelta }
}

export function getInsightCards(transactions) {
  const topCategory = getHighestSpendingCategory(transactions)
  const comparison = getMonthlyComparison(transactions)
  const recentExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .sort((left, right) => new Date(right.date) - new Date(left.date))
    .slice(0, 5)

  const recentAverage =
    recentExpenses.reduce((sum, transaction) => sum + transaction.amount, 0) /
    (recentExpenses.length || 1)

  return [
    topCategory
      ? {
          title: 'Highest spending category',
          value: topCategory.category,
          detail: `${Math.round(topCategory.amount)} spent across the selected range.`,
          tone: 'rose',
        }
      : {
          title: 'Highest spending category',
          value: 'No expense data',
          detail: 'Add expense transactions to generate category insights.',
          tone: 'neutral',
        },
    comparison
      ? {
          title: 'Monthly comparison',
          value:
            comparison.expenseDelta <= 0
              ? `${Math.abs(Math.round(comparison.expenseDelta))} lower spend`
              : `${Math.round(comparison.expenseDelta)} higher spend`,
          detail: `${comparison.current.month} vs ${comparison.previous.month}; income moved ${comparison.incomeDelta >= 0 ? 'up' : 'down'} by ${Math.abs(Math.round(comparison.incomeDelta))}.`,
          tone: comparison.expenseDelta <= 0 ? 'green' : 'amber',
        }
      : {
          title: 'Monthly comparison',
          value: 'Not enough history',
          detail: 'At least two months of data are needed for comparison.',
          tone: 'neutral',
        },
    {
      title: 'Useful observation',
      value: `${Math.round(recentAverage)} avg recent expense`,
      detail:
        recentAverage > 250
          ? 'Recent outflows are elevated; travel and housing are driving larger tickets.'
          : 'Recent spending is stable, with mostly routine operational expenses.',
      tone: 'teal',
    },
  ]
}

export function getUniqueCategories(transactions) {
  return [...new Set(transactions.map((transaction) => transaction.category))].sort()
}

export function filterTransactions(transactions, filters) {
  const { search, selectedCategory, selectedType } = filters

  return transactions.filter((transaction) => {
    const matchesSearch =
      !search ||
      [transaction.description, transaction.category, transaction.type]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' || transaction.category === selectedCategory

    const matchesType = selectedType === 'All' || transaction.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })
}

export function sortTransactions(transactions, sortConfig) {
  const sorted = [...transactions]

  sorted.sort((left, right) => {
    const { key, direction } = sortConfig
    const modifier = direction === 'asc' ? 1 : -1

    if (key === 'date') {
      return (new Date(left.date) - new Date(right.date)) * modifier
    }

    if (key === 'amount') {
      return (left.amount - right.amount) * modifier
    }

    return String(left[key]).localeCompare(String(right[key])) * modifier
  })

  return sorted
}

