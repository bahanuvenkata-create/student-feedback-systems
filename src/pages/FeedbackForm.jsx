import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { useActivity } from '../hooks/useActivity';
import './FeedbackForm.css';

export default function FeedbackForm() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { addActivity } = useActivity();
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
      addActivity('feedback_submitted', `Feedback for ${formData.course}`);
      addToast(`Feedback submitted for ${formData.course}!`, 'success');
      
      setFormData({
        course: '',
        instructor: '',
        rating: 5,
        comment: ''
      });
      setTimeout(() => navigate('/student'), 500);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <div className="form-header">
          <h1>Share Your Feedback</h1>
          <p>Help us improve by providing honest feedback about your learning experience</p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          {/* Course Selection */}
          <div className="form-group">
            <label htmlFor="course" className="form-label">
              Select Course <span className="required">*</span>
            </label>
            <select
              id="course"
              name="course"
              className={`form-control ${errors.course ? 'error' : ''}`}
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">-- Choose a course --</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            {errors.course && <span className="error-message">{errors.course}</span>}
          </div>

          {/* Instructor Name */}
          <div className="form-group">
            <label htmlFor="instructor" className="form-label">
              Instructor Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              className={`form-control ${errors.instructor ? 'error' : ''}`}
              placeholder="Enter instructor name"
              value={formData.instructor}
              onChange={handleChange}
            />
            {errors.instructor && <span className="error-message">{errors.instructor}</span>}
          </div>

          {/* Rating Selection */}
          <div className="form-group">
            <label className="form-label">
              Rate Your Experience <span className="required">*</span>
            </label>
            <div className="rating-container">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  type="button"
                  className={`rating-btn ${formData.rating === num ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, rating: num }))}
                  title={`${num} star${num > 1 ? 's' : ''}`}
                >
                  {'⭐'.repeat(num)}
                </button>
              ))}
            </div>
            <p className="rating-label">Selected: <strong>{formData.rating}/5 stars</strong></p>
          </div>

          {/* Comment */}
          <div className="form-group">
            <label htmlFor="comment" className="form-label">
              Your Detailed Feedback <span className="required">*</span>
            </label>
            <textarea
              id="comment"
              name="comment"
              className={`form-control ${errors.comment ? 'error' : ''}`}
              rows="6"
              placeholder="Share your detailed feedback here... What went well? What could be improved?"
              value={formData.comment}
              onChange={handleChange}
            />
            <div className="char-counter">
              <span className={formData.comment.length > 500 ? 'error' : ''}>
                {formData.comment.length} / 500 characters
              </span>
            </div>
            {errors.comment && <span className="error-message">{errors.comment}</span>}
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              Submit Feedback
            </button>
            <button 
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/student')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
