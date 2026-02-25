import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Don't show navbar on login/signup pages
  if (location.pathname === '/' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">DevHub</span>
        </Link>
        
        <ul className="navbar-menu">
          <li className="nav-item">
            <Link 
              to="/student" 
              className={`nav-link ${isActive('/student') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/profile" 
              className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
            >
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/feedback" 
              className={`nav-link ${isActive('/feedback') ? 'active' : ''}`}
            >
              Feedback
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/analytics" 
              className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
            >
              Analytics
            </Link>
          </li>
        </ul>

        <div className="navbar-user">
          {currentUser && (
            <>
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">{currentUser.role}</span>
              </div>
              <button 
                className="btn-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
