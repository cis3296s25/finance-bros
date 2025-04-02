import React from 'react'
import './IncomeExpensesChart.css'

function IncomeExpensesChart() {
  return (
    <div className="chart-container">
      <h3>Income vs. Expenses</h3>
      <p className="subtitle">Last 6 months</p>
      <div className="chart-placeholder">
        {/* We'll add actual chart implementation later */}
        <div className="mock-chart">
          <div className="mock-bar income"></div>
          <div className="mock-bar expenses"></div>
        </div>
      </div>
    </div>
  )
}

export default IncomeExpensesChart 