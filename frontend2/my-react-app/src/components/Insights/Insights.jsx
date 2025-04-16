import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const API_URL = 'http://localhost:5555';

function Insights() {
  const [transactions, setTransactions] = useState([]);
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netSavings: 0,
    topCategories: [],
    spendingTrend: [],
    categoryBreakdown: [],
    monthlyComparison: []
  });

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884D8',
    '#82CA9D',
    '#FFC658',
    '#FF6B6B'
  ];

  useEffect(() => {
    fetchTransactions();
  }, [timeRange]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`);
      setTransactions(response.data);
      calculateInsights(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const calculateInsights = (data) => {
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

    // Calculate totals
    const totalIncome = filteredData
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = filteredData
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    // Calculate category breakdown
    const categoryExpenses = {};
    filteredData
      .filter(t => t.type === 'Expense')
      .forEach(t => {
        categoryExpenses[t.category] = (categoryExpenses[t.category] || 0) + Math.abs(t.amount);
      });

    const categoryBreakdown = Object.entries(categoryExpenses)
      .map(([category, amount]) => ({
        name: category,
        value: amount
      }))
      .sort((a, b) => b.value - a.value);

    // Calculate spending trend (daily)
    const spendingByDate = {};
    filteredData
      .filter(t => t.type === 'Expense')
      .forEach(t => {
        const date = new Date(t.date).toLocaleDateString();
        spendingByDate[date] = (spendingByDate[date] || 0) + Math.abs(t.amount);
      });

    const spendingTrend = Object.entries(spendingByDate)
      .map(([date, amount]) => ({
        date,
        amount
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Calculate monthly comparison
    const monthlyData = {};
    filteredData.forEach(t => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short' });
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0 };
      }
      if (t.type === 'Income') {
        monthlyData[month].income += t.amount;
      } else {
        monthlyData[month].expenses += Math.abs(t.amount);
      }
    });

    const monthlyComparison = Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        income: data.income,
        expenses: data.expenses,
        savings: data.income - data.expenses
      }))
      .sort((a, b) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.indexOf(a.month) - months.indexOf(b.month);
      });

    setInsights({
      totalIncome,
      totalExpenses,
      netSavings: totalIncome - totalExpenses,
      topCategories: categoryBreakdown.slice(0, 5),
      spendingTrend,
      categoryBreakdown,
      monthlyComparison
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="page-container p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Financial Insights</h2>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(insights.totalIncome)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(insights.totalExpenses)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Net Savings</h3>
          <p className={`text-2xl font-bold ${insights.netSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(insights.netSavings)}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Spending Trend */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Spending Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={insights.spendingTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#EF4444" name="Spending" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={insights.categoryBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {insights.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={insights.monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#10B981" />
              <Bar dataKey="expenses" name="Expenses" fill="#EF4444" />
              <Bar dataKey="savings" name="Savings" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Categories */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Spending Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.topCategories.map((category, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-medium">{category.name}</span>
                <span className="text-red-600 font-bold">{formatCurrency(category.value)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{
                    width: `${(category.value / insights.totalExpenses) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Insights; 