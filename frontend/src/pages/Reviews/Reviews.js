import React, { useState } from 'react';
import { FaStar, FaThumbsUp, FaQuoteLeft, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { useToast } from '../../shared/Toast/Toast';
import './Reviews.css';

const Reviews = () => {
  const { showToast } = useToast();
  const [reviews] = useState([
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      date: '2024-01-15',
      review: 'InterviewPrep helped me land my dream job at Google. The mock interviews were incredibly helpful!',
      company: 'Google',
      role: 'Software Engineer'
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 5,
      date: '2024-01-10',
      review: 'The MCQ practice questions are top-notch and really helped me prepare for technical interviews.',
      company: 'Microsoft',
      role: 'Frontend Developer'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      rating: 5,
      date: '2024-01-08',
      review: 'Great platform for interview preparation. The coding challenges are well-designed and challenging.',
      company: 'Amazon',
      role: 'Full Stack Developer'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      rating: 4,
      date: '2024-01-05',
      review: 'Excellent resource for interview prep. The AI-powered features are impressive and very helpful.',
      company: 'Apple',
      role: 'iOS Developer'
    },
    {
      id: 5,
      name: 'David Chen',
      rating: 5,
      date: '2024-01-03',
      review: 'The resume builder is fantastic! Got multiple interview calls after updating my resume using this platform.',
      company: 'Netflix',
      role: 'Backend Engineer'
    }
  ]);

  const handleLikeReview = (reviewId) => {
    showToast('Thanks for your feedback!', 'success');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={index < rating ? 'star-filled' : 'star-empty'} />
    ));
  };

  return (
    <div className="reviews-page">
      <div className="page-header">
        <h1>Reviews & Testimonials</h1>
        <p>See what others are saying about InterviewPrep</p>
      </div>
      
      <div className="content-section">
        <div className="stats-section">
          <div className="stat-card">
            <h3>4.8/5</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat-card">
            <h3>10,000+</h3>
            <p>Happy Users</p>
          </div>
          <div className="stat-card">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </div>
        
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    <FaUser />
                  </div>
                  <div className="reviewer-details">
                    <h4>{review.name}</h4>
                    <p className="reviewer-role">{review.role} at {review.company}</p>
                  </div>
                </div>
                <div className="review-meta">
                  <div className="stars">
                    {renderStars(review.rating)}
                  </div>
                  <span className="review-date">
                    <FaCalendarAlt /> {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="review-content">
                <FaQuoteLeft className="quote-icon" />
                <p>"{review.review}"</p>
              </div>
              <div className="review-actions">
                <button 
                  className="like-button"
                  onClick={() => handleLikeReview(review.id)}
                >
                  <FaThumbsUp /> Helpful
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews; 