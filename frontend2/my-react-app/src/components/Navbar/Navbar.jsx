import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react'; // Import Clerk's useUser hook

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser(); // Get authentication state and user info
  const { signOut } = useClerk(); // Get the signOut function from Clerk


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
            <Link
              to="/ask-ai"
              className={`${
                location.pathname === '/ask-ai' ? 'text-blue-300' : 'hover:text-gray-300'
              } font-medium`}
            >
              Ask AI
            </Link>

          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-green-500 font-medium">
                Welcome, {user.firstName || user.emailAddresses[0].emailAddress}!
              </span> {/* Show user's first name or email if authenticated */}
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition"
                onClick={() => signOut()} // Call the signOut function
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              className="bg-gray-100 hover:bg-gray-200 text-blue-900 font-medium px-4 py-2 rounded-md transition"
              onClick={() => navigate('/auth')} // Redirect to sign-in page
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;