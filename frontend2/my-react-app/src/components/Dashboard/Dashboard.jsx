import { useState } from 'react';
import FinancialOverview from './FinancialOverview';
import IncomeExpensesChart from './IncomeExpensesChart';
import RecentTransactions from './RecentTransactions';
import All_insights from './All_insights';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleAddAccount = () => {
    console.log('Opening add account flow...');
  };

  const handleSetGoal = () => {
    console.log('Opening goal setting...');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Financial Dashboard</h2>
          <p className="text-gray-600">Your financial overview and insights</p>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAddAccount}
          >
            Add Account
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSetGoal}
          >
            Set Goal
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
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
        {/*
        <a
          href="#"
          className={`px-4 py-2 rounded ${
            activeTab === 'accounts' ? 'bg-blue-950 text-black' : 'text-gray-600'
          }`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('accounts');
          }}
        >
          Accounts
        </a>
        */}
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

      {activeTab === 'overview' && (
        <>
          <FinancialOverview />
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <IncomeExpensesChart />
              <RecentTransactions />
            </div>
            <div className="col-span-1">
              <All_insights />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;