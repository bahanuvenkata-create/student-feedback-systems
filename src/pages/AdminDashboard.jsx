import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const adminActions = [
    {
      id: 1,
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'View detailed feedback analytics with comprehensive charts and statistics.',
      action: () => navigate('/analytics'),
      accentClass: 'accent-primary'
    },
    {
      id: 2,
      icon: '📋',
      title: 'Generate Reports',
      description: 'Create and download comprehensive feedback reports for detailed review.',
      action: () => alert('Reports feature coming soon!'),
      accentClass: 'accent-secondary'
    },
    {
      id: 3,
      icon: '👥',
      title: 'Manage Users',
      description: 'Manage student and instructor accounts with full control.',
      action: () => alert('User management coming soon!'),
      accentClass: 'accent-tertiary'
    },
    {
      id: 4,
      icon: '⚙️',
      title: 'System Settings',
      description: 'Configure system settings, permissions, and preferences.',
      action: () => alert('Settings coming soon!'),
      accentClass: 'accent-primary'
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="page-header">
          <h1>Admin Dashboard</h1>
          <p className="subtitle">Manage feedback, analytics, users, and system configuration</p>
        </div>

        <div className="admin-grid">
          {adminActions.map(item => (
            <div key={item.id} className="admin-card">
              <div className="card-icon-wrapper">
                <span className={`card-icon ${item.accentClass}`}>{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button 
                className="btn-primary"
                onClick={item.action}
              >
                Access Module
              </button>
            </div>
          ))}
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <h5>💬</h5>
            <h3>234</h3>
            <p>Total Feedback Responses</p>
          </div>
          <div className="stat-card">
            <h5>⭐</h5>
            <h3>4.2</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat-card">
            <h5>👤</h5>
            <h3>156</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-card">
            <h5>📚</h5>
            <h3>6</h3>
            <p>Total Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
