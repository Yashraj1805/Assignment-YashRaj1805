import SummaryCard from './SummaryCard'

function OverviewCards({ overview, monthlyComparison }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <SummaryCard
        label="Total Balance"
        value={overview.totalBalance}
        delta={monthlyComparison?.incomeDelta - monthlyComparison?.expenseDelta || 0}
        tone="balance"
        helper="Net position from all tracked income and expenses."
      />
      <SummaryCard
        label="Income"
        value={overview.income}
        delta={monthlyComparison?.incomeDelta || 0}
        tone="income"
        helper="Stable inflows across salary, freelance, and investment returns."
      />
      <SummaryCard
        label="Expenses"
        value={overview.expenses}
        delta={-(monthlyComparison?.expenseDelta || 0)}
        tone="expenses"
        helper="Outflows across living, growth, and discretionary categories."
      />
    </div>
  )
}

export default OverviewCards

