import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    description: '',
    category: 'Other',
    status: 'In Progress',
    notifications: {
      enabled: true,
      frequency: 'Weekly'
    }
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showProgressChart, setShowProgressChart] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('deadline');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('notifications.')) {
      const notificationField = name.split('.')[1];
      setNewGoal(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationField]: value
        }
      }));
    } else {
      setNewGoal(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/goals', newGoal);
      setNewGoal({
        title: '',
        targetAmount: '',
        currentAmount: '',
        deadline: '',
        description: '',
        category: 'Other',
        status: 'In Progress',
        notifications: {
          enabled: true,
          frequency: 'Weekly'
        }
      });
      setIsFormVisible(false);
      fetchGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const handleUpdateGoal = async (goalId, updates) => {
    try {
      await axios.put(`http://localhost:3000/api/goals/${goalId}`, updates);
      fetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await axios.delete(`http://localhost:3000/api/goals/${goalId}`);
        fetchGoals();
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    }
  };

  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'On Hold':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Savings': 'bg-blue-100 text-blue-800',
      'Investment': 'bg-green-100 text-green-800',
      'Debt Repayment': 'bg-red-100 text-red-800',
      'Education': 'bg-purple-100 text-purple-800',
      'Retirement': 'bg-orange-100 text-orange-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Other'];
  };

  const filteredAndSortedGoals = goals
    .filter(goal => filter === 'All' || goal.category === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'progress':
          return calculateProgress(b.currentAmount, b.targetAmount) - calculateProgress(a.currentAmount, a.targetAmount);
        case 'amount':
          return b.targetAmount - a.targetAmount;
        default:
          return 0;
      }
    });

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const target = new Date(deadline);
    const diff = target - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days remaining` : 'Deadline passed';
  };

  return (
    <div className="page-container p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Financial Goals</h2>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isFormVisible ? 'Cancel' : 'Create New Goal'}
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md text-gray-800"
        >
          <option value="All">All Categories</option>
          <option value="Savings">Savings</option>
          <option value="Investment">Investment</option>
          <option value="Debt Repayment">Debt Repayment</option>
          <option value="Education">Education</option>
          <option value="Retirement">Retirement</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-md text-gray-800"
        >
          <option value="deadline">Sort by Deadline</option>
          <option value="progress">Sort by Progress</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Goal Title</label>
              <input
                type="text"
                name="title"
                value={newGoal.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Category</label>
              <select
                name="category"
                value={newGoal.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
              >
                <option value="Savings">Savings</option>
                <option value="Investment">Investment</option>
                <option value="Debt Repayment">Debt Repayment</option>
                <option value="Education">Education</option>
                <option value="Retirement">Retirement</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Target Amount ($)</label>
              <input
                type="number"
                name="targetAmount"
                value={newGoal.targetAmount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Current Amount ($)</label>
              <input
                type="number"
                name="currentAmount"
                value={newGoal.currentAmount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Target Date</label>
              <input
                type="date"
                name="deadline"
                value={newGoal.deadline}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Notification Frequency</label>
              <select
                name="notifications.frequency"
                value={newGoal.notifications.frequency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-800 mb-1">Description</label>
              <textarea
                name="description"
                value={newGoal.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
                rows="3"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Save Goal
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedGoals.map((goal) => (
          <div key={goal._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{goal.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                {goal.category}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-gray-800">{goal.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${getStatusColor(goal.status)}`}
                  style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-800">
                <span>${goal.currentAmount}</span>
                <span>${goal.targetAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-800">
                  {getTimeRemaining(goal.deadline)}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)} text-white`}>
                  {goal.status}
                </span>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setSelectedGoal(goal);
                    setShowProgressChart(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View Progress
                </button>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditingGoal(goal);
                      setShowEditModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleUpdateGoal(goal._id, { status: 'Completed' })}
                    className="text-green-600 hover:text-green-800 text-sm"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleDeleteGoal(goal._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showProgressChart && selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Progress History</h3>
              <button
                onClick={() => setShowProgressChart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <Line
                  data={selectedGoal.progressHistory.map(entry => ({
                    date: new Date(entry.date).toLocaleDateString(),
                    amount: entry.amount
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#3B82F6" />
                </Line>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Edit Goal</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateGoal(editingGoal._id, editingGoal);
              setShowEditModal(false);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Current Amount ($)</label>
                  <input
                    type="number"
                    value={editingGoal.currentAmount}
                    onChange={(e) => setEditingGoal({...editingGoal, currentAmount: e.target.value})}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Status</label>
                  <select
                    value={editingGoal.status}
                    onChange={(e) => setEditingGoal({...editingGoal, status: e.target.value})}
                    className="w-full p-2 border rounded-md text-gray-800"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Goals; 