// BudgetingTab.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from '@clerk/clerk-react';

const COLORS = ["#4ade80", "#facc15", "#f87171", "#60a5fa", "#c084fc", "#f472b6"];

// Predefined categories
const PREDEFINED_CATEGORIES = [
  "Housing",
  "Transportation",
  "Food & Dining",
  "Utilities",
  "Insurance",
  "Healthcare",
  "Entertainment",
  "Shopping",
  "Personal Care",
  "Education",
  "Savings",
  "Investments",
  "Debt Payments",
  "Gifts & Donations",
  "Travel",
  "Groceries",
  "Restaurants",
  "Subscriptions",
  "Hobbies",
  "Pet Care"
];

export default function BudgetingTab() {
  const { user } = useUser();
  const [budgets, setBudgets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: '',
    notes: ''
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:5555/budgeting");
      setBudgets(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch budgets:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const budgetData = {
        ...newBudget,
        userId: '1',
        amount: Number(newBudget.amount),
        period: 'monthly',
        startDate: new Date(),
      };
      
      console.log('Sending budget data:', budgetData);
      
      await axios.post("http://localhost:5555/budgeting", budgetData);
      setNewBudget({
        category: '',
        amount: '',
        notes: ''
      });
      setShowForm(false);
      fetchBudgets();
    } catch (error) {
      console.error("Failed to create budget:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (budgetId) => {
    if (!window.confirm('Are you sure you want to delete this budget?')) return;
    try {
      await axios.delete(`http://localhost:5555/budgeting/${budgetId}`);
      fetchBudgets();
    } catch (error) {
      console.error("Failed to delete budget:", error);
    }
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white rounded-2xl shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Budget Overview</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-lg transition duration-200 font-medium"
        >
          {showForm ? 'Cancel' : 'Create Budget'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={newBudget.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {PREDEFINED_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget Amount</label>
              <input
                type="number"
                name="amount"
                value={newBudget.amount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter monthly budget amount"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              name="notes"
              value={newBudget.notes}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="2"
              placeholder="Add any notes about this budget"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 md:px-6 py-2 rounded-lg transition duration-200"
          >
            Create Budget
          </button>
        </form>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Total Monthly Budget</p>
                  <p className="text-lg font-semibold">${totalBudget.toLocaleString()}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-lg font-semibold">${totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Remaining</p>
                  <p className={`text-lg font-semibold ${totalBudget - totalSpent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${(totalBudget - totalSpent).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            
            {budgets.length > 0 && (
              <div className="h-[200px] md:h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgets}
                      dataKey="spent"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {budgets.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Monthly Budgets</h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {budgets.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No budgets yet. Create one to get started!</p>
              ) : (
                budgets.map((budget) => {
                  const spent = budget.spent || 0;
                  const percentage = (spent / budget.amount) * 100;
                  const isOverBudget = spent > budget.amount;

                  return (
                    <div key={budget._id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{budget.category}</h3>
                          {budget.notes && (
                            <p className="text-sm text-gray-500">{budget.notes}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(budget._id)}
                          className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row justify-between text-sm gap-1">
                          <span>Progress</span>
                          <span className={isOverBudget ? 'text-red-600' : 'text-green-600'}>
                            ${spent.toLocaleString()} of ${budget.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              isOverBudget ? 'bg-red-600' : 'bg-green-600'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}