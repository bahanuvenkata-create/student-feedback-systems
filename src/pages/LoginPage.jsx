import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/Toast';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, userRole, isLoading } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    }
  }, [isAuthenticated, userRole, isLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast('Please check the form errors', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate login delay
    setTimeout(() => {
      const result = login(formData.email, formData.password);

      if (result.success) {
        addToast('Login successful! 🎉', 'success');
        // Navigation happens in useEffect
      } else {
        addToast(result.error, 'error');
      }
      setIsSubmitting(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-card">
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>DevHub Studio</h1>
            <p className="login-subtitle">Professional feedback and analytics platform</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? 'error' : ''}`}
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-login"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Signup Link */}
          <div className="login-footer">
            <p>Don't have an account?</p>
            <Link to="/signup" className="auth-link">
              Create One Here
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="demo-section">
            <p className="demo-title">Try Demo Accounts:</p>
            <div className="demo-grid">
              <div className="demo-card student">
                <div className="demo-label">Student</div>
                <input 
                  type="text" 
                  readOnly 
                  value="student@demo.com"
                  onClick={(e) => {
                    setFormData({ email: 'student@demo.com', password: 'password123' });
                  }}
                  className="demo-credential"
                  title="Click to fill"
                />
                <input 
                  type="text" 
                  readOnly 
                  value="password123"
                  onClick={(e) => {
                    setFormData({ email: 'student@demo.com', password: 'password123' });
                  }}
                  className="demo-credential"
                  title="Click to fill"
                />
              </div>

              <div className="demo-card admin">
                <div className="demo-label">Admin</div>
                <input 
                  type="text" 
                  readOnly 
                  value="admin@demo.com"
                  onClick={(e) => {
                    setFormData({ email: 'admin@demo.com', password: 'password123' });
                  }}
                  className="demo-credential"
                  title="Click to fill"
                />
                <input 
                  type="text" 
                  readOnly 
                  value="password123"
                  onClick={(e) => {
                    setFormData({ email: 'admin@demo.com', password: 'password123' });
                  }}
                  className="demo-credential"
                  title="Click to fill"
                />
              </div>
            </div>
            <p className="demo-hint">💡 Click credentials to auto-fill the form</p>
          </div>
        </div>
      </div>
    </div>
  );
}
