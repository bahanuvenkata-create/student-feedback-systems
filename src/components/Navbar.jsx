import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          📚 Feedback System
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/')}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/student')}`} 
                to="/"
              >
                Exit
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
