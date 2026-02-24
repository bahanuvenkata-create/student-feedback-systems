import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Student Feedback System</h1>
        <p className="subtitle">Welcome to the Feedback & Evaluation Portal</p>
        
        <div className="button-group">
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/student')}
          >
            Login as Student
          </button>
          <button 
            className="btn btn-info btn-lg"
            onClick={() => navigate('/admin')}
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
