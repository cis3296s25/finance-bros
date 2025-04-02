import React from 'react'
import './FinancialOverview.css'

function FinancialOverview() {
  const stats = [
    {
      title: 'Total Balance',
      amount: '$14,589.90',
      change: '+4.3%',
      isPositive: true
    },
    {
      title: 'Monthly Income',
      amount: '$5,491.67',
      change: '+2.1%',
      isPositive: true
    },
    {
      title: 'Monthly Expenses',
      amount: '$4,300.00',
      change: '-1.8%',
      isPositive: false
    },
    {
      title: 'Monthly Savings',
      amount: '$1,191.67',
      change: '+7.2%',
      isPositive: true
    }
  ]

  return (
    <div className="financial-overview">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <h3>{stat.title}</h3>
          <div className="amount">{stat.amount}</div>
          <div className={`change ${stat.isPositive ? 'positive' : 'negative'}`}>
            {stat.change} from last month
          </div>
        </div>
      ))}
    </div>
  )
}

export default FinancialOverview 