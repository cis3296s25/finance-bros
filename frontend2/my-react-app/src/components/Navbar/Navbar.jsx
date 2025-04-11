import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleConnectAccount = () => {
    console.log('Opening Plaid connection...');
  };

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold">
            BudgetAI
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`${
                location.pathname === '/' ? 'text-blue-300' : 'hover:text-gray-300'
              } font-medium`}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={`${
                location.pathname === '/transactions' ? 'text-blue-300' : 'hover:text-gray-300'
              } font-medium`}
            >
              Transactions
            </Link>
            <Link
              to="/goals"
              className={`${
                location.pathname === '/goals' ? 'text-blue-300' : 'hover:text-gray-300'
              } font-medium`}
            >
              Goals
            </Link>
            <Link
              to="/insights"
              className={`${
                location.pathname === '/insights' ? 'text-blue-300' : 'hover:text-gray-300'
              } font-medium`}
            >
              Insights
            </Link>
            <Link
              to="/budgets"
              className={`${
                location.pathname === '/budgets' ? 'text-blue-300' : 'hover:text-gray-300'
              } font-medium`}
            >
              Budgets
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-md transition"
            onClick={handleConnectAccount}
          >
            Connect Account
          </button>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-blue-900 font-medium px-4 py-2 rounded-md transition"
            onClick={() => navigate('/auth')}
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;