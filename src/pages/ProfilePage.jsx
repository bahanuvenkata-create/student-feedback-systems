import { useActivity } from '../hooks/useActivity';
import { useCertificates } from '../hooks/useCertificates';
import './ProfilePage.css';

export default function ProfilePage() {
  const { getActivities } = useActivity();
  const { certificates } = useCertificates();
  
  const activities = getActivities();

  const getActivityIcon = (action) => {
    const icons = {
      'certificate_upload': '📄',
      'feedback_submitted': '✏️',
      'profile_updated': '👤',
      'analytics_viewed': '📊',
      'course_completed': '✓',
      'login': '🔐'
    };
    return icons[action] || '📌';
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span>👤</span>
          </div>
          <div className="profile-info">
            <h1>Student Profile</h1>
            <p className="profile-subtitle">Manage your achievements and activity</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="profile-stats">
          <div className="stat-box">
            <h3>{certificates.length}</h3>
            <p>Certificates</p>
          </div>
          <div className="stat-box">
            <h3>{activities.length}</h3>
            <p>Activities</p>
          </div>
          <div className="stat-box">
            <h3>4.2/5</h3>
            <p>Avg Rating</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="profile-content">
          {/* Activity Timeline */}
          <div className="profile-section">
            <h2>Activity Timeline</h2>
            <div className="activity-timeline">
              {activities.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📭</span>
                  <p>No activities yet. Start by providing feedback or uploading certificates!</p>
                </div>
              ) : (
                activities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-marker">
                      <span className="activity-icon">
                        {getActivityIcon(activity.action)}
                      </span>
                    </div>
                    <div className="activity-content">
                      <h4>{activity.action.replace(/_/g, ' ').toUpperCase()}</h4>
                      {activity.details && <p>{activity.details}</p>}
                      <span className="activity-time">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Certificates Section */}
          <div className="profile-section">
            <h2>Your Certificates</h2>
            <div className="certificates-grid">
              {certificates.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📁</span>
                  <p>No certificates uploaded yet. Start by completing a course!</p>
                </div>
              ) : (
                certificates.map(cert => (
                  <div key={cert.id} className="certificate-card">
                    <div className="cert-icon">📄</div>
                    <div className="cert-info">
                      <h4>{cert.name}</h4>
                      <p className="cert-course">{cert.course}</p>
                      <p className="cert-date">{cert.formattedDate}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
