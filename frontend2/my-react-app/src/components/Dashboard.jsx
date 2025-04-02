import { useState } from 'react'
import './Dashboard.css'
import FinancialOverview from './FinancialOverview'
import IncomeExpensesChart from './IncomeExpensesChart'
import RecentTransactions from './RecentTransactions'
import AIInsights from './AIInsights'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const handleAddAccount = () => {
    // This would typically open your Plaid connection flow
    console.log('Opening add account flow...')
  }

  const handleSetGoal = () => {
    // This would open your goal setting modal/page
    console.log('Opening goal setting...')
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Financial Dashboard</h2>
          <p className="subtitle">Your financial overview and insights</p>
        </div>
        <div className="dashboard-actions">
          <button className="add-account-btn" onClick={handleAddAccount}>
            Add Account
          </button>
          <button className="set-goal-btn" onClick={handleSetGoal}>
            Set Goal
          </button>
        </div>
      </div>
      
      <div className="dashboard-nav">
        <a 
          href="#" 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault()
            setActiveTab('overview')
          }}
        >
          Overview
        </a>
        <a 
          href="#" 
          className={activeTab === 'accounts' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault()
            setActiveTab('accounts')
          }}
        >
          Accounts
        </a>
        <a 
          href="#" 
          className={activeTab === 'budgets' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault()
            setActiveTab('budgets')
          }}
        >
          Budgets
        </a>
      </div>

      {activeTab === 'overview' && (
        <>
          <FinancialOverview />
          <div className="dashboard-content">
            <div className="main-content">
              <IncomeExpensesChart />
              <RecentTransactions />
            </div>
            <div className="sidebar">
              <AIInsights />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard 