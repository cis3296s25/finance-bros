import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import './Transactions.css'

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    type: 'Expense',
    category: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    tags: [],
    notes: '',
    isRecurring: false,
    recurringFrequency: 'monthly',
    recurringEndDate: '',
  });
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
    fetchTags();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/transactions');
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tags');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (tag) => {
    setNewTransaction(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTransaction) {
        await axios.put(
          `http://localhost:3000/transactions/${editingTransaction._id}`,
          newTransaction
        );
        setEditingTransaction(null);
      } else {
        await axios.post('http://localhost:3000/transactions', newTransaction);
      }
      setNewTransaction({
        amount: '',
        type: 'Expense',
        category: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        description: '',
        tags: [],
        notes: '',
        isRecurring: false,
        recurringFrequency: 'monthly',
        recurringEndDate: '',
      });
      setShowForm(false);
      fetchTransactions();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setNewTransaction({
      ...transaction,
      date: format(parseISO(transaction.date), 'yyyy-MM-dd'),
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await axios.delete(`http://localhost:3000/transactions/${id}`);
        fetchTransactions();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/transactions/export?format=${exportFormat}`,
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transactions.${exportFormat}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setShowExportModal(false);
    } catch (error) {
      console.error('Error exporting transactions:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = searchTerm
        ? transaction.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesFilter =
        filter === 'All' || transaction.type === filter;
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => transaction.tags?.includes(tag));
      return matchesSearch && matchesFilter && matchesTags;
    })
    .sort((a, b) => {
      const aValue = sortBy === 'date' ? new Date(a.date) : a[sortBy];
      const bValue = sortBy === 'date' ? new Date(b.date) : b[sortBy];
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

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
        <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowExportModal(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Export
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Cancel' : 'Add Transaction'}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded-md text-gray-800"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-md text-gray-800"
          >
            <option value="All">All Transactions</option>
            <option value="Income">Income</option>
            <option value="Expense">Expenses</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-md text-gray-800"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded-md text-gray-800"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag._id}
              onClick={() => {
                setSelectedTags((prev) =>
                  prev.includes(tag.name)
                    ? prev.filter((t) => t !== tag.name)
                    : [...prev, tag.name]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag.name)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Add/Edit Transaction Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Type</label>
              <select
                name="type"
                value={newTransaction.type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
                required
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={newTransaction.amount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
                required
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Category</label>
              <select
                name="category"
                value={newTransaction.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={newTransaction.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-800 mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={newTransaction.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
                placeholder="Add a description"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-800 mb-1">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag._id}
                    type="button"
                    onClick={() => handleTagChange(tag.name)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      newTransaction.tags.includes(tag.name)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-800 mb-1">Notes</label>
              <textarea
                name="notes"
                value={newTransaction.notes}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-gray-800"
                rows="3"
                placeholder="Add any additional notes"
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isRecurring"
                  checked={newTransaction.isRecurring}
                  onChange={(e) =>
                    setNewTransaction((prev) => ({
                      ...prev,
                      isRecurring: e.target.checked,
                    }))
                  }
                  className="rounded text-blue-600"
                />
                <span className="text-sm font-medium text-gray-800">
                  This is a recurring transaction
                </span>
              </label>
            </div>
            {newTransaction.isRecurring && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Frequency</label>
                  <select
                    name="recurringFrequency"
                    value={newTransaction.recurringFrequency}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">End Date (optional)</label>
                  <input
                    type="date"
                    name="recurringEndDate"
                    value={newTransaction.recurringEndDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                  />
                </div>
              </>
            )}
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingTransaction(null);
                setNewTransaction({
                  amount: '',
                  type: 'Expense',
                  category: '',
                  date: format(new Date(), 'yyyy-MM-dd'),
                  description: '',
                  tags: [],
                  notes: '',
                  isRecurring: false,
                  recurringFrequency: 'monthly',
                  recurringEndDate: '',
                });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {editingTransaction ? 'Update' : 'Add'} Transaction
            </button>
          </div>
        </form>
      )}

      {/* Transactions List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTransactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {format(parseISO(transaction.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {transaction.description || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {transaction.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex flex-wrap gap-1">
                    {transaction.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                  <span className={transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(transaction.amount)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page
                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Export Transactions
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Export Format
              </label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-800"
              >
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions 