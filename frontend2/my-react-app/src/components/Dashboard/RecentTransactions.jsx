import React from 'react'
import './RecentTransactions.css'

function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      name: 'Grocery Store',
      category: 'Groceries',
      amount: -82.45,
      date: 'Jun 11'
    },
    {
      id: 2,
      name: 'Netflix',
      category: 'Entertainment',
      amount: -13.99,
      date: 'Jun 9'
    },
    {
      id: 3,
      name: 'Paycheck',
      category: 'Income',
      amount: 2750.00,
      date: 'Jun 4'
    },
    {
      id: 4,
      name: 'Restaurant',
      category: 'Dining',
      amount: -45.80,
      date: 'Jun 2'
    }
  ]

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h3>Recent Transactions</h3>
        <p className="subtitle">Your latest financial activity</p>
        <a href="#" className="view-all">View All</a>
      </div>
      <div className="transactions-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-icon">
              <span className={transaction.amount > 0 ? 'income' : 'expense'}>
                {transaction.amount > 0 ? '↑' : '↓'}
              </span>
            </div>
            <div className="transaction-details">
              <div className="transaction-name">{transaction.name}</div>
              <div className="transaction-category">{transaction.category}</div>
            </div>
            <div className="transaction-amount-date">
              <div className={`transaction-amount ${transaction.amount > 0 ? 'positive' : ''}`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </div>
              <div className="transaction-date">{transaction.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentTransactions 