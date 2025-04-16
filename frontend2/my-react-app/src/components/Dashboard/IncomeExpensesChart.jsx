import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function IncomeExpensesChart() {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [timeRange]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5555/transactions');
      calculateChartData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const calculateChartData = (data) => {
    const now = new Date();
    const filteredData = data.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const diff = now - transactionDate;
      const days = diff / (1000 * 60 * 60 * 24);

      switch (timeRange) {
        case 'week':
          return days <= 7;
        case 'month':
          return days <= 30;
        case 'year':
          return days <= 365;
        default:
          return true;
      }
    });

    // Calculate total income and expenses
    const totals = {
      income: 0,
      expenses: 0
    };

    filteredData.forEach(t => {
      if (t.type === 'Income') {
        totals.income += t.amount;
      } else {
        totals.expenses += Math.abs(t.amount);
      }
    });

    // Create data array with just one entry containing both totals
    setChartData([{
      name: 'Totals',
      income: totals.income,
      expenses: totals.expenses
    }]);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Income vs. Expenses</h3>
          <p className="text-sm text-gray-600">
            {timeRange === 'week' ? 'Last 7 Days' :
              timeRange === 'month' ? 'Last 30 Days' :
                'Last Year'}
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis hide={true} />
            <YAxis />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              labelFormatter={() => ''}
            />
            <Legend />
            <Bar dataKey="income" name="Income" fill="#10B981" />
            <Bar dataKey="expenses" name="Expenses" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IncomeExpensesChart;