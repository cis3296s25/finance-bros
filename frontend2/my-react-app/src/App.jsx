import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Dashboard, All_insights, FinancialOverview, Goals } from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import Auth from './components/Auth';
import BudgetingTab from './components/Dashboard/BudgetingTab';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/budgets" element={<BudgetingTab />} /> {/* New Budgets Page */}

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
