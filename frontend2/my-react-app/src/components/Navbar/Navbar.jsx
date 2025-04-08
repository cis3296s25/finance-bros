import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleConnectAccount = () => {
    // This would typically open your Plaid connection flow
    console.log('Opening Plaid connection...')
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">BudgetAI</Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/transactions" className={location.pathname === '/transactions' ? 'active' : ''}>
            Transactions
          </Link>
          <Link to="/goals" className={location.pathname === '/goals' ? 'active' : ''}>
            Goals
          </Link>
          <Link to="/insights" className={location.pathname === '/insights' ? 'active' : ''}>
            Insights
          </Link>
        </div>
      </div>
      <div className="nav-right">
        <button className="connect-btn" onClick={handleConnectAccount}>
          Connect Account
        </button>
        <button className="sign-in-btn" onClick={() => navigate('/auth')}>
          Sign In
        </button>
      </div>
    </nav>
  )
}

export default Navbar 