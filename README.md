# PulseFi Finance Dashboard

A polished, responsive finance dashboard built for a Frontend Developer Intern screening assignment. The project uses realistic mock data to present financial summaries, charts, searchable transactions, role-based UI behavior, and lightweight insights in a premium dark fintech style.

## Overview

PulseFi helps a user quickly understand balance, income, expenses, cash flow trends, category-level spending, and transaction activity. The interface is fully frontend-only and intentionally designed to feel recruiter-ready, with modular React components, responsive layouts, clean motion, and graceful no-data handling.

## Features

- Summary cards for total balance, income, and expenses
- Time-based cash flow visualization with Recharts
- Category-based expense visualization with Recharts
- Search, filter, and sort support for transactions
- Role switcher for `Viewer` and `Admin`
- Admin-only add and edit transaction modal
- Derived insights for top spending category, monthly comparison, and spending observations
- `localStorage` persistence for role and transactions
- CSV export for the currently visible transaction set
- Responsive dark-first fintech styling across mobile, tablet, and desktop
- Empty states for filtered or missing data

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Recharts
- Lucide React
- ESLint

## Project Structure

```text
src/
  components/
  data/
  hooks/
  pages/
  utils/
  App.jsx
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Create a production build:
   ```bash
   npm run build
   ```
4. Run lint checks:
   ```bash
   npm run lint
   ```

## Requirement Audit

- [x] Dashboard overview with Total Balance, Income, and Expenses summary cards
- [x] At least one time-based visualization
- [x] At least one category-based visualization
- [x] Transactions section with date, amount, category, and type
- [x] Search support
- [x] Filtering support
- [x] Sorting support
- [x] Simulated `Viewer` role with read-only behavior
- [x] Simulated `Admin` role with add and edit transaction capabilities
- [x] Role switcher in the UI
- [x] Insights for highest spending category, monthly comparison, and useful observations
- [x] State management for transactions, selected role, filters, search, and sorting
- [x] Clean and readable UI
- [x] Fully responsive mobile, tablet, and desktop layout
- [x] Graceful empty states and no-data handling
- [x] Built with React + Vite
- [x] Styled with Tailwind CSS
- [x] Charts built with Recharts
- [x] Modular, production-style component structure
- [x] Realistic mock finance data
- [x] Comments kept minimal
- [x] Submission-ready README included

## Notes

- Viewer mode can inspect charts, summaries, insights, and transactions but cannot create or edit data.
- Admin mode unlocks the transaction modal for both creating and editing entries.
- Transaction and role state persist locally in the browser using `localStorage`.
- CSV export respects the current search, filters, and sort order.
