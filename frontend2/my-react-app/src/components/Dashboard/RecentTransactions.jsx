import React from 'react';

function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      name: 'Grocery Store',
      category: 'Groceries',
      amount: -82.45,
      date: 'Jun 11',
    },
    {
      id: 2,
      name: 'Netflix',
      category: 'Entertainment',
      amount: -13.99,
      date: 'Jun 9',
    },
    {
      id: 3,
      name: 'Paycheck',
      category: 'Income',
      amount: 2750.0,
      date: 'Jun 4',
    },
    {
      id: 4,
      name: 'Restaurant',
      category: 'Dining',
      amount: -45.8,
      date: 'Jun 2',
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
          <p className="text-sm text-gray-500">Your latest financial activity</p>
        </div>
        <a href="#" className="text-blue-500 hover:underline text-sm">
          View All
        </a>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            {/* Icon */}
            <div className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}
              >
                {transaction.amount > 0 ? '↑' : '↓'}
              </div>

              {/* Transaction Details */}
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-800">{transaction.name}</div>
                <div className="text-xs text-gray-500">{transaction.category}</div>
              </div>
            </div>

            {/* Amount and Date */}
            <div className="text-right">
              <div
                className={`text-sm font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">{transaction.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;