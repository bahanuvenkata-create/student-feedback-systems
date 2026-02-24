import { useState } from 'react';

export default function Analytics() {
  // Dummy data for ratings
  const [analyticsData] = useState({
    totalFeedback: 234,
    averageRating: 4.2,
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

  const maxRatings = Math.max(...Object.values(analyticsData.ratingDistribution));

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <h1 className="mb-5">Feedback Analytics</h1>

          {/* Summary Cards */}
          <div className="row mb-5">
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h6 className="card-title text-muted">Total Feedback</h6>
                  <h2 className="text-primary">{analyticsData.totalFeedback}</h2>
                  <p className="card-text small">responses collected</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h6 className="card-title text-muted">Average Rating</h6>
                  <h2 className="text-success">{analyticsData.averageRating}⭐</h2>
                  <p className="card-text small">out of 5.0</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h6 className="card-title text-muted">Satisfaction Rate</h6>
                  <h2 className="text-warning">84%</h2>
                  <p className="card-text small">4+ rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Distribution Chart (Bar Chart) */}
          <div className="card shadow-sm mb-5">
            <div className="card-body">
              <h5 className="card-title mb-4">Rating Distribution</h5>
              <div className="chart-container">
                <div className="d-flex align-items-flex-end justify-content-around" style={{ height: '300px' }}>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="text-center">
                      <div 
                        style={{
                          height: `${(analyticsData.ratingDistribution[rating] / maxRatings) * 250}px`,
                          width: '50px',
                          backgroundColor: rating >= 4 ? '#28a745' : rating === 3 ? '#ffc107' : '#dc3545',
                          borderRadius: '5px 5px 0 0',
                          marginBottom: '10px'
                        }}
                      ></div>
                      <p className="mb-1 fw-bold">{analyticsData.ratingDistribution[rating]}</p>
                      <small>{rating}⭐</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Course Ratings */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Course-wise Ratings</h5>
              <div>
                {Object.entries(analyticsData.courseRatings).map(([course, rating]) => (
                  <div key={course} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fw-bold">{course}</span>
                      <span className="text-primary">{rating}⭐</span>
                    </div>
                    <div className="progress" style={{ height: '20px' }}>
                      <div
                        className={`progress-bar ${rating >= 4 ? 'bg-success' : rating >= 3 ? 'bg-warning' : 'bg-danger'}`}
                        role="progressbar"
                        style={{ width: `${(rating / 5) * 100}%` }}
                      >
                        {`${Math.round((rating / 5) * 100)}%`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Statistics */}
          <div className="row mt-5">
            <div className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-title text-muted">Best Rated Course</h6>
                  <p className="card-text">Web Development 101</p>
                  <h4 className="text-success">4.5⭐</h4>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-title text-muted">Needs Improvement</h6>
                  <p className="card-text">Data Structures</p>
                  <h4 className="text-warning">3.8⭐</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
