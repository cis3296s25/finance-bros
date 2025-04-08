import { useState } from 'react';
import FinancialOverview from './FinancialOverview';
import IncomeExpensesChart from './IncomeExpensesChart';
import RecentTransactions from './RecentTransactions';
import All_insights from './All_insights';
import BudgetingTab from './BudgetingTab'; // Import the BudgetingTab component

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="flex justify-between items-center p-6 bg-white shadow">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Financial Dashboard</h2>
          <p className="text-gray-600">Your financial overview and insights</p>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => console.log('Add Account')}
          >
            Add Account
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => console.log('Set Goal')}
          >
            Set Goal
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 p-4 bg-gray-200">
        <a
          href="#"
          className={`px-4 py-2 rounded ${
            activeTab === 'overview' ? 'bg-blue-950 text-gray-900' : 'text-gray-900'
          }`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('overview');
          }}
        >
          Overview
        </a>
        <a
          href="#"
          className={`px-4 py-2 rounded ${
            activeTab === 'budgets' ? 'bg-blue-950 text-black' : 'text-gray-600'
          }`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('budgets');
          }}
        >
          Budgets
        </a>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <IncomeExpensesChart />
              <RecentTransactions />
            </div>
            <div className="col-span-1">
              <All_insights />
            </div>
          </div>
        )}
        {activeTab === 'budgets' && (
          <div>
            <BudgetingTab />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;