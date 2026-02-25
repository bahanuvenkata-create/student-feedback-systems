import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '../components/Toast';
import { useActivity } from '../hooks/useActivity';
import { useCertificates } from '../hooks/useCertificates';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { addActivity } = useActivity();
  const { addCertificate, certificates } = useCertificates();
  const [isUploading, setIsUploading] = useState(false);

  const handleCertificateUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate PDF
    if (file.type !== 'application/pdf') {
      addToast('Please upload a PDF file', 'error');
      return;
    }

    // Simulate upload delay
    setIsUploading(true);
    setTimeout(() => {
      addCertificate(file, 'Web Development 101');
      addActivity('certificate_upload', `Uploaded ${file.name}`);
      addToast('Certificate uploaded successfully!', 'success');
      setIsUploading(false);
      e.target.value = ''; // Reset input
    }, 500);
  };

  const stats = [
    { label: 'Total Courses', value: 6, icon: '📚' },
    { label: 'Certificates', value: certificates.length, icon: '📄' },
    { label: 'Average Rating', value: '4.2/5', icon: '⭐' }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="page-header">
          <h1>Student Dashboard</h1>
          <p className="subtitle">Manage your certificates and provide feedback</p>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-icon">{stat.icon}</span>
              <div>
                <p className="stat-label">{stat.label}</p>
                <h3>{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          {/* Certificate Upload Card */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon icon-primary">📄</div>
              <h3>Upload Certificate</h3>
            </div>
            <p className="card-description">
              Upload PDF certificates to showcase your completed courses and achievements.
            </p>
            <div className="file-upload-zone">
              <input
                type="file"
                id="cert-upload"
                accept=".pdf"
                onChange={handleCertificateUpload}
                disabled={isUploading}
                className="file-input"
              />
              <label htmlFor="cert-upload" className={`upload-label ${isUploading ? 'uploading' : ''}`}>
                <span className="upload-icon">📤</span>
                <span className="upload-text">
                  {isUploading ? 'Uploading...' : 'Click to upload PDF'}
                </span>
                <span className="upload-hint">PDF files only</span>
              </label>
            </div>
            {certificates.length > 0 && (
              <div className="uploaded-list">
                <p className="uploaded-label">Uploaded ({certificates.length})</p>
                <div className="cert-items">
                  {certificates.slice(0, 3).map(cert => (
                    <div key={cert.id} className="cert-item">
                      <span>📄</span>
                      <span className="cert-name">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Feedback Card */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon icon-primary">✏️</div>
              <h3>Provide Feedback</h3>
            </div>
            <p className="card-description">
              Share detailed feedback about your instructors and courses to help improve the learning experience.
            </p>
            <button 
              className="btn-primary"
              onClick={() => {
                addActivity('feedback_submitted', 'Visited feedback form');
                navigate('/feedback');
              }}
            >
              Give Feedback
            </button>
          </div>

          {/* Analytics Card */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon icon-secondary">📊</div>
              <h3>View Analytics</h3>
            </div>
            <p className="card-description">
              View comprehensive feedback analytics and ratings from all students across different courses.
            </p>
            <button 
              className="btn-primary"
              onClick={() => {
                addActivity('analytics_viewed', 'Viewed analytics dashboard');
                navigate('/analytics');
              }}
            >
              View Analytics
            </button>
          </div>

          {/* Profile Card */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon icon-secondary">👤</div>
              <h3>My Profile</h3>
            </div>
            <p className="card-description">
              View your activity history, certificates, and personal achievements.
            </p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/profile')}
            >
              View Profile
            </button>
          </div>
        </div>

        {/* Insights Section */}
        <div className="insights-section">
          <h2>Your Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>⭐ Highest Rated</h4>
              <p className="insight-value">Web Development 101</p>
              <p className="insight-meta">4.5/5 rating</p>
            </div>
            <div className="insight-card">
              <h4>📈 Average Satisfaction</h4>
              <p className="insight-value">84%</p>
              <p className="insight-meta">4+ rating</p>
            </div>
            <div className="insight-card">
              <h4>✅ Certificates Earned</h4>
              <p className="insight-value">{certificates.length}</p>
              <p className="insight-meta">Achievement unlocked!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
