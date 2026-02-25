import { useState } from 'react';
import { useActivity } from '../hooks/useActivity';
import './Analytics.css';

export default function Analytics() {
  const { addActivity } = useActivity();
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');

  const [analyticsData] = useState({
    totalFeedback: 234,
    averageRating: 4.2,
    satisfactionRate: 84,
    courseRatings: {
      'Web Development 101': 4.5,
      'React Fundamentals': 4.3,
      'Data Structures': 3.8,
      'Algorithm Design': 4.1,
      'Database Systems': 4.4,
      'Cloud Computing': 4.0
    },
    ratingDistribution: {
      5: 85,
      4: 78,
      3: 42,
      2: 18,
      1: 11
    }
  });

  const courses = Object.keys(analyticsData.courseRatings);
  const maxRatings = Math.max(...Object.values(analyticsData.ratingDistribution));

  // Filter data based on selections
  const filteredCourseRatings = selectedCourse === 'all' 
    ? analyticsData.courseRatings 
    : { [selectedCourse]: analyticsData.courseRatings[selectedCourse] };

  const filteredRatingDist = selectedRating === 'all'
    ? analyticsData.ratingDistribution
    : { [selectedRating]: analyticsData.ratingDistribution[selectedRating] };

  const handleFilterChange = (type, value) => {
    if (type === 'course') {
      setSelectedCourse(value);
      addActivity('analytics_viewed', `Filtered by course: ${value !== 'all' ? value : 'all'}`);
    } else {
      setSelectedRating(value);
      addActivity('analytics_viewed', `Filtered by rating: ${value !== 'all' ? value + ' stars' : 'all'}`);
    }
  };

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        <div className="page-header">
          <h1>Feedback Analytics</h1>
          <p className="subtitle">Comprehensive insights and trends from student feedback</p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label>Filter by Course</label>
            <select 
              value={selectedCourse}
              onChange={(e) => handleFilterChange('course', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Filter by Rating</label>
            <select 
              value={selectedRating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="card-icon">💬</div>
            <div>
              <p className="card-label">Total Responses</p>
              <h2>{analyticsData.totalFeedback}</h2>
              <span className="card-meta">feedback collected</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon">⭐</div>
            <div>
              <p className="card-label">Average Rating</p>
              <h2>{analyticsData.averageRating.toFixed(1)}</h2>
              <span className="card-meta">out of 5.0</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon">✨</div>
            <div>
              <p className="card-label">Satisfaction Rate</p>
              <h2>{analyticsData.satisfactionRate}%</h2>
              <span className="card-meta">4+ rating</span>
            </div>
          </div>
        </div>

        {/* Rating Distribution Chart */}
        <div className="analytics-card">
          <h3>Rating Distribution {selectedRating !== 'all' && `(${selectedRating} Stars)`}</h3>
          <div className="chart-container">
            <div className="bar-chart">
              {(selectedRating === 'all' 
                ? [5, 4, 3, 2, 1]
                : [selectedRating]
              ).map(rating => {
                const percentage = selectedRating === 'all'
                  ? (analyticsData.ratingDistribution[rating] / maxRatings) * 100
                  : (analyticsData.ratingDistribution[rating] / maxRatings) * 100;
                
                const gradients = {
                  5: 'var(--gradient-primary)',
                  4: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  3: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  2: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  1: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                };
                return (
                  <div key={rating} className="bar-item">
                    <div className="bar-label">{rating}⭐</div>
                    <div className="bar-wrapper">
                      <div
                        className="bar-fill"
                        style={{
                          height: `${percentage}%`,
                          background: gradients[rating]
                        }}
                      />
                    </div>
                    <div className="bar-count">{analyticsData.ratingDistribution[rating]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Course Ratings */}
        <div className="analytics-card">
          <h3>Course-wise Performance {selectedCourse !== 'all' && `(${selectedCourse})`}</h3>
          <div className="course-ratings">
            {Object.entries(filteredCourseRatings).map(([course, rating]) => (
              <div key={course} className="rating-row">
                <div className="course-info">
                  <span className="course-name">{course}</span>
                  <span className="course-rating">{rating.toFixed(1)}⭐</span>
                </div>
                <div className="progress-bar-wrapper">
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${(rating / 5) * 100}%`,
                        background: rating >= 4.2 
                          ? 'var(--gradient-primary)' 
                          : rating >= 4 
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      }}
                    />
                  </div>
                  <span className="progress-percentage">{Math.round((rating / 5) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top & Bottom Performers */}
        <div className="performers-grid">
          <div className="performer-card top">
            <div className="performer-icon">🏆</div>
            <h4>Highest Rated</h4>
            <p className="performer-course">Web Development 101</p>
            <p className="performer-rating">4.5⭐</p>
            <span className="performer-badge">Excellent</span>
          </div>

          <div className="performer-card bottom">
            <div className="performer-icon">📈</div>
            <h4>Needs Improvement</h4>
            <p className="performer-course">Data Structures</p>
            <p className="performer-rating">3.8⭐</p>
            <span className="performer-badge">Good</span>
          </div>
        </div>
      </div>
    </div>
  );
}
