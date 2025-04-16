import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  const fetchRecentTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5555/transactions');
      // Sort by date and get the 4 most recent transactions
      const sortedTransactions = response.data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);
      setTransactions(sortedTransactions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
          <p className="text-sm text-gray-500">Your latest financial activity</p>
        </div>
        <a href="/transactions" className="text-blue-500 hover:underline text-sm">
          View All
        </a>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            {/* Icon */}
            <div className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${transaction.type === 'Income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}
              >
                {transaction.type === 'Income' ? '↑' : '↓'}
              </div>

              {/* Transaction Details */}
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-800">{transaction.description}</div>
                <div className="text-xs text-gray-500">{transaction.category}</div>
              </div>
            </div>

            {/* Amount and Date */}
            <div className="text-right">
              <div
                className={`text-sm font-semibold ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                  }`}
              >
                {transaction.type === 'Income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
              </div>
              <div className="text-xs text-gray-500">
                {format(parseISO(transaction.date), 'MMM d')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;