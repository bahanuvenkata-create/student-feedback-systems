import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="mb-4">Admin Dashboard</h1>
          <p className="text-muted mb-5">Manage and review student feedback and analytics.</p>
          
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">📊 Analytics</h5>
                  <p className="card-text">View detailed feedback analytics with charts and statistics.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/analytics')}
                  >
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">📋 Reports</h5>
                  <p className="card-text">Generate and download feedback reports for review.</p>
                  <button 
                    className="btn btn-info"
                    onClick={() => alert('Reports feature coming soon!')}
                  >
                    Generate Reports
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">👥 Users</h5>
                  <p className="card-text">Manage student and instructor accounts.</p>
                  <button 
                    className="btn btn-success"
                    onClick={() => alert('User management coming soon!')}
                  >
                    Manage Users
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">⚙️ Settings</h5>
                  <p className="card-text">Configure system settings and preferences.</p>
                  <button 
                    className="btn btn-warning"
                    onClick={() => alert('Settings coming soon!')}
                  >
                    System Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
