import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="mb-4">Welcome, Student!</h1>
          <p className="text-muted mb-5">You can provide feedback about your courses and instructors here.</p>
          
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">📝 Provide Feedback</h5>
                  <p className="card-text">Share your feedback about instructors and courses to help improve the learning experience.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/feedback')}
                  >
                    Give Feedback
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">📊 View Analytics</h5>
                  <p className="card-text">View the overall feedback analytics and ratings from all students.</p>
                  <button 
                    className="btn btn-info"
                    onClick={() => navigate('/analytics')}
                  >
                    View Analytics
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
