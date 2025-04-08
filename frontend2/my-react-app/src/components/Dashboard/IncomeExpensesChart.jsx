import React from 'react';

function IncomeExpensesChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Income vs. Expenses</h3>
      <p className="text-sm text-gray-600 mb-4">Last 6 months</p>
      <div className="flex items-center justify-center h-40 bg-gray-100 rounded">
        {/* Placeholder for the actual chart */}
        <div className="flex space-x-4">
          <div className="w-8 h-24 bg-blue-500 rounded"></div>
          <div className="w-8 h-16 bg-red-500 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default IncomeExpensesChart;