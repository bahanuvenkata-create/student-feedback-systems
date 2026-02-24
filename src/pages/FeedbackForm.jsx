import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeedbackForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course: '',
    instructor: '',
    rating: 5,
    comment: ''
  });
  
  const [errors, setErrors] = useState({});

  const courses = [
    'Web Development 101',
    'React Fundamentals',
    'Data Structures',
    'Algorithm Design',
    'Database Systems',
    'Cloud Computing'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.instructor.trim()) newErrors.instructor = 'Please enter instructor name';
    if (!formData.rating) newErrors.rating = 'Please select a rating';
    if (!formData.comment.trim()) newErrors.comment = 'Please enter your feedback';
    if (formData.comment.trim().length < 10) newErrors.comment = 'Feedback must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      alert(`Feedback submitted successfully!\n\nCourse: ${formData.course}\nInstructor: ${formData.instructor}\nRating: ${formData.rating}/5\n\nThank you for your feedback!`);
      setFormData({
        course: '',
        instructor: '',
        rating: 5,
        comment: ''
      });
      setTimeout(() => navigate('/student'), 1000);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="mb-4">Feedback Form</h1>
          <p className="text-muted mb-4">Please provide your honest feedback to help us improve.</p>
          
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            {/* Course Selection */}
            <div className="mb-4">
              <label htmlFor="course" className="form-label fw-bold">
                Select Course *
              </label>
              <select
                id="course"
                name="course"
                className={`form-select ${errors.course ? 'is-invalid' : ''}`}
                value={formData.course}
                onChange={handleChange}
              >
                <option value="">-- Choose a course --</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              {errors.course && <div className="invalid-feedback d-block">{errors.course}</div>}
            </div>

            {/* Instructor Name */}
            <div className="mb-4">
              <label htmlFor="instructor" className="form-label fw-bold">
                Instructor Name *
              </label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                className={`form-control ${errors.instructor ? 'is-invalid' : ''}`}
                placeholder="Enter instructor name"
                value={formData.instructor}
                onChange={handleChange}
              />
              {errors.instructor && <div className="invalid-feedback d-block">{errors.instructor}</div>}
            </div>

            {/* Rating Selection */}
            <div className="mb-4">
              <label htmlFor="rating" className="form-label fw-bold">
                Rating (1-5) *
              </label>
              <div className="d-flex gap-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    className={`btn ${formData.rating === num ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setFormData(prev => ({ ...prev, rating: num }))}
                  >
                    {'⭐'.repeat(num)}
                  </button>
                ))}
              </div>
              <small className="text-muted d-block mt-2">Selected: {formData.rating}/5 stars</small>
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label htmlFor="comment" className="form-label fw-bold">
                Your Feedback *
              </label>
              <textarea
                id="comment"
                name="comment"
                className={`form-control ${errors.comment ? 'is-invalid' : ''}`}
                rows="5"
                placeholder="Share your detailed feedback here..."
                value={formData.comment}
                onChange={handleChange}
              />
              <small className="text-muted d-block mt-1">
                {formData.comment.length} / 500 characters
              </small>
              {errors.comment && <div className="invalid-feedback d-block">{errors.comment}</div>}
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary btn-lg">
                Submit Feedback
              </button>
              <button 
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/student')}
              >
                Back to Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
