import { useState } from 'react';
import FinancialOverview from './FinancialOverview';
import IncomeExpensesChart from './IncomeExpensesChart';
import RecentTransactions from './RecentTransactions';
/*import All_insights from './All_insights';*/
import BudgetingTab from './BudgetingTab';

function Dashboard() {
  const [activeTab] = useState('overview');

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Financial Dashboard</h2>
            <p className="text-gray-600">Your financial overview and insights</p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full bg-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex gap-4">
        
        
      </nav>

      {/* Content */}
      <main className="w-full px-4 py-6 sm:px-6 lg:px-8 flex justify-center">
        {activeTab === 'overview' && (
          <div className="w-full max-w-4xl space-y-6">
            {/* Chart and Transactions */}
            <div className="space-y-6">
              <IncomeExpensesChart />
              <RecentTransactions />
            </div>

            {/* Insights */}
            {/* <div className="lg:col-span-1">
              <All_insights />
            </div> */}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
