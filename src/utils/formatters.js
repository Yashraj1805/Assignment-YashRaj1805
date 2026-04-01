export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

export const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
})

export const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export function formatCurrency(amount) {
  return currencyFormatter.format(amount)
}

export function formatCompactCurrency(amount) {
  return compactCurrencyFormatter.format(amount)
}

export function formatDate(dateString) {
  return shortDateFormatter.format(new Date(dateString))
}

export function formatMonth(dateString) {
  return monthFormatter.format(new Date(dateString))
}

